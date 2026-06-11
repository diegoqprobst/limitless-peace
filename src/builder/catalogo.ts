import type { DefEdificio, TipoEdificio } from './types';

/**
 * Catálogo de edificios del modo Territorio.
 * Cada edificio repara una dimensión distinta del tejido social: el diseño
 * obliga a construir equilibrado (solo escuelas no levanta la justicia;
 * solo memoriales no genera economía).
 */
export const EDIFICIOS: DefEdificio[] = [
  {
    tipo: 'salud',
    nombre: 'Puesto de salud',
    emoji: '🏥',
    costo: 40,
    radio: 2,
    aporteVitalidad: 15,
    efectos: { seguridad: 8 },
    descripcion: 'Atención básica. La presencia de salud es la primera señal de que el Estado volvió.',
  },
  {
    tipo: 'escuela',
    nombre: 'Escuela rural',
    emoji: '🏫',
    costo: 35,
    radio: 2,
    aporteVitalidad: 12,
    efectos: { legitimidad: 6, confianza: 4 },
    descripcion: 'Donde estudian juntos los hijos de todos los bandos.',
  },
  {
    tipo: 'encuentro',
    nombre: 'Espacio de culto y encuentro',
    emoji: '🛐',
    costo: 25,
    radio: 2,
    aporteVitalidad: 10,
    efectos: { confianza: 10 },
    descripcion: 'Abierto a todas las confesiones. La comunidad vuelve a mirarse a la cara.',
  },
  {
    tipo: 'mercado',
    nombre: 'Mercado campesino',
    emoji: '🏪',
    costo: 30,
    radio: 1,
    aporteVitalidad: 10,
    efectos: { legitimidad: 4 },
    ingresoMensual: 10,
    descripcion: 'Economía local: genera +10 fondos cada mes.',
  },
  {
    tipo: 'memorial',
    nombre: 'Memorial de las víctimas',
    emoji: '🕯️',
    costo: 20,
    radio: 1,
    aporteVitalidad: 6,
    efectos: { justicia: 12 },
    descripcion: 'Recordar para no repetir. Sin memoria no hay justicia.',
  },
  {
    tipo: 'emisora',
    nombre: 'Emisora comunitaria',
    emoji: '📻',
    costo: 30,
    radio: 3,
    aporteVitalidad: 5,
    efectos: { legitimidad: 8, confianza: 5 },
    descripcion: 'La voz del valle: pedagogía de paz contra el rumor. Alcance amplio.',
  },
  {
    tipo: 'cancha',
    nombre: 'Cancha y parque',
    emoji: '⚽',
    costo: 15,
    radio: 1,
    aporteVitalidad: 8,
    efectos: { confianza: 6, seguridad: 3 },
    descripcion: 'Donde la juventud se encuentra en vez de reclutarse.',
  },
];

export const POR_TIPO: Record<TipoEdificio, DefEdificio> = Object.fromEntries(
  EDIFICIOS.map((e) => [e.tipo, e]),
) as Record<TipoEdificio, DefEdificio>;

/** Acciones sobre celdas (no son edificios). */
export const ACCIONES = {
  limpiar: {
    nombre: 'Limpiar escombros',
    emoji: '🧹',
    costo: 10,
    descripcion: 'Despeja una celda de escombros para poder construir.',
  },
  desminar: {
    nombre: 'Desminado humanitario',
    emoji: '⛏️',
    costo: 25,
    descripcion: 'Libera un campo minado. Lento y costoso — como en la realidad.',
  },
} as const;

/** Umbral de vitalidad para que una familia retorne a su casa. */
export const UMBRAL_RETORNO = 50;
