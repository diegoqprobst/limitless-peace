import type { Indicadores } from '../engine/types';
import { aplicarEfectos } from '../engine/types';
import type {
  Celda,
  ContextoEvento,
  EfectoVisual,
  EventoTerritorio,
  Herramienta,
  NivelTerritorio,
  OpcionEvento,
  TipoCelda,
} from './types';
import {
  ACCIONES,
  POR_TIPO,
  UMBRAL_PERMANENCIA,
  UMBRAL_PRIMERA,
  UMBRAL_RETORNO,
} from './catalogo';
import { DIFICULTADES, type Dificultad } from './dificultad';

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
  /** Diario del valle: registro cronológico de lo que va pasando (desktop). */
  diario: string[];
  /** Efecto ambiental activo sobre el tablero 3D (lluvia, ataque). */
  efectoVisual: EfectoVisual | null;
  dificultad: Dificultad;
  /** Semilla del azar (eventos aleatorios). Determinista para los tests, variable en partida real. */
  semilla: number;
}

/**
 * Generador congruencial lineal: avanza la semilla de forma determinista.
 * No usamos Math.random para que el motor siga siendo puro y reproducible;
 * la variabilidad real entre partidas viene de la semilla que pasa la UI.
 */
function siguienteSemilla(s: number): number {
  return (Math.imul(s, 1103515245) + 12345) & 0x7fffffff;
}

/** Probabilidad (0–100) de que un mes libre traiga un evento aleatorio. */
const PROB_EVENTO_ALEATORIO = 70;

const TIPO_POR_CARACTER: Record<string, TipoCelda> = {
  T: 'tierra',
  E: 'escombros',
  C: 'casa',
  M: 'minado',
  R: 'rio',
};

/**
 * Relieve determinista del terreno (0 valle … 3 colina). Dos ondas suaves
 * dan colinas y vaguadas; el río corre por el fondo del valle (siempre 0)
 * y sus orillas quedan bajas. Es visual — da carácter al mapa sin tocar la
 * mecánica (la "ubicación segura" por elevación llegará en un nivel futuro).
 */
function relieve(f: number, c: number, tipo: Celda['tipo']): number {
  if (tipo === 'rio') return 0;
  const onda = Math.sin(c * 0.7 + 0.5) * 1.3 + Math.cos(f * 0.9 + 1.2) * 1.1 + 1.4;
  return Math.max(0, Math.min(3, Math.round(onda)));
}

