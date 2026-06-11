import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Lang } from './lang';
import { leerIdiomaGuardado, guardarIdioma } from './lang';
import { DICCIONARIOS, type DiccionarioUI } from './ui';
import { getContent, type Contenido } from '../data/content';

interface ValorContexto {
  lang: Lang;
  setLang: (lang: Lang) => void;
  ui: DiccionarioUI;
  content: Contenido;
}

const LanguageContext = createContext<ValorContexto | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => leerIdiomaGuardado());

  const setLang = (nuevo: Lang) => {
    guardarIdioma(nuevo);
    setLangState(nuevo);
    if (typeof document !== 'undefined') document.documentElement.lang = nuevo;
  };

  const valor = useMemo<ValorContexto>(
    () => ({
      lang,
      setLang,
      ui: DICCIONARIOS[lang],
      content: getContent(lang),
    }),
    [lang],
  );

  return <LanguageContext.Provider value={valor}>{children}</LanguageContext.Provider>;
}

export function useLang(): ValorContexto {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang debe usarse dentro de <LanguageProvider>');
  return ctx;
}
