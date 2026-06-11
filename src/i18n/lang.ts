/**
 * Internacionalización (i18n) — definición del idioma.
 *
 * El español es el idioma BASE: el contenido del juego (escenario, códex,
 * finales) se escribe en español en src/data/. El inglés es una CAPA de
 * traducción (src/data/en.ts) que se superpone por id; si una pieza no está
 * traducida, el sistema usa el español automáticamente (fallback).
 *
 * Agregar un idioma nuevo = añadir su código aquí, su capa de texto en
 * src/data/<lang>.ts y su diccionario de interfaz en ui.ts. El MOTOR no cambia.
 */
export type Lang = 'es' | 'en';

export const IDIOMAS: { codigo: Lang; etiqueta: string }[] = [
  { codigo: 'es', etiqueta: 'ES' },
  { codigo: 'en', etiqueta: 'EN' },
];

export const IDIOMA_POR_DEFECTO: Lang = 'es';

const CLAVE_ALMACENAMIENTO = 'limitless-peace:lang';

export function leerIdiomaGuardado(): Lang {
  if (typeof localStorage === 'undefined') return IDIOMA_POR_DEFECTO;
  const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
  if (guardado === 'es' || guardado === 'en') return guardado;
  // Si no hay preferencia, intentar deducir del navegador.
  const navegador = typeof navigator !== 'undefined' ? navigator.language : '';
  return navegador.startsWith('en') ? 'en' : IDIOMA_POR_DEFECTO;
}

export function guardarIdioma(lang: Lang): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(CLAVE_ALMACENAMIENTO, lang);
  }
}
