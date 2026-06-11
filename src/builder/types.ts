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
  | 'escuela'
  | 'encuentro'
  | 'mercado'
  | 'memorial'
  | 'emisora'
  | 'cancha';

/** Herramienta activa: un edificio para colocar, o una acción sobre la celda. */
export type Herramienta = TipoEdificio | 'limpiar' | 'desminar';

export interface DefEdificio {
  tipo: TipoEdificio;
  nombre: string;
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
}

export interface Celda {
  tipo: TipoCelda;
  edificio?: TipoEdificio;
  vitalidad: number;
  /** Solo casas: la familia retornó (vitalidad suficiente alrededor). */
  poblada: boolean;
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
}

/** Evento fijo: se dispara en un mes concreto. */
export interface EventoFijo extends EventoTerritorio {
  mes: number;
}

/** Contexto que ven las condiciones de los eventos dinámicos. */
export interface ContextoEvento {
  mes: number;
  minas: number;
  fondos: number;
}

/** Evento condicional: se dispara cuando el estado del valle lo provoca. */
export interface EventoCondicional extends EventoTerritorio {
  condicion: (ind: Indicadores, ctx: ContextoEvento) => boolean;
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
  fondosIniciales: number;
  ingresoBase: number;
  /** Costo mensual de sostener cada edificio: construir de más también es un riesgo. */
  mantenimientoPorEdificio: number;
  indicadoresIniciales: Indicadores;
  eventos: EventoFijo[];
  /** Eventos que el propio estado del valle provoca (la fuente de tensión). */
  eventosCondicionales: EventoCondicional[];
  /** Fracción de casas que deben repoblarse para ganar (0–1). */
  metaFamilias: number;
  /** Valor mínimo que deben alcanzar TODOS los indicadores para ganar. */
  metaIndicador: number;
}
