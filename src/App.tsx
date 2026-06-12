import { useReducer, useState } from 'react';
import type { Indicadores, Opcion } from './engine/types';
import { aplicarEfectos } from './engine/types';
import { LanguageProvider, useLang } from './i18n/LanguageContext';
import { IDIOMAS } from './i18n/lang';
import { PantallaInicio } from './components/PantallaInicio';
import { PantallaJuego } from './components/PantallaJuego';
import { PantallaFinal } from './components/PantallaFinal';
import { Codex } from './components/Codex';
import { lazy, Suspense } from 'react';
import { MenuPrincipal } from './components/MenuPrincipal';
import { Territorio } from './components/Territorio';

/** El Jardín de la Memoria usa Three.js: se descarga solo al entrar. */
const Historias = lazy(() =>
  import('./components/Historias').then((m) => ({ default: m.Historias })),
);

type Modo = 'menu' | 'mesa' | 'territorio' | 'memoria';

interface RetroPendiente {
  opcion: Opcion;
  indicadoresPrevios: Indicadores;
}

interface EstadoJuego {
  pantalla: 'inicio' | 'juego' | 'final';
  nodoId: string;
  indicadores: Indicadores;
  codexDescubierto: string[];
  decisionesTomadas: number;
  retroPendiente: RetroPendiente | null;
}

type Accion =
  | { tipo: 'comenzar'; nodoInicial: string; indicadoresIniciales: Indicadores }
  | { tipo: 'elegir'; opcion: Opcion }
  | { tipo: 'continuar'; siguienteId: string | undefined }
  | { tipo: 'reiniciar'; nodoInicial: string; indicadoresIniciales: Indicadores };

function crearEstadoInicial(nodoInicial: string, indicadores: Indicadores): EstadoJuego {
  return {
    pantalla: 'inicio',
    nodoId: nodoInicial,
    indicadores,
    codexDescubierto: [],
    decisionesTomadas: 0,
    retroPendiente: null,
  };
}

function reducer(estado: EstadoJuego, accion: Accion): EstadoJuego {
  switch (accion.tipo) {
    case 'comenzar':
      return {
        ...crearEstadoInicial(accion.nodoInicial, accion.indicadoresIniciales),
        pantalla: 'juego',
      };
    case 'elegir': {
      const nuevos = aplicarEfectos(estado.indicadores, accion.opcion.efectos);
      const descubiertos = new Set([
        ...estado.codexDescubierto,
        ...(accion.opcion.codex ?? []),
      ]);
      return {
        ...estado,
        indicadores: nuevos,
        codexDescubierto: [...descubiertos],
        decisionesTomadas: estado.decisionesTomadas + 1,
        retroPendiente: {
          opcion: accion.opcion,
          indicadoresPrevios: estado.indicadores,
        },
      };
    }
    case 'continuar': {
      if (!accion.siguienteId) {
        return { ...estado, retroPendiente: null, pantalla: 'final' };
      }
      return { ...estado, retroPendiente: null, nodoId: accion.siguienteId };
    }
    case 'reiniciar':
      return crearEstadoInicial(accion.nodoInicial, accion.indicadoresIniciales);
  }
}

