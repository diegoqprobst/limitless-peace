import type { Indicadores } from '../engine/types';
import { aplicarEfectos } from '../engine/types';
import type {
  Celda,
  ContextoEvento,
  EventoTerritorio,
  Herramienta,
  NivelTerritorio,
  OpcionEvento,
  TipoCelda,
} from './types';
import { ACCIONES, POR_TIPO, UMBRAL_RETORNO } from './catalogo';

/**
 * Motor del modo Territorio: funciones puras sobre un estado inmutable.
 * La UI (components/Territorio.tsx) solo despacha acciones y pinta.
 */

export interface EstadoTerritorio {
  celdas: Celda[][];
  fondos: number;
  mes: number;
  indicadores: Indicadores;
  herramienta: Herramienta | null;
  eventoActivo: EventoTerritorio | null;
  /** Retro pendiente de mostrar tras resolver un evento. */
  retroEvento: OpcionEvento | null;
  eventosVistos: string[];
  codexDescubierto: string[];
  fase: 'intro' | 'jugando' | 'victoria' | 'fracaso';
  mensaje: string | null;
}

const TIPO_POR_CARACTER: Record<string, TipoCelda> = {
  T: 'tierra',
  E: 'escombros',
  C: 'casa',
  M: 'minado',
  R: 'rio',
};

export function crearEstado(nivel: NivelTerritorio): EstadoTerritorio {
  const celdas: Celda[][] = nivel.mapa.map((fila) =>
    fila.split('').map((c) => ({
      tipo: TIPO_POR_CARACTER[c] ?? 'tierra',
      vitalidad: 0,
      poblada: false,
    })),
  );
  return {
    celdas,
    fondos: nivel.fondosIniciales,
    mes: 1,
    indicadores: nivel.indicadoresIniciales,
    herramienta: null,
    eventoActivo: null,
    retroEvento: null,
    eventosVistos: [],
    codexDescubierto: [],
    fase: 'intro',
    mensaje: null,
  };
}

/** Recalcula la vitalidad de cada celda a partir de las auras de los edificios. */
export function recomputarVitalidad(celdas: Celda[][]): Celda[][] {
  const filas = celdas.length;
  const cols = celdas[0].length;
  const vitalidad: number[][] = celdas.map((fila) => fila.map(() => 0));

  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < cols; c++) {
      const edificio = celdas[f][c].edificio;
      if (!edificio) continue;
      const def = POR_TIPO[edificio];
      for (let df = -def.radio; df <= def.radio; df++) {
        for (let dc = -def.radio; dc <= def.radio; dc++) {
          const nf = f + df;
          const nc = c + dc;
          if (nf < 0 || nf >= filas || nc < 0 || nc >= cols) continue;
          vitalidad[nf][nc] += def.aporteVitalidad;
        }
      }
    }
  }

  return celdas.map((fila, f) =>
    fila.map((celda, c) => {
      const v = Math.min(100, vitalidad[f][c]);
      return {
        ...celda,
        vitalidad: v,
        poblada: celda.tipo === 'casa' && v >= UMBRAL_RETORNO,
      };
    }),
  );
}

export function contarFamilias(celdas: Celda[][]): { pobladas: number; total: number } {
  let pobladas = 0;
  let total = 0;
  for (const fila of celdas) {
    for (const celda of fila) {
      if (celda.tipo === 'casa') {
        total++;
        if (celda.poblada) pobladas++;
      }
    }
  }
  return { pobladas, total };
}

/** Ingreso neto mensual: base + mercados − mantenimiento de cada edificio. */
export function ingresoMensual(nivel: NivelTerritorio, celdas: Celda[][]): number {
  let ingreso = nivel.ingresoBase;
  for (const fila of celdas) {
    for (const celda of fila) {
      if (celda.edificio) {
        ingreso += POR_TIPO[celda.edificio].ingresoMensual ?? 0;
        ingreso -= nivel.mantenimientoPorEdificio;
      }
    }
  }
  return ingreso;
}

