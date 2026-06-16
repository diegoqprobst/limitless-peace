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
    porque: 'Tu campamento. Cuando el valle ya no lo necesite, lo desmontas: eso es ganar.',
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
    mensual: { salud: 4 },
    descripcion:
      'ERU de atención básica de salud: la primera señal de que alguien cuida este lugar.',
    porque:
      'Atiende heridas y enfermedades. Sube la Seguridad y, cada mes, la Salud del valle; junto al agua evita que un brote se descontrole.',
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
    mensual: { salud: 3 },
    descripcion:
      'ERU de agua y saneamiento. El estándar Esfera pide 15 litros por persona al día: ' +
      'sin agua segura no hay retorno posible.',
    porque:
      'Agua potable: sube la Salud cada mes y previene los brotes tras una inundación. Sin ella, las epidemias se disparan.',
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
    mensual: { salud: 2, confianza: 1 },
    descripcion:
      'ERU de socorro: distribución imparcial — según la necesidad, nunca según el bando.',
    porque:
      'Comida para todos sin distinción. Sostiene el retorno y la Salud: sin alimentos cerca, las familias se vuelven a ir.',
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
    mensual: { legitimidad: 1, seguridad: 1 },
    descripcion: 'Donde estudian juntos los hijos de todos los bandos.',
    porque:
      'Niñez con futuro y tardes ocupadas. Previene el reclutamiento juvenil de las disidencias.',
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
    mensual: { legitimidad: 1 },
    ingresoMensual: 10,
    descripcion:
      'Economía local: genera +10 fondos al mes y, al reactivar la comunidad, ' +
      'acelera toda la recuperación de recursos en 1.5×.',
    porque:
      'Reactiva la economía: +10 fondos al mes y acelera TODA la recuperación de recursos en 1.5×.',
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
    mensual: { confianza: 1 },
    descripcion: 'Recordar para no repetir. Sin memoria no hay justicia.',
    porque: 'Reconoce a las víctimas: es lo que más sube la Justicia, y cada mes va cosiendo la Confianza.',
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
    mensual: { confianza: 2 },
    descripcion: 'La voz del valle: pedagogía de paz contra el rumor. Alcance amplio.',
    porque:
      'La voz del valle contra el rumor: sube la Confianza mes a mes y su alcance es el más amplio (radio 3). Pero una radio también puede usarse para incitar — el poder obliga.',
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
    mensual: { legitimidad: 1, salud: 1 },
    descripcion: 'Donde la juventud se encuentra en vez de reclutarse.',
    porque: 'La más barata. Reúne a la juventud, sube la Confianza y, cada mes, la Legitimidad y la Salud; ayuda a prevenir el reclutamiento.',
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
    porque: 'Despeja los escombros de una celda para poder construir ahí.',
  },
  desminar: {
    nombre: 'Desminado humanitario',
    corto: 'Desminar',
    emoji: '⛏️',
    costo: 25,
    descripcion: 'Libera un campo minado. Lento y costoso — como en la realidad.',
    porque: 'Libera un campo minado. Las minas matan años después de la guerra: la seguridad va primero.',
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
