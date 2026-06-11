import type { Lang } from '../i18n/lang';
import type { Nodo, EntradaCodex, Final, Indicadores, NombreFase } from '../engine/types';
import {
  CONTEXTO,
  FASES,
  NODOS,
  NODO_INICIAL,
  INDICADORES_INICIALES,
} from './escenario';
import { CODEX } from './codex';
import { FINALES } from './finales';
import { EN } from './en';

/**
 * getContent(lang) combina:
 *   - ESTRUCTURA + texto base (español), en escenario.ts / codex.ts / finales.ts
 *   - CAPA de texto del idioma (en.ts), superpuesta por id
 *
 * Si el idioma es español, o si una entrada no está traducida, se usa el texto
 * base. La lógica del juego (efectos, ramificaciones, condiciones) vive una sola
 * vez en español y NO se duplica por idioma.
 */
export interface Contenido {
  contexto: { titulo: string; resumen: string };
  fases: NombreFase[];
  nodoInicial: string;
  indicadoresIniciales: Indicadores;
  nodos: Nodo[];
  obtenerNodo: (id: string) => Nodo;
  codex: EntradaCodex[];
  categoriasCodex: string[];
  obtenerEntradaCodex: (id: string) => EntradaCodex | undefined;
  finales: Final[];
  obtenerFinal: (ind: Indicadores) => Final;
}

export function getContent(lang: Lang): Contenido {
  const overlay = lang === 'en' ? EN : null;

  const contexto = overlay?.contexto ?? CONTEXTO;

  const fases: NombreFase[] = FASES.map((f) => {
    const t = overlay?.fases[f.numero];
    return t ? { numero: f.numero, nombre: t.nombre, descripcion: t.descripcion } : f;
  });

  const nodos: Nodo[] = NODOS.map((n) => {
    const t = overlay?.nodos[n.id];
    if (!t) return n;
    return {
      ...n,
      titulo: t.titulo,
      texto: t.texto,
      opciones: n.opciones.map((o, i) => ({
        ...o,
        texto: t.opciones[i]?.texto ?? o.texto,
        retro: t.opciones[i]?.retro ?? o.retro,
      })),
    };
  });

  const codex: EntradaCodex[] = CODEX.map((e) => {
    const t = overlay?.codex[e.id];
    return t ? { id: e.id, ...t } : e;
  });

  const finales: Final[] = FINALES.map((f) => {
    const t = overlay?.finales[f.id];
    return t ? { ...f, ...t } : f;
  });

  const obtenerNodo = (id: string): Nodo => {
    const nodo = nodos.find((n) => n.id === id);
    if (!nodo) throw new Error(`Nodo no encontrado: ${id}`);
    return nodo;
  };

  const obtenerFinal = (ind: Indicadores): Final =>
    finales.find((f) => f.aplica(ind)) ?? finales[finales.length - 1];

  return {
    contexto,
    fases,
    nodoInicial: NODO_INICIAL,
    indicadoresIniciales: INDICADORES_INICIALES,
    nodos,
    obtenerNodo,
    codex,
    categoriasCodex: [...new Set(codex.map((e) => e.categoria))],
    obtenerEntradaCodex: (id) => codex.find((e) => e.id === id),
    finales,
    obtenerFinal,
  };
}
