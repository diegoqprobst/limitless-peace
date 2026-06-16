import type { Indicadores, Efecto } from '../engine/types';

/**
 * Tipos del modo TERRITORIO (builder de restauración social).
 *
 * Misma filosofía que el modo Mesa: el motor es genérico, los niveles son
 * datos. Un nivel nuevo = otro archivo con su mapa, eventos y metas.
 * Los indicadores son LOS MISMOS del juego de decisiones (engine/types.ts):
 * ambos modos comparten el modelo de la paz.
 */

export type TipoCelda = 'tierra' | 'escombros' | 'casa' | 'minado' | 'rio';

export type TipoEdificio =
  | 'salud'
  | 'agua'
  | 'alimentos'
  | 'escuela'
  | 'encuentro'
  | 'mercado'
  | 'memorial'
  | 'emisora'
  | 'cancha'
  /** La base del equipo humanitario: pre-instalada, se desmonta en la victoria. */
  | 'base';

/** Herramienta activa: un edificio para colocar, o una acción sobre la celda. */
export type Herramienta = TipoEdificio | 'limpiar' | 'desminar';

export interface DefEdificio {
  tipo: TipoEdificio;
  nombre: string;
  /** Nombre corto para la barra de construcción. */
  corto: string;
  emoji: string;
  costo: number;
  /** Radio (distancia Chebyshev) al que irradia vitalidad. */
  radio: number;
  /** Vitalidad que aporta a cada celda dentro del radio. */
  aporteVitalidad: number;
  /** Efecto único sobre los indicadores al construirse. */
  efectos: Efecto;
  /** Fondos que genera cada mes (mercados). */
  ingresoMensual?: number;
  descripcion: string;
  /** Explicación en lenguaje claro de QUÉ cambia (para el tooltip). */
  porque: string;
}

export interface Celda {
  tipo: TipoCelda;
  edificio?: TipoEdificio;
  vitalidad: number;
  /** Solo casas: la familia retornó (vitalidad suficiente alrededor). */
  poblada: boolean;
  /** Relieve del terreno (0 valle … 3 colina): visual, da carácter al mapa. */
  elevacion: number;
}

export interface OpcionEvento {
  texto: string;
  efectos: Efecto;
  fondos?: number;
  retro: string;
  codex?: string[];
  /** Consecuencia material sobre el mapa (la tensión se ve, no solo se resta). */
  efectoEspecial?: 'destruir-edificio';
}

/** Eco histórico: la historia real que resuena con este momento del juego. */
export interface EcoHistorico {
  /** id de una Historia (data/historias.ts). */
  historiaId: string;
  /** 2-3 líneas que conectan el momento del juego con la historia real. */
  texto: string;
}

export interface EventoTerritorio {
  id: string;
  titulo: string;
  texto: string;
  opciones: OpcionEvento[];
  eco?: EcoHistorico;
  /** Efecto visual ambiental en el tablero 3D mientras el evento está activo. */
  visual?: 'lluvia';
}

/** Efecto visual transitorio sobre el tablero 3D. */
export type EfectoVisual = { tipo: 'lluvia' } | { tipo: 'ataque'; f: number; c: number };

/** Evento fijo: se dispara en un mes concreto. */
export interface EventoFijo extends EventoTerritorio {
  mes: number;
}

/** Contexto que ven las condiciones de los eventos dinámicos. */
export interface ContextoEvento {
  mes: number;
  minas: number;
  fondos: number;
  /** Hay una planta potabilizadora construida (cadena aluvión→enfermedad). */
  hayAgua: boolean;
  /** Hay centro de distribución de alimentos (cadena retorno frágil). */
  hayAlimentos: boolean;
  /** Hay escuela o cancha (cadena reclutamiento juvenil). */
  hayEducacion: boolean;
  /** Familias retornadas hasta ahora. */
  familias: number;
  /** Eventos ya ocurridos: permite encadenar consecuencias. */
  vistos: string[];
  /** Umbral de seguridad bajo el cual llega la incursión (según dificultad). */
  umbralIncursion: number;
}

/** Evento condicional: se dispara cuando el estado del valle lo provoca. */
export interface EventoCondicional extends EventoTerritorio {
  condicion: (ind: Indicadores, ctx: ContextoEvento) => boolean;
}

/**
 * Evento aleatorio: no lo provoca el estado ni un mes fijo. En un mes "libre"
 * (sin evento guionizado ni condicional pendiente) puede aparecer uno del montón,
 * elegido al azar — la vida real del posconflicto, que llega cuando menos se espera.
 * Inspirados en la experiencia humanitaria de la Cruz Roja / Media Luna Roja.
 */
export interface EventoAleatorio extends EventoTerritorio {
  /** Filtro opcional: solo elegible si el contexto lo permite (p. ej. un mes mínimo). */
  puede?: (ctx: ContextoEvento) => boolean;
}

export interface NivelTerritorio {
  id: string;
  nombre: string;
  lugar: string;
  intro: string;
  /** Nota de inspiración histórica (se muestra al jugador: ficción + caso real). */
  inspiracion: string;
  /**
   * Mapa como filas de caracteres:
   * T tierra · E escombros · C casa destruida · M campo minado · R río
   */
  mapa: string[];
  /** Celda donde se instala la base humanitaria al comenzar. */
  posicionBase: [number, number];
  fondosIniciales: number;
  ingresoBase: number;
  /** Costo mensual de sostener cada edificio: construir de más también es un riesgo. */
  mantenimientoPorEdificio: number;
  indicadoresIniciales: Indicadores;
  eventos: EventoFijo[];
  /** Eventos que el propio estado del valle provoca (la fuente de tensión). */
  eventosCondicionales: EventoCondicional[];
  /** Montón de eventos que pueden caer al azar en los meses libres. */
  eventosAleatorios: EventoAleatorio[];
  /** Fracción de casas que deben repoblarse para ganar (0–1). */
  metaFamilias: number;
  /** Valor mínimo que deben alcanzar TODOS los indicadores para ganar. */
  metaIndicador: number;
}
