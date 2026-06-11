import type { Lang } from './lang';
import type { ClaveIndicador } from '../engine/types';

/**
 * Diccionario de la interfaz (botones, etiquetas, títulos de pantalla).
 * NO contiene el contenido del juego (eso vive en src/data/). Solo el "chrome".
 *
 * Cada clave existe en los dos idiomas. Algunas son funciones porque
 * interpolan números o nombres.
 */
export interface DiccionarioUI {
  codexBtn: string;
  footer: string;
  idiomaLabel: string;

  // Indicadores
  indicadores: Record<ClaveIndicador, string>;

  // Pantalla de inicio
  inicioSobretitulo: string;
  inicioRolTitulo: string;
  inicioComoTitulo: string;
  inicioComenzar: string;

  // Pantalla de juego
  faseLabel: (n: number, nombre: string) => string;
  retroLabel: string;
  tuDecision: string;
  nuevoCodex: string;
  continuar: string;

  // Pantalla final
  finalSobretitulo: string;
  leccionLabel: string;
  estadoLabel: string;
  indicePaz: string;
  decisionesTomadas: string;
  codexDescubierto: string;
  reintentar: string;
  repasarCodex: string;
  notaFinal: string;

  // Códex
  codexTitulo: string;
  codexIntro: (total: number) => string;
  codexVolver: string;
  codexQueEs: string;
  codexPractica: string;
  codexCaso: string;
  codexDiscutir: string;
}

const ES: DiccionarioUI = {
  codexBtn: '📖 Códex',
  footer:
    'Un juego de pedagogía de paz · proyecto voluntario inspirado en procesos de paz reales · ' +
    'los personajes y el país son ficticios',
  idiomaLabel: 'Idioma',

  indicadores: {
    confianza: 'Confianza',
    seguridad: 'Seguridad',
    justicia: 'Justicia',
    legitimidad: 'Legitimidad',
  },

  inicioSobretitulo: 'Un juego sobre cómo se construye — y se pierde — la paz',
  inicioRolTitulo: 'Tu rol',
  inicioComoTitulo: 'Cómo se juega',
  inicioComenzar: 'Comenzar el proceso →',

  faseLabel: (n, nombre) => `Fase ${n} · ${nombre}`,
  retroLabel: 'Lo que dice la experiencia real',
  tuDecision: 'Tu decisión:',
  nuevoCodex: '📖 Nuevo en el Códex:',
  continuar: 'Continuar →',

  finalSobretitulo: 'El proceso terminó',
  leccionLabel: 'Lección del proceso',
  estadoLabel: 'Estado final de los indicadores',
  indicePaz: 'Índice de paz',
  decisionesTomadas: 'Decisiones tomadas',
  codexDescubierto: 'Códex descubierto',
  reintentar: '↺ Intentarlo de nuevo',
  repasarCodex: '📖 Repasar el Códex',
  notaFinal:
    'Cada partida toma caminos distintos. Si juegas en grupo, comparen sus finales y discutan: ' +
    '¿qué decisión cambió más el rumbo? ¿En qué se parecía a un caso real?',

  codexTitulo: '📖 Códex — Cómo funcionan los procesos de paz',
  codexIntro: (total) =>
    `La documentación del juego: ${total} conceptos reales de construcción de paz, con casos ` +
    'históricos y preguntas para discutir. Las entradas marcadas con 🕊️ las descubriste jugando.',
  codexVolver: '← Volver al índice',
  codexQueEs: '¿Qué es?',
  codexPractica: 'En la práctica',
  codexCaso: 'Caso real',
  codexDiscutir: '💬 Para discutir',
};

const EN: DiccionarioUI = {
  codexBtn: '📖 Codex',
  footer:
    'A peace-education game · volunteer project inspired by real peace processes · ' +
    'the characters and country are fictional',
  idiomaLabel: 'Language',

  indicadores: {
    confianza: 'Trust',
    seguridad: 'Security',
    justicia: 'Justice',
    legitimidad: 'Legitimacy',
  },

  inicioSobretitulo: 'A game about how peace is built — and lost',
  inicioRolTitulo: 'Your role',
  inicioComoTitulo: 'How to play',
  inicioComenzar: 'Begin the process →',

  faseLabel: (n, nombre) => `Phase ${n} · ${nombre}`,
  retroLabel: 'What real-world experience tells us',
  tuDecision: 'Your decision:',
  nuevoCodex: '📖 New in the Codex:',
  continuar: 'Continue →',

  finalSobretitulo: 'The process has ended',
  leccionLabel: 'Lesson of the process',
  estadoLabel: 'Final state of the indicators',
  indicePaz: 'Peace index',
  decisionesTomadas: 'Decisions made',
  codexDescubierto: 'Codex discovered',
  reintentar: '↺ Try again',
  repasarCodex: '📖 Review the Codex',
  notaFinal:
    'Every playthrough takes a different path. If you play as a group, compare your endings and ' +
    'discuss: which decision changed the course the most? How did it resemble a real case?',

  codexTitulo: '📖 Codex — How peace processes work',
  codexIntro: (total) =>
    `The game's documentation: ${total} real concepts of peacebuilding, with historical cases ` +
    'and questions for discussion. Entries marked with 🕊️ are the ones you discovered by playing.',
  codexVolver: '← Back to index',
  codexQueEs: 'What is it?',
  codexPractica: 'In practice',
  codexCaso: 'Real case',
  codexDiscutir: '💬 For discussion',
};

export const DICCIONARIOS: Record<Lang, DiccionarioUI> = { es: ES, en: EN };
