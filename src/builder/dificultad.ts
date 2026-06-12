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
}

export const DIFICULTADES: Record<Dificultad, ConfigDificultad> = {
  principiante: {
    nombre: 'Principiante',
    emoji: '🌱',
    descripcion: 'Más fondos y amenazas pacientes. Para aprender cómo se teje un valle.',
    fondosIniciales: 170,
    ingresoBase: 26,
    mantenimientoPorEdificio: 1,
    umbralIncursion: 28,
  },
  libre: {
    nombre: 'Libre',
    emoji: '🕊️',
    descripcion: 'La experiencia diseñada: recursos justos, decisiones con peso.',
    fondosIniciales: 120,
    ingresoBase: 20,
    mantenimientoPorEdificio: 2,
    umbralIncursion: 40,
  },
  dificil: {
    nombre: 'Difícil',
    emoji: '🔥',
    descripcion: 'Recursos escasos y saboteadores atentos. Como la realidad.',
    fondosIniciales: 95,
    ingresoBase: 16,
    mantenimientoPorEdificio: 3,
    umbralIncursion: 48,
  },
};
