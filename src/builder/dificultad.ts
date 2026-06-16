/**
 * Modos de dificultad del Territorio. No cambian el contenido — cambian
 * cuánto perdona el sistema: fondos, economía y qué tan atentos están
 * los saboteadores.
 */

export type Dificultad = 'principiante' | 'libre' | 'dificil';

export interface ConfigDificultad {
  nombre: string;
  emoji: string;
  descripcion: string;
  fondosIniciales: number;
  ingresoBase: number;
  mantenimientoPorEdificio: number;
  /** La incursión llega si la seguridad está por debajo de este umbral. */
  umbralIncursion: number;
  /** Salud con la que arranca el valle (concreta). */
  saludInicial: number;
  /** Factor sobre la producción mensual de bienestar (>1 perdona, <1 exige). */
  multProduccion: number;
  /** Factor sobre la erosión por necesidades sin cubrir (>1 castiga más). */
  multErosion: number;
}

export const DIFICULTADES: Record<Dificultad, ConfigDificultad> = {
  principiante: {
    nombre: 'Principiante',
    emoji: '🌱',
    descripcion: 'Más fondos, salud holgada y un valle que perdona. Para aprender a tejer.',
    fondosIniciales: 170,
    ingresoBase: 26,
    mantenimientoPorEdificio: 1,
    umbralIncursion: 28,
    saludInicial: 40,
    multProduccion: 1.25,
    multErosion: 0.5,
  },
  libre: {
    nombre: 'Libre',
    emoji: '🕊️',
    descripcion: 'La experiencia diseñada: recursos justos y un valle que cobra el descuido.',
    fondosIniciales: 120,
    ingresoBase: 20,
    mantenimientoPorEdificio: 2,
    umbralIncursion: 40,
    saludInicial: 25,
    multProduccion: 1.0,
    multErosion: 1.3,
  },
  dificil: {
    nombre: 'Difícil',
    emoji: '🔥',
    descripcion: 'Recursos escasos, salud frágil y saboteadores atentos. Como la realidad.',
    fondosIniciales: 95,
    ingresoBase: 16,
    mantenimientoPorEdificio: 3,
    umbralIncursion: 48,
    saludInicial: 18,
    multProduccion: 0.85,
    multErosion: 1.7,
  },
};