function Juego({ onVolverMenu }: { onVolverMenu: () => void }) {
  const { lang, setLang, ui, content } = useLang();
  const [estado, dispatch] = useReducer(
    reducer,
    crearEstadoInicial(content.nodoInicial, content.indicadoresIniciales),
  );
  const [codexAbierto, setCodexAbierto] = useState(false);

  const reiniciar = () =>
    dispatch({
      tipo: 'reiniciar',
      nodoInicial: content.nodoInicial,
      indicadoresIniciales: content.indicadoresIniciales,
    });

  return (
    <div className="app">
      <header className="cabecera">
        <span className="logo" onClick={onVolverMenu}>
          🕊️ Limitless Peace
        </span>
        <div className="cabecera-acciones">
          <button className="boton-codex" onClick={onVolverMenu} title="Volver al menú">
            ← {lang === 'es' ? 'Menú' : 'Menu'}
          </button>
          <div className="selector-idioma" role="group" aria-label={ui.idiomaLabel}>
            {IDIOMAS.map((idioma) => (
              <button
                key={idioma.codigo}
                className={`opcion-idioma ${lang === idioma.codigo ? 'activo' : ''}`}
                onClick={() => setLang(idioma.codigo)}
                aria-pressed={lang === idioma.codigo}
              >
                {idioma.etiqueta}
              </button>
            ))}
          </div>
          <button className="boton-codex" onClick={() => setCodexAbierto(true)}>
            {ui.codexBtn}
            {estado.codexDescubierto.length > 0 && (
              <span className="contador-codex">{estado.codexDescubierto.length}</span>
            )}
          </button>
        </div>
      </header>

      {estado.pantalla === 'inicio' && (
        <PantallaInicio
          contexto={content.contexto}
          onComenzar={() =>
            dispatch({
              tipo: 'comenzar',
              nodoInicial: content.nodoInicial,
              indicadoresIniciales: content.indicadoresIniciales,
            })
          }
        />
      )}

      {estado.pantalla === 'juego' && (
        <PantallaJuego
          nodo={content.obtenerNodo(estado.nodoId)}
          indicadores={estado.indicadores}
          retroPendiente={estado.retroPendiente}
          onElegir={(opcion) => dispatch({ tipo: 'elegir', opcion })}
          onContinuar={() => {
            const nodo = content.obtenerNodo(estado.nodoId);
            const siguiente =
              typeof nodo.siguiente === 'function'
                ? nodo.siguiente(estado.indicadores)
                : nodo.siguiente;
            dispatch({ tipo: 'continuar', siguienteId: siguiente });
          }}
          onAbrirCodex={() => setCodexAbierto(true)}
        />
      )}

      {estado.pantalla === 'final' && (
        <PantallaFinal
          indicadores={estado.indicadores}
          decisiones={estado.decisionesTomadas}
          codexDescubierto={estado.codexDescubierto.length}
          onReiniciar={reiniciar}
          onAbrirCodex={() => setCodexAbierto(true)}
        />
      )}

      {codexAbierto && (
        <Codex
          descubiertos={estado.codexDescubierto}
          onCerrar={() => setCodexAbierto(false)}
        />
      )}

      <footer className="pie">{ui.footer}</footer>
    </div>
  );
}

function Shell() {
  const { lang, setLang, ui } = useLang();
  const [modo, setModo] = useState<Modo>('menu');

  if (modo === 'mesa') return <Juego onVolverMenu={() => setModo('menu')} />;

  if (modo === 'territorio') {
    return (
      <div className="app">
        <Territorio onVolverMenu={() => setModo('menu')} />
        <footer className="pie">{ui.footer}</footer>
      </div>
    );
  }

  if (modo === 'memoria') {
    return (
      <div className="app">
        <Suspense
          fallback={<div className="tablero3d tablero3d-cargando">🕯️ Encendiendo las llamas…</div>}
        >
          <Historias onVolverMenu={() => setModo('menu')} />
        </Suspense>
        <footer className="pie">{ui.footer}</footer>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="cabecera">
        <span className="logo">🕊️ Limitless Peace</span>
        <div className="selector-idioma" role="group" aria-label={ui.idiomaLabel}>
          {IDIOMAS.map((idioma) => (
            <button
              key={idioma.codigo}
              className={`opcion-idioma ${lang === idioma.codigo ? 'activo' : ''}`}
              onClick={() => setLang(idioma.codigo)}
              aria-pressed={lang === idioma.codigo}
            >
              {idioma.etiqueta}
            </button>
          ))}
        </div>
      </header>
      <MenuPrincipal
        onElegirMesa={() => setModo('mesa')}
        onElegirTerritorio={() => setModo('territorio')}
        onElegirMemoria={() => setModo('memoria')}
      />
      <footer className="pie">{ui.footer}</footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Shell />
    </LanguageProvider>
  );
}

export type { RetroPendiente };