export function contarMinas(celdas: Celda[][]): number {
  return celdas.flat().filter((c) => c.tipo === 'minado').length;
}

function comprobarVictoria(estado: EstadoTerritorio, nivel: NivelTerritorio): EstadoTerritorio {
  const { pobladas, total } = contarFamilias(estado.celdas);
  const familiasOk = total > 0 && pobladas >= Math.ceil(total * nivel.metaFamilias);
  const ind = estado.indicadores;
  const indicadoresOk =
    Math.min(ind.confianza, ind.seguridad, ind.justicia, ind.legitimidad) >= nivel.metaIndicador;
  if (familiasOk && indicadoresOk) {
    return { ...estado, fase: 'victoria', herramienta: null, mensaje: null };
  }
  return estado;
}

/** Aplica la herramienta activa sobre la celda (fila, col). */
export function actuar(
  estado: EstadoTerritorio,
  nivel: NivelTerritorio,
  f: number,
  c: number,
): EstadoTerritorio {
  if (estado.fase !== 'jugando' || estado.eventoActivo || !estado.herramienta) return estado;
  const celda = estado.celdas[f][c];
  const herramienta = estado.herramienta;

  const conMensaje = (mensaje: string): EstadoTerritorio => ({ ...estado, mensaje });

  if (herramienta === 'limpiar') {
    if (celda.tipo !== 'escombros') return conMensaje('Solo puedes limpiar celdas de escombros.');
    if (estado.fondos < ACCIONES.limpiar.costo) return conMensaje('Fondos insuficientes.');
    const celdas = estado.celdas.map((fila, i) =>
      fila.map((cel, j) => (i === f && j === c ? { ...cel, tipo: 'tierra' as TipoCelda } : cel)),
    );
    return comprobarVictoria(
      {
        ...estado,
        celdas: recomputarVitalidad(celdas),
        fondos: estado.fondos - ACCIONES.limpiar.costo,
        mensaje: null,
      },
      nivel,
    );
  }

  if (herramienta === 'desminar') {
    if (celda.tipo !== 'minado') return conMensaje('Solo puedes desminar campos minados.');
    if (estado.fondos < ACCIONES.desminar.costo) return conMensaje('Fondos insuficientes.');
    const celdas = estado.celdas.map((fila, i) =>
      fila.map((cel, j) => (i === f && j === c ? { ...cel, tipo: 'tierra' as TipoCelda } : cel)),
    );
    return comprobarVictoria(
      {
        ...estado,
        celdas: recomputarVitalidad(celdas),
        fondos: estado.fondos - ACCIONES.desminar.costo,
        indicadores: aplicarEfectos(estado.indicadores, { seguridad: 5 }),
        mensaje: null,
      },
      nivel,
    );
  }

  // Herramienta = un edificio.
  const def = POR_TIPO[herramienta];
  if (celda.tipo !== 'tierra') {
    if (celda.tipo === 'escombros') return conMensaje('Primero limpia los escombros.');
    if (celda.tipo === 'minado') return conMensaje('Primero hay que desminar. La seguridad va primero.');
    if (celda.tipo === 'casa') return conMensaje('Las casas son de las familias: construye al lado.');
    return conMensaje('Ahí no se puede construir.');
  }
  if (celda.edificio) return conMensaje('Esta celda ya tiene un edificio.');
  if (estado.fondos < def.costo) return conMensaje('Fondos insuficientes.');

  const celdas = estado.celdas.map((fila, i) =>
    fila.map((cel, j) => (i === f && j === c ? { ...cel, edificio: herramienta } : cel)),
  );
  return comprobarVictoria(
    {
      ...estado,
      celdas: recomputarVitalidad(celdas),
      fondos: estado.fondos - def.costo,
      indicadores: aplicarEfectos(estado.indicadores, def.efectos),
      mensaje: null,
    },
    nivel,
  );
}

