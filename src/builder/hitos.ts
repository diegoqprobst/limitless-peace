import type { EstadoTerritorio } from './engine';
import { contarFamilias } from './engine';

/**
 * HITOS DE "VIDA QUE VUELVE" (estilo Terra Nil).
 *
 * En Terra Nil no atraes fauna poniendo una pieza suelta: combinas factores.
 * Aquí igual — cada hito es una SEÑAL de que la sociedad revive y exige una
 * COMBINACIÓN (edificios + indicadores + familias), no un edificio aislado.
 * Descubrir los 4 cierra la etapa "vida" y habilita la retirada del equipo.
 */
export interface Hito {
  id: string;
  emoji: string;
  titulo: string;
  /** Pista de qué combinación lo desbloquea (para la UI). */
  pista: string;
  cumple: (e: EstadoTerritorio) => boolean;
}

function hay(e: EstadoTerritorio, edificio: string): boolean {
  return e.celdas.some((fila) => fila.some((c) => c.edificio === edificio));
}

export const HITOS: Hito[] = [
  {
    id: 'aulas',
    emoji: '🧒',
    titulo: 'Las aulas se llenan',
    pista: 'Escuela + seguridad ≥ 45 + al menos 2 familias',
    cumple: (e) =>
      hay(e, 'escuela') &&
      e.indicadores.seguridad >= 45 &&
      contarFamilias(e.celdas).pobladas >= 2,
  },
  {
    id: 'voz',
    emoji: '📻',
    titulo: 'Vuelve la voz común',
    pista: 'Emisora + confianza ≥ 55',
    cumple: (e) => hay(e, 'emisora') && e.indicadores.confianza >= 55,
  },
  {
    id: 'memoria',
    emoji: '🕯️',
    titulo: 'La memoria encuentra paz',
    pista: 'Memorial + justicia ≥ 50',
    cumple: (e) => hay(e, 'memorial') && e.indicadores.justicia >= 50,
  },
  {
    id: 'valle-sano',
    emoji: '💧',
    titulo: 'El valle sano',
    pista: 'Agua + alimentos + salud ≥ 60',
    cumple: (e) => hay(e, 'agua') && hay(e, 'alimentos') && e.salud >= 60,
  },
];

export const HITOS_REQUERIDOS = HITOS.length; // los 4
