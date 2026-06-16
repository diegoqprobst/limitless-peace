/**
 * Tipos del motor del juego. Todo el contenido vive en src/data/ y es
 * editable sin tocar el motor: para crear un nuevo escenario basta con
 * escribir otro arreglo de Nodo[].
 */

export interface Indicadores {
  /** Confianza entre las partes y en la mesa de negociación. */
  confianza: number;
  /** Seguridad física: cese al fuego, protección de civiles y firmantes. */
  seguridad: number;
  /** Justicia: derechos de las víctimas, verdad, reparación, no repetición. */
  justicia: number;
  /** Legitimidad: respaldo social y político al proceso. */
  legitimidad: number;
}

export type ClaveIndicador = keyof Indicadores;

export const NOMBRES_INDICADORES: Record<ClaveIndicador, string> = {
  confianza: 'Confianza',
  seguridad: 'Seguridad',
  justicia: 'Justicia',
  legitimidad: 'Legitimidad',
};

export type Efecto = Partial<Indicadores>;

export interface Opcion {
  texto: string;
  efectos: Efecto;
  /**
   * Retroalimentación psicoeducativa: qué pasó, por qué, y qué dice la
   * evidencia de procesos de paz reales. Es el corazón pedagógico del juego.
   */
  retro: string;
  /** Entradas del códex que esta decisión desbloquea. */
  codex?: string[];
}

export interface Nodo {
  id: string;
  fase: number;
  titulo: string;
  texto: string;
  /** Ilustración de la escena (ruta bajo /public, p. ej. 'escenas/canal-secreto.webp'). */
  imagen?: string;
  opciones: Opcion[];
  /**
   * Siguiente nodo. Puede depender del estado de los indicadores
   * (por ejemplo, una crisis si la confianza cayó demasiado).
   * Si es undefined, la partida termina.
   */
  siguiente?: string | ((ind: Indicadores) => string | undefined);
}

export interface EntradaCodex {
  id: string;
  titulo: string;
  categoria: string;
  definicion: string;
  enLaPractica: string;
  casoReal: string;
  paraReflexionar: string;
}

export interface Final {
  id: string;
  titulo: string;
  descripcion: string;
  leccion: string;
  /** Devuelve true si este final aplica al estado dado. Se evalúan en orden. */
  aplica: (ind: Indicadores) => boolean;
}

export interface NombreFase {
  numero: number;
  nombre: string;
  descripcion: string;
}

export function clamp(valor: number): number {
  return Math.max(0, Math.min(100, valor));
}

export function aplicarEfectos(ind: Indicadores, efectos: Efecto): Indicadores {
  return {
    confianza: clamp(ind.confianza + (efectos.confianza ?? 0)),
    seguridad: clamp(ind.seguridad + (efectos.seguridad ?? 0)),
    justicia: clamp(ind.justicia + (efectos.justicia ?? 0)),
    legitimidad: clamp(ind.legitimidad + (efectos.legitimidad ?? 0)),
  };
}

export function promedio(ind: Indicadores): number {
  return (ind.confianza + ind.seguridad + ind.justicia + ind.legitimidad) / 4;
}