export function crearEstado(
  nivel: NivelTerritorio,
  dificultad: Dificultad = 'libre',
  semilla = 1,
): EstadoTerritorio {
  const celdas: Celda[][] = nivel.mapa.map((fila, f) =>
    fila.split('').map((c, col) => {
      const tipo = TIPO_POR_CARACTER[c] ?? 'tierra';
      return {
        tipo,
        vitalidad: 0,
        poblada: false,
        elevacion: relieve(f, col, tipo),
      };
    }),
  );
  // La base humanitaria llega antes que todo lo demás.
  const [bf, bc] = nivel.posicionBase;
  celdas[bf][bc] = { ...celdas[bf][bc], tipo: 'tierra', edificio: 'base' };
  return {
    celdas: recomputarVitalidad(celdas),
    fondos: DIFICULTADES[dificultad].fondosIniciales,
    mes: 1,
    dificultad,
    indicadores: nivel.indicadoresIniciales,
    herramienta: null,
    eventoActivo: null,
    retroEvento: null,
    eventosVistos: [],
    codexDescubierto: [],
    fase: 'intro',
    mensaje: null,
    diario: ['Mes 1 · ⛺ El equipo humanitario instala su base en el valle.'],
    efectoVisual: null,
    semilla: semilla & 0x7fffffff,
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

  const resultado = celdas.map((fila, f) =>
    fila.map((celda, c) => {
      const v = Math.min(100, vitalidad[f][c]);
      return {
        ...celda,
        vitalidad: v,
        // Retornar exige UMBRAL_RETORNO; quedarse, solo UMBRAL_PERMANENCIA.
        poblada:
          celda.tipo === 'casa' &&
          (v >= UMBRAL_RETORNO || (celda.poblada && v >= UMBRAL_PERMANENCIA)),
      };
    }),
  );

  // La primera familia del valle vuelve antes: si nadie ha retornado aún,
  // la casa con más vitalidad (≥ UMBRAL_PRIMERA) se repuebla.
  const hayPoblada = resultado.some((fila) => fila.some((c) => c.poblada));
  if (!hayPoblada) {
    let mejor: { f: number; c: number; v: number } | null = null;
    resultado.forEach((fila, f) =>
      fila.forEach((celda, c) => {
        if (celda.tipo === 'casa' && celda.vitalidad >= UMBRAL_PRIMERA) {
          if (!mejor || celda.vitalidad > mejor.v) mejor = { f, c, v: celda.vitalidad };
        }
      }),
    );
    if (mejor) {
      const { f, c } = mejor;
      resultado[f][c] = { ...resultado[f][c], poblada: true };
    }
  }

  return resultado;
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

/** Bono comunitario del mercado: la economía local acelera la recuperación. */
export const BONO_MERCADO = 1.5;

/**
 * Ingreso neto mensual: base + mercados − mantenimiento. Si hay al menos un
 * mercado, la comunidad reactiva la economía y los recursos se recuperan
 * 1.5× más rápido (solo cuando el balance es positivo).
 */
export function ingresoMensual(
  _nivel: NivelTerritorio,
  celdas: Celda[][],
  dificultad: Dificultad = 'libre',
): number {
  const config = DIFICULTADES[dificultad];
  let ingreso = config.ingresoBase;
  let hayMercado = false;
  for (const fila of celdas) {
    for (const celda of fila) {
      if (celda.edificio && celda.edificio !== 'base') {
        ingreso += POR_TIPO[celda.edificio].ingresoMensual ?? 0;
        ingreso -= config.mantenimientoPorEdificio;
        if (celda.edificio === 'mercado') hayMercado = true;
      }
    }
  }
  if (hayMercado && ingreso > 0) ingreso = Math.round(ingreso * BONO_MERCADO);
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
        diario: [...estado.diario, `Mes ${estado.mes} · 🧹 Escombros despejados.`],
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
        diario: [...estado.diario, `Mes ${estado.mes} · ⛏️ Campo desminado: la tierra vuelve a ser tierra.`],
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

  const celdas = recomputarVitalidad(
    estado.celdas.map((fila, i) =>
      fila.map((cel, j) => (i === f && j === c ? { ...cel, edificio: herramienta } : cel)),
    ),
  );
  const antes = contarFamilias(estado.celdas).pobladas;
  const despues = contarFamilias(celdas).pobladas;
  const diario = [...estado.diario, `Mes ${estado.mes} · ${def.emoji} Construido: ${def.nombre}.`];
  if (despues > antes) {
    diario.push(
      `Mes ${estado.mes} · 🏠 ${despues - antes === 1 ? 'Una familia retornó' : `${despues - antes} familias retornaron`} al valle.`,
    );
  }
  return comprobarVictoria(
    {
      ...estado,
      celdas,
      fondos: estado.fondos - def.costo,
      indicadores: aplicarEfectos(estado.indicadores, def.efectos),
      mensaje: null,
      diario,
    },
    nivel,
  );
}

/**
 * Avanza un mes: ingresos + el evento que toque. Prioridad:
 *   1) evento fijo del mes  2) evento que el estado del valle provoca
 *   3) — si el mes quedó libre — un evento aleatorio del montón (la vida real).
 * Los aleatorios van al final para no pisar la tensión guionizada.
 */
export function avanzarMes(estado: EstadoTerritorio, nivel: NivelTerritorio): EstadoTerritorio {
  if (estado.fase !== 'jugando' || estado.eventoActivo) return estado;
  const mes = estado.mes + 1;
  const fondos = Math.max(0, estado.fondos + ingresoMensual(nivel, estado.celdas, estado.dificultad));

  const planas = estado.celdas.flat();
  const ctx: ContextoEvento = {
    mes,
    minas: contarMinas(estado.celdas),
    fondos,
    hayAgua: planas.some((c) => c.edificio === 'agua'),
    hayAlimentos: planas.some((c) => c.edificio === 'alimentos'),
    hayEducacion: planas.some((c) => c.edificio === 'escuela' || c.edificio === 'cancha'),
    familias: contarFamilias(estado.celdas).pobladas,
    vistos: estado.eventosVistos,
    umbralIncursion: DIFICULTADES[estado.dificultad].umbralIncursion,
  };
  let evento: EventoTerritorio | null =
    nivel.eventos.find((e) => e.mes === mes && !estado.eventosVistos.includes(e.id)) ??
    nivel.eventosCondicionales.find(
      (e) => !estado.eventosVistos.includes(e.id) && e.condicion(estado.indicadores, ctx),
    ) ??
    null;

  // Mes libre: tira el azar a ver si la vida del valle interrumpe la calma.
  let semilla = estado.semilla;
  if (!evento) {
    semilla = siguienteSemilla(semilla);
    if (semilla % 100 < PROB_EVENTO_ALEATORIO) {
      const elegibles = nivel.eventosAleatorios.filter(
        (e) => !estado.eventosVistos.includes(e.id) && (!e.puede || e.puede(ctx)),
      );
      if (elegibles.length) {
        semilla = siguienteSemilla(semilla);
        evento = elegibles[semilla % elegibles.length];
      }
    }
  }

  return {
    ...estado,
    mes,
    fondos,
    semilla,
    eventoActivo: evento,
    eventosVistos: evento ? [...estado.eventosVistos, evento.id] : estado.eventosVistos,
    mensaje: null,
    diario: evento
      ? [...estado.diario, `Mes ${mes} · ⚠️ ${evento.titulo}`]
      : estado.diario,
    efectoVisual: evento?.visual === 'lluvia' ? { tipo: 'lluvia' } : null,
  };
}

/** El ataque destruye el edificio más valioso (nunca la base): la tensión se ve en el mapa. */
function destruirEdificio(estado: EstadoTerritorio): {
  celdas: Celda[][];
  mensaje: string | null;
  celdaAtacada: [number, number] | null;
} {
  let objetivo: { f: number; c: number; costo: number } | null = null;
  estado.celdas.forEach((fila, f) =>
    fila.forEach((celda, c) => {
      if (celda.edificio && celda.edificio !== 'base') {
        const costo = POR_TIPO[celda.edificio].costo;
        if (!objetivo || costo > objetivo.costo) objetivo = { f, c, costo };
      }
    }),
  );
  if (!objetivo) return { celdas: estado.celdas, mensaje: null, celdaAtacada: null };
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
    celdaAtacada: [f, c],
  };
}

/** Resuelve la opción elegida de un evento: aplica efectos y deja la retro pendiente. */
export function resolverEvento(estado: EstadoTerritorio, opcion: OpcionEvento): EstadoTerritorio {
  if (!estado.eventoActivo) return estado;
  let celdas = estado.celdas;
  let mensaje: string | null = null;
  let efectoVisual = estado.efectoVisual;
  const diario = [...estado.diario, `→ ${opcion.texto}`];
  if (opcion.efectoEspecial === 'destruir-edificio') {
    let celdaAtacada: [number, number] | null = null;
    ({ celdas, mensaje, celdaAtacada } = destruirEdificio(estado));
    if (mensaje) diario.push(`Mes ${estado.mes} · 💥 ${mensaje}`);
    if (celdaAtacada) efectoVisual = { tipo: 'ataque', f: celdaAtacada[0], c: celdaAtacada[1] };
  }
  return {
    ...estado,
    celdas,
    indicadores: aplicarEfectos(estado.indicadores, opcion.efectos),
    fondos: Math.max(0, estado.fondos + (opcion.fondos ?? 0)),
    codexDescubierto: [...new Set([...estado.codexDescubierto, ...(opcion.codex ?? [])])],
    retroEvento: opcion,
    mensaje,
    diario,
    efectoVisual,
  };
}

/** Cierra la retro del evento: puede haber victoria — o derrota. */
export function cerrarEvento(estado: EstadoTerritorio, nivel: NivelTerritorio): EstadoTerritorio {
  const ind = estado.indicadores;
  const minimo = Math.min(ind.confianza, ind.seguridad, ind.justicia, ind.legitimidad);
  if (minimo <= 10) {
    return {
      ...estado,
      eventoActivo: null,
      retroEvento: null,
      fase: 'fracaso',
      herramienta: null,
      efectoVisual: null,
    };
  }
  return comprobarVictoria(
    { ...estado, eventoActivo: null, retroEvento: null, efectoVisual: null },
    nivel,
  );
}
