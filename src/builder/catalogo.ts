import type { DefEdificio, TipoEdificio } from './types';

/**
 * Catálogo de edificios del modo Territorio.
 * Cada edificio repara una dimensión distinta del tejido social: el diseño
 * obliga a construir equilibrado (solo escuelas no levanta la justicia;
 * solo memoriales no genera economía).
 */
export const EDIFICIOS: DefEdificio[] = [
  {
    tipo: 'base',
    corto: 'Base',
    nombre: 'Base humanitaria',
    emoji: '⛺',
    costo: 0,
    radio: 2,
    aporteVitalidad: 8,
    efectos: {},
    descripcion:
      'El campamento de tu equipo (ERU Base Camp). Ya está instalado: tu trabajo es que ' +
      'algún día sobre. La victoria es desmontarlo.',
  },
  {
    tipo: 'salud',
    corto: 'Salud',
    nombre: 'Puesto de salud',
    emoji: '🏥',
    costo: 40,
    radio: 2,
    aporteVitalidad: 15,
    efectos: { seguridad: 8 },
    descripcion:
      'ERU de atención básica de salud: la primera señal de que alguien cuida este lugar.',
  },
  {
    tipo: 'agua',
    corto: 'Agua',
    nombre: 'Planta potabilizadora',
    emoji: '💧',
    costo: 35,
    radio: 2,
    aporteVitalidad: 14,
    efectos: { seguridad: 5, legitimidad: 3 },
    descripcion:
      'ERU de agua y saneamiento. El estándar Esfera pide 15 litros por persona al día: ' +
      'sin agua segura no hay retorno posible.',
  },
  {
    tipo: 'alimentos',
    corto: 'Alimentos',
    nombre: 'Centro de distribución de alimentos',
    emoji: '📦',
    costo: 30,
    radio: 2,
    aporteVitalidad: 12,
    efectos: { confianza: 6, legitimidad: 4 },
    descripcion:
      'ERU de socorro: distribución imparcial — según la necesidad, nunca según el bando.',
  },
  {
    tipo: 'escuela',
    corto: 'Escuela',
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
    corto: 'Encuentro',
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
    corto: 'Mercado',
    nombre: 'Mercado campesino',
    emoji: '🏪',
    costo: 30,
    radio: 1,
    aporteVitalidad: 10,
    efectos: { legitimidad: 4 },
    ingresoMensual: 10,
    descripcion:
      'Economía local: genera +10 fondos al mes y, al reactivar la comunidad, ' +
      'acelera toda la recuperación de recursos en 1.5×.',
  },
  {
    tipo: 'memorial',
    corto: 'Memorial',
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
    corto: 'Emisora',
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
    corto: 'Cancha',
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

/** Los edificios que el jugador puede construir (la base viene instalada). */
export const CONSTRUIBLES = EDIFICIOS.filter((e) => e.tipo !== 'base');

/** Acciones sobre celdas (no son edificios). */
export const ACCIONES = {
  limpiar: {
    nombre: 'Limpiar escombros',
    corto: 'Limpiar',
    emoji: '🧹',
    costo: 10,
    descripcion: 'Despeja una celda de escombros para poder construir.',
  },
  desminar: {
    nombre: 'Desminado humanitario',
    corto: 'Desminar',
    emoji: '⛏️',
    costo: 25,
    descripcion: 'Libera un campo minado. Lento y costoso — como en la realidad.',
  },
} as const;

/** Umbral de vitalidad para que una familia retorne a su casa. */
export const UMBRAL_RETORNO = 50;

/**
 * La PRIMERA familia del valle vuelve antes (la esperanza no espera) y,
 * una vez retornada, una familia solo se va si la vitalidad cae por debajo
 * de este umbral (histéresis: volver cuesta más que quedarse).
 */
export const UMBRAL_PRIMERA = 35;
export const UMBRAL_PERMANENCIA = 35;
