/**
 * Auto-guardado local del progreso (sin cuentas, sin backend).
 * El estado de cada modo se serializa en localStorage; al volver, se reanuda.
 * Versionado: si cambia la forma del estado, los guardados viejos se ignoran
 * (el jugador empieza limpio) en vez de romper el juego.
 */
const PREFIJO = 'lp-save:';
// v2: el Territorio añadió etapas/hitos/tejido comunitario — invalida saves previos.
const VERSION = 2;

export function guardarProgreso<T>(clave: string, datos: T): void {
  try {
    localStorage.setItem(PREFIJO + clave, JSON.stringify({ v: VERSION, datos }));
  } catch {
    // almacenamiento lleno, en privado, o no disponible: el juego sigue sin guardar.
  }
}

export function cargarProgreso<T>(clave: string): T | null {
  try {
    const crudo = localStorage.getItem(PREFIJO + clave);
    if (!crudo) return null;
    const obj = JSON.parse(crudo) as { v?: number; datos?: T };
    if (!obj || obj.v !== VERSION) return null; // versión incompatible → ignorar
    return (obj.datos ?? null) as T | null;
  } catch {
    return null;
  }
}

export function borrarProgreso(clave: string): void {
  try {
    localStorage.removeItem(PREFIJO + clave);
  } catch {
    // ignorar
  }
}