/** Avanza un mes: ingresos + evento fijo del mes, o evento provocado por el estado del valle. */
export function avanzarMes(estado: EstadoTerritorio, nivel: NivelTerritorio): EstadoTerritorio {
  if (estado.fase !== 'jugando' || estado.eventoActivo) return estado;
  const mes = estado.mes + 1;
  const fondos = Math.max(0, estado.fondos + ingresoMensual(nivel, estado.celdas));

  const ctx: ContextoEvento = { mes, minas: contarMinas(estado.celdas), fondos };
  const evento: EventoTerritorio | null =
    nivel.eventos.find((e) => e.mes === mes && !estado.eventosVistos.includes(e.id)) ??
    nivel.eventosCondicionales.find(
      (e) => !estado.eventosVistos.includes(e.id) && e.condicion(estado.indicadores, ctx),
    ) ??
    null;

  return {
    ...estado,
    mes,
    fondos,
    eventoActivo: evento,
    eventosVistos: evento ? [...estado.eventosVistos, evento.id] : estado.eventosVistos,
    mensaje: null,
  };
}

/** El ataque destruye el edificio más valioso: la tensión se ve en el mapa. */
function destruirEdificio(estado: EstadoTerritorio): {
  celdas: Celda[][];
  mensaje: string | null;
} {
  let objetivo: { f: number; c: number; costo: number } | null = null;
  estado.celdas.forEach((fila, f) =>
    fila.forEach((celda, c) => {
      if (celda.edificio) {
        const costo = POR_TIPO[celda.edificio].costo;
        if (!objetivo || costo > objetivo.costo) objetivo = { f, c, costo };
      }
    }),
  );
  if (!objetivo) return { celdas: estado.celdas, mensaje: null };
  const { f, c } = objetivo;
  const nombre = POR_TIPO[estado.celdas[f][c].edificio!].nombre;
  const antes = contarFamilias(estado.celdas).pobladas;
  const celdas = recomputarVitalidad(
    estado.celdas.map((fila, i) =>
      fila.map((cel, j) =>
        i === f && j === c
          ? { ...cel, edificio: undefined, tipo: 'escombros' as TipoCelda }
          : cel,
      ),
    ),
  );
  const despues = contarFamilias(celdas).pobladas;
  const exodo =
    despues < antes
      ? ` ${antes - despues === 1 ? 'Una familia volvió' : `${antes - despues} familias volvieron`} a desplazarse: el miedo pesa más que la casa.`
      : '';
  return {
    celdas,
    mensaje: `El ataque destruyó: ${nombre}.${exodo}`,
  };
}

/** Resuelve la opción elegida de un evento: aplica efectos y deja la retro pendiente. */
export function resolverEvento(estado: EstadoTerritorio, opcion: OpcionEvento): EstadoTerritorio {
  if (!estado.eventoActivo) return estado;
  let celdas = estado.celdas;
  let mensaje: string | null = null;
  if (opcion.efectoEspecial === 'destruir-edificio') {
    ({ celdas, mensaje } = destruirEdificio(estado));
  }
  return {
    ...estado,
    celdas,
    indicadores: aplicarEfectos(estado.indicadores, opcion.efectos),
    fondos: Math.max(0, estado.fondos + (opcion.fondos ?? 0)),
    codexDescubierto: [...new Set([...estado.codexDescubierto, ...(opcion.codex ?? [])])],
    retroEvento: opcion,
    mensaje,
  };
}

/** Cierra la retro del evento: puede haber victoria — o derrota. */
export function cerrarEvento(estado: EstadoTerritorio, nivel: NivelTerritorio): EstadoTerritorio {
  const ind = estado.indicadores;
  const minimo = Math.min(ind.confianza, ind.seguridad, ind.justicia, ind.legitimidad);
  if (minimo <= 10) {
    return { ...estado, eventoActivo: null, retroEvento: null, fase: 'fracaso', herramienta: null };
  }
  return comprobarVictoria(
    { ...estado, eventoActivo: null, retroEvento: null },
    nivel,
  );
}
