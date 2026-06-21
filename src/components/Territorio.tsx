import { useEffect, useMemo, useRef, useState } from 'react';
import type { Herramienta } from '../builder/types';
import type { PopEfecto } from './Tablero3D';
import { lazy, Suspense } from 'react';
import { CONSTRUIBLES, ACCIONES, UMBRAL_RETORNO } from '../builder/catalogo';
import { DIFICULTADES, type Dificultad } from '../builder/dificultad';

/** El tablero 3D (Three.js, ~300 KB gzip) se descarga solo al entrar a este modo. */
const Tablero3D = lazy(() =>
  import('./Tablero3D').then((m) => ({ default: m.Tablero3D })),
);
import { NIVEL_VALLE } from '../builder/nivel-valle';
import {
  actuar,
  avanzarMes,
  cerrarEvento,
  contarFamilias,
  contarMinas,
  crearEstado,
  ingresoMensual,
  resolverEvento,
  type EstadoTerritorio,
} from '../builder/engine';
import { HISTORIAS } from '../data/historias';
import { cargarProgreso, guardarProgreso } from '../persistencia';
import { useLang } from '../i18n/LanguageContext';
import { PanelIndicadores } from './PanelIndicadores';
import { Codex } from './Codex';
import { HistoriaModal } from './HistoriaModal';

interface Props {
  onVolverMenu: () => void;
}

const NIVEL = NIVEL_VALLE;

/**
 * Indicadores como "stat pods" de videojuego: icono + valor + barra.
 * 'salud' es concreta y vive en estado.salud (no en estado.indicadores).
 */
const INDICADORES_HUD = [
  { k: 'salud', emoji: '🩺', nombre: 'Salud' },
  { k: 'confianza', emoji: '🤝', nombre: 'Confianza' },
  { k: 'seguridad', emoji: '🛡️', nombre: 'Seguridad' },
  { k: 'justicia', emoji: '⚖️', nombre: 'Justicia' },
  { k: 'legitimidad', emoji: '🏛️', nombre: 'Legitimidad' },
] as const;

/** Chips "+N Indicador" + ingreso, para el tooltip de cada edificio. */
function efectosDeTip(tipo: Herramienta | null) {
  if (!tipo || tipo === 'limpiar' || tipo === 'desminar') return null;
  const def = CONSTRUIBLES.find((e) => e.tipo === tipo);
  if (!def) return null;
  const nombres: Record<string, string> = {
    confianza: 'Confianza',
    seguridad: 'Seguridad',
    justicia: 'Justicia',
    legitimidad: 'Legitimidad',
    salud: 'Salud',
  };
  const chips = Object.entries(def.efectos).map(([k, v]) => (
    <span key={k} className={`tip-efecto ${k}`}>
      +{v} {nombres[k]}
    </span>
  ));
  // Aporte mensual recurrente (el "sostén"): se muestra como "+N/mes".
  if (def.mensual) {
    for (const [k, v] of Object.entries(def.mensual)) {
      if (v) chips.push(
        <span key={`m-${k}`} className={`tip-efecto ${k}`}>
          +{v} {nombres[k]}/mes
        </span>,
      );
    }
  }
  if (def.ingresoMensual) {
    chips.push(
      <span key="ing" className="tip-efecto ingreso">
        +{def.ingresoMensual} fondos/mes
      </span>,
    );
  }
  return chips;
}

/** Hash estable de un id de evento (para variar el barajado entre eventos). */
function hashId(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0;
  return h & 0x7fffffff;
}

/**
 * Baraja determinista (Fisher-Yates con LCG sembrado): el orden depende de la
 * semilla de la partida, el mes y el evento — así la primera opción NO es
 * siempre la "ganadora", pero el orden es estable dentro de un mismo evento.
 * Solo afecta la PRESENTACIÓN: el motor recibe el objeto opción, no su índice.
 */
function barajarSemilla<T>(arr: T[], semilla: number): T[] {
  const out = arr.slice();
  let s = (semilla & 0x7fffffff) || 1;
  const next = () => (s = (Math.imul(s, 1103515245) + 12345) & 0x7fffffff);
  for (let i = out.length - 1; i > 0; i--) {
    const j = next() % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function Territorio({ onVolverMenu }: Props) {
  const { content } = useLang();
  const [estado, setEstado] = useState<EstadoTerritorio>(() => crearEstado(NIVEL));
  // Partida guardada capturada al entrar (para ofrecer "Continuar" en la intro).
  const guardado = useRef(cargarProgreso<EstadoTerritorio>('territorio'));
  const hayGuardado = guardado.current != null && guardado.current.fase !== 'intro';
  const [dificultad, setDificultad] = useState<Dificultad>('libre');
  const [codexAbierto, setCodexAbierto] = useState(false);
  const [historiaAbierta, setHistoriaAbierta] = useState<string | null>(null);
  const [menuCelda, setMenuCelda] = useState<{ f: number; c: number } | null>(null);
  const [seleccionMenu, setSeleccionMenu] = useState<Herramienta | null>(null);
  const [tip, setTip] = useState<Herramienta | null>(null);

  // Auto-guardado del progreso: persistir el valle en cada cambio (menos en la intro).
  useEffect(() => {
    if (estado.fase !== 'intro') guardarProgreso('territorio', estado);
  }, [estado]);

  const { pobladas, total } = useMemo(() => contarFamilias(estado.celdas), [estado.celdas]);
  const ingreso = useMemo(() => ingresoMensual(NIVEL, estado.celdas, estado.dificultad), [estado.celdas, estado.dificultad]);
  const minas = useMemo(() => contarMinas(estado.celdas), [estado.celdas]);

  const alertas: string[] = [];
  if (estado.fase === 'jugando') {
    if (estado.indicadores.seguridad < 40)
      alertas.push('⚠️ Seguridad baja: el valle está expuesto a incursiones');
    if (minas > 0 && estado.mes >= 4) alertas.push('⚠️ El campo minado sigue activo');
    if (ingreso <= 0) alertas.push('⚠️ El mantenimiento supera los ingresos');
  }

  const historiaEco = HISTORIAS.find((h) => h.id === historiaAbierta);

  const elegirHerramienta = (h: Herramienta) =>
    setEstado((e) => ({ ...e, herramienta: e.herramienta === h ? null : h, mensaje: null }));

  // ── Pop "+N Indicador" flotante al construir (feedback inmediato) ──
  const [pop, setPop] = useState<PopEfecto | null>(null);
  const popClave = useRef(0);
  const mostrarPopSiConstruyo = (
    herr: Herramienta,
    f: number,
    c: number,
    prev: EstadoTerritorio,
    siguiente: EstadoTerritorio,
  ) => {
    if (herr === 'limpiar' || herr === 'desminar') return;
    const antes = prev.celdas[f][c].edificio;
    const ahora = siguiente.celdas[f][c].edificio;
    if (ahora && ahora !== antes) {
      const def = CONSTRUIBLES.find((d) => d.tipo === herr);
      if (def && Object.keys(def.efectos).length) {
        setPop({ f, c, efectos: def.efectos, clave: ++popClave.current });
      }
    }
  };

  // ── Tocar una celda: si hay herramienta, construye; si no, abre el menú ──
  const tocarCelda = (f: number, c: number) => {
    if (estado.herramienta) {
      const herr = estado.herramienta;
      const siguiente = actuar(estado, NIVEL, f, c);
      setEstado(siguiente);
      mostrarPopSiConstruyo(herr, f, c, estado, siguiente);
      return;
    }
    const celda = estado.celdas[f][c];
    if (celda.tipo === 'tierra' && !celda.edificio) {
      setSeleccionMenu(null);
      setMenuCelda({ f, c });
    } else if (celda.tipo === 'escombros') {
      setSeleccionMenu('limpiar');
      setMenuCelda({ f, c });
    } else if (celda.tipo === 'minado') {
      setSeleccionMenu('desminar');
      setMenuCelda({ f, c });
    } else {
      setEstado((e) => ({
        ...e,
        mensaje:
          celda.edificio
            ? 'Aquí ya hay un edificio.'
            : celda.tipo === 'casa'
              ? 'Las casas son de las familias: construye al lado.'
              : 'Ahí no se puede construir.',
      }));
    }
  };

  const cerrarMenu = () => {
    setMenuCelda(null);
    setSeleccionMenu(null);
  };

  const confirmarMenu = () => {
    if (!menuCelda || !seleccionMenu) return;
    const { f, c } = menuCelda;
    const herr = seleccionMenu;
    const siguiente = { ...actuar({ ...estado, herramienta: herr }, NIVEL, f, c), herramienta: null };
    setEstado(siguiente);
    mostrarPopSiConstruyo(herr, f, c, estado, siguiente);
    cerrarMenu();
  };

  const celdaMenu = menuCelda ? estado.celdas[menuCelda.f][menuCelda.c] : null;
  const defMenu =
    seleccionMenu === 'limpiar' || seleccionMenu === 'desminar'
      ? ACCIONES[seleccionMenu]
      : CONSTRUIBLES.find((e) => e.tipo === seleccionMenu);
  const costoMenu = defMenu?.costo ?? 0;
  const puedePagarMenu = !!seleccionMenu && estado.fondos >= costoMenu;

  // Tooltip: qué cambia el edificio/acción bajo el cursor.
  const tipDef =
    tip === 'limpiar' || tip === 'desminar'
      ? ACCIONES[tip]
      : CONSTRUIBLES.find((e) => e.tipo === tip);

  // ── Claridad: meta visible, herramienta activa, tutorial de primera vez ──
  const metaFam = Math.ceil(total * NIVEL.metaFamilias);
  const ind = estado.indicadores;
  const minIndicador = Math.min(ind.confianza, ind.seguridad, ind.justicia, ind.legitimidad);
  const herramientaActiva =
    estado.herramienta === 'limpiar' || estado.herramienta === 'desminar'
      ? ACCIONES[estado.herramienta]
      : CONSTRUIBLES.find((e) => e.tipo === estado.herramienta);

  const construidos = useMemo(
    () => estado.celdas.flat().filter((c) => c.edificio && c.edificio !== 'base').length,
    [estado.celdas],
  );
  const [tutorialVisto, setTutorialVisto] = useState(
    () => localStorage.getItem('lp-tutorial-territorio') === '1',
  );
  const saltarTutorial = () => {
    localStorage.setItem('lp-tutorial-territorio', '1');
    setTutorialVisto(true);
  };
  let pasoTutorial: string | null = null;
  if (!tutorialVisto && estado.fase === 'jugando') {
    if (construidos === 0 && !estado.herramienta) {
      pasoTutorial =
        'Paso 1 de 3 — Elige qué construir en la barra de abajo. Buen comienzo: ⚽ Cancha o 🏥 Salud (pasa el cursor por cada una para ver qué cambia).';
    } else if (construidos === 0) {
      pasoTutorial =
        'Paso 2 de 3 — Toca una celda de tierra CERCA de las casas 🏚️: cada edificio irradia vitalidad a su alrededor (verás el área al pasar el cursor).';
    } else if (estado.mes === 1) {
      pasoTutorial =
        'Paso 3 de 3 — ¿Ves el verde crecer? Cuando una casa junta 50 de vitalidad, su familia vuelve 🏠. Pulsa "Avanzar mes" para recibir fondos — y atento a los dilemas.';
    }
  }
  useEffect(() => {
    if (!tutorialVisto && estado.mes > 1 && construidos > 0) saltarTutorial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado.mes, construidos]);

  // El pop flotante se desvanece solo tras unos segundos.
  useEffect(() => {
    if (!pop) return;
    const id = setTimeout(() => setPop(null), 1700);
    return () => clearTimeout(id);
  }, [pop]);

  // Salud del proceso 0–1: el valle se entibia a medida que sana (incluye el bienestar).
  const progreso =
    (ind.confianza + ind.seguridad + ind.justicia + ind.legitimidad + estado.salud) / 500;

  // Opciones del evento en orden barajado (que la primera no sea siempre la buena).
  const opcionesEvento = useMemo(
    () =>
      estado.eventoActivo
        ? barajarSemilla(
            estado.eventoActivo.opciones,
            estado.semilla + estado.mes + hashId(estado.eventoActivo.id),
          )
        : [],
    [estado.eventoActivo, estado.semilla, estado.mes],
  );

  if (estado.fase === 'intro') {
    return (
      <main className="pantalla pantalla-inicio">
        <p className="sobretitulo">Modo Territorio</p>
        <h1 className="titulo-juego">{NIVEL.nombre}</h1>
        <p className="resumen gancho">
          La guerra vació este valle. Reconstrúyelo edificio a edificio hasta que las familias
          vuelvan — y tu equipo humanitario pueda irse.
        </p>

        <details className="como-jugar">
          <summary>¿Cómo se juega? · la historia completa</summary>
          <p>{NIVEL.intro}</p>
          <p>
            <strong>La meta:</strong> repobla al menos {Math.ceil(NIVEL.metaFamilias * 100)}% de
            las casas y lleva los cuatro indicadores por encima de {NIVEL.metaIndicador}. Cada
            edificio irradia vitalidad a su alrededor; una familia vuelve cuando su casa reúne{' '}
            {UMBRAL_RETORNO} de vitalidad — la primera, apenas ve una luz. Cada mes recibes
            fondos… y a veces, dilemas.
          </p>
          <p>
            <strong>Inspiración:</strong> {NIVEL.inspiracion}
          </p>
        </details>

        <div className="selector-dificultad">
          {(Object.keys(DIFICULTADES) as Dificultad[]).map((d) => (
            <button
              key={d}
              className={`tarjeta dificultad-tarjeta ${dificultad === d ? 'activa' : ''}`}
              onClick={() => setDificultad(d)}
            >
              <span className="dificultad-nombre">
                {DIFICULTADES[d].emoji} {DIFICULTADES[d].nombre}
              </span>
              <span className="dificultad-descripcion">{DIFICULTADES[d].descripcion}</span>
            </button>
          ))}
        </div>

        <div className="acciones-finales">
          {hayGuardado && (
            <button className="boton-principal" onClick={() => setEstado(guardado.current!)}>
              ▶ Continuar tu valle
              <span className="boton-sub">Mes {guardado.current!.mes}</span>
            </button>
          )}
          <button
            className={hayGuardado ? 'boton-secundario boton-nueva' : 'boton-principal'}
            onClick={() =>
              // Semilla variable: cada partida recibe una mezcla distinta de eventos aleatorios.
              setEstado({ ...crearEstado(NIVEL, dificultad, Date.now()), fase: 'jugando' })
            }
          >
            {hayGuardado ? 'Empezar de nuevo' : 'Comenzar la reconstrucción →'}
          </button>
          <button className="boton-secundario" onClick={onVolverMenu}>
            ← Volver al menú
          </button>
        </div>
      </main>
    );
  }

  if (estado.fase === 'fracaso') {
    return (
      <main className="pantalla pantalla-final">
        <p className="sobretitulo">Mes {estado.mes} · el proceso colapsó</p>
        <h1 className="titulo-final recaida">El valle vuelve a romperse</h1>
        <section className="tarjeta">
          <p className="final-descripcion">
            Las familias que habían vuelto empacan de nuevo. Nadie lo dice en voz alta, pero todos
            lo piensan: la paz pasó por aquí y no se quedó. Tu equipo permanece — los humanitarios
            no abandonan — pero la reconstrucción tendrá que esperar a que el valle vuelva a creer.
          </p>
          <hr />
          <p className="etiqueta-retro">Lección del colapso</p>
          <p className="retro-texto">
            Así fracasan las reconstrucciones reales: no de golpe, sino por acumulación — seguridad
            descuidada, minas que esperan, gastos sin ingresos, confianza que se gotea. Mira tu
            indicador más bajo: ahí estuvo la grieta. La buena noticia: en este juego puedes volver
            a intentarlo. Los territorios reales también — pero pagan cada intento en años.
          </p>
          <PanelIndicadores indicadores={estado.indicadores} />
        </section>
        <div className="acciones-finales">
          <button className="boton-principal" onClick={() => setEstado(crearEstado(NIVEL, dificultad))}>
            ↺ Intentarlo de nuevo
          </button>
          <button className="boton-secundario" onClick={onVolverMenu}>
            ← Volver al menú
          </button>
        </div>
      </main>
    );
  }

  if (estado.fase === 'victoria') {
    return (
      <main className="pantalla pantalla-final">
        <p className="sobretitulo">Mes {estado.mes} · misión cumplida</p>
        <h1 className="titulo-final paz-sostenible">El valle respira</h1>
        <section className="tarjeta">
          <p className="final-descripcion">
            Las {pobladas} familias volvieron. El mercado suena, la escuela está llena y el memorial
            tiene flores frescas. Esta mañana, tu equipo desmontó el campamento y devolvió las
            llaves: <strong>la señal del éxito humanitario es poder irse</strong>. El valle ya no
            los necesita — y esa es la victoria más grande que existe en este trabajo.
          </p>
          <hr />
          <p className="etiqueta-retro">Estado final</p>
          <PanelIndicadores indicadores={estado.indicadores} />
          <p className="estadisticas">
            Familias retornadas: <strong>{pobladas}/{total}</strong> · Meses:{' '}
            <strong>{estado.mes}</strong> · Fondos restantes: <strong>{estado.fondos}</strong>
          </p>
        </section>
        <div className="acciones-finales">
          <button className="boton-principal" onClick={() => setEstado(crearEstado(NIVEL, dificultad))}>
            ↺ Jugar de nuevo
          </button>
          <button className="boton-secundario" onClick={onVolverMenu}>
            ← Volver al menú
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="cockpit">
      {/* barra superior compacta */}
      <div className="cockpit-top">
        <button className="cockpit-volver" onClick={onVolverMenu} title="Volver al menú">
          ←
        </button>
        <div className="cockpit-recursos">
          <span className="recurso" title="Mes actual">
            <span className="recurso-ico">📅</span>
            <strong>{estado.mes}</strong>
          </span>
          <span className="recurso" title={`Fondos · ${ingreso >= 0 ? '+' : ''}${ingreso} por mes`}>
            <span className="recurso-ico">💰</span>
            <strong>{estado.fondos}</strong>
            <small className={ingreso < 0 ? 'ingreso-neg' : ''}>
              {ingreso >= 0 ? '+' : ''}
              {ingreso}
            </small>
          </span>
          <span
            className="recurso recurso-meta"
            title={`Meta: ${metaFam} familias de vuelta y los 4 indicadores en ${NIVEL.metaIndicador}+`}
          >
            <span className="recurso-ico">🎯</span>
            <strong className={pobladas >= metaFam ? 'meta-ok' : ''}>
              {pobladas}/{metaFam}🏠
            </strong>
            <strong className={minIndicador >= NIVEL.metaIndicador ? 'meta-ok' : ''}>
              {minIndicador}/{NIVEL.metaIndicador}
            </strong>
          </span>
        </div>
        <button className="cockpit-codex" onClick={() => setCodexAbierto(true)} title="Códex">
          📖
          {estado.codexDescubierto.length > 0 && (
            <span className="contador-codex">{estado.codexDescubierto.length}</span>
          )}
        </button>
      </div>

      {/* indicadores gamificados (stat pods) */}
      <div className="cockpit-stats">
        {INDICADORES_HUD.map(({ k, emoji, nombre }) => {
          const v = k === 'salud' ? estado.salud : estado.indicadores[k];
          return (
            <div key={k} className={`stat-pod ${k} ${v < 30 ? 'critico' : ''}`} title={nombre}>
              <span className="stat-emoji">{emoji}</span>
              <div className="stat-info">
                <span className="stat-nombre">{nombre}</span>
                <span className="stat-valor">{v}</span>
              </div>
              <div className="stat-barra">
                <div className="stat-relleno" style={{ width: `${v}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* zona central: el mapa (protagonista) + el diario */}
      <div className="cockpit-medio">
        <div className="cockpit-mapa">
          <Suspense
            fallback={<div className="tablero3d tablero3d-cargando">Levantando el valle…</div>}
          >
            <Tablero3D
              celdas={estado.celdas}
              herramienta={estado.herramienta}
              onCelda={tocarCelda}
              efecto={estado.efectoVisual}
              progreso={progreso}
              pop={pop}
            />
          </Suspense>

          <div className="overlay-top">
            {pasoTutorial && (
              <div className="overlay-tutorial">
                <span>💡 {pasoTutorial}</span>
                <button className="tutorial-saltar" onClick={saltarTutorial}>
                  Saltar
                </button>
              </div>
            )}
            {alertas.length > 0 && (
              <div className="overlay-alertas">
                {alertas.map((a) => (
                  <span key={a} className="alerta">
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>

          <p className={`overlay-hint ${estado.mensaje ? 'visible' : ''}`}>
            {estado.mensaje ??
              (herramientaActiva
                ? `${herramientaActiva.emoji} ${herramientaActiva.nombre} — toca una celda`
                : '👆 Toca una celda para construir · 🖐 arrastra para girar · pellizca o rueda para acercar')}
          </p>
        </div>

        <aside className="cockpit-diario">
          <p className="diario-titulo">📜 Diario del valle</p>
          <div className="diario-entradas">
            {[...estado.diario].reverse().map((entrada, i) => (
              <p key={estado.diario.length - i} className="diario-entrada">
                {entrada}
              </p>
            ))}
          </div>
        </aside>
      </div>

      {/* tooltip: qué cambia el edificio/acción bajo el cursor */}
      {tipDef && (
        <div className="tooltip-edificio">
          <div className="tip-cab">
            <span className="tip-emoji">{tipDef.emoji}</span>
            <strong>{tipDef.nombre}</strong>
            <span className="tip-costo">💰 {tipDef.costo}</span>
          </div>
          <div className="tip-efectos">{efectosDeTip(tip)}</div>
          <p className="tip-porque">{tipDef.porque}</p>
        </div>
      )}

      {/* footer de construcción: chips (scroll) + avanzar mes */}
      <div className="cockpit-footer">
        <div className="cockpit-chips">
          {CONSTRUIBLES.map((e) => (
            <button
              key={e.tipo}
              className={`chip-construir ${estado.herramienta === e.tipo ? 'activa' : ''} ${
                estado.fondos < e.costo ? 'sin-fondos' : ''
              }`}
              onClick={() => elegirHerramienta(e.tipo)}
              onMouseEnter={() => setTip(e.tipo)}
              onMouseLeave={() => setTip((t) => (t === e.tipo ? null : t))}
            >
              <span>{e.emoji}</span>
              <span className="chip-nombre">{e.corto}</span>
              <span className="paleta-costo">{e.costo}</span>
            </button>
          ))}
          <span className="barra-sep" />
          {(['limpiar', 'desminar'] as const).map((a) => (
            <button
              key={a}
              className={`chip-construir ${estado.herramienta === a ? 'activa' : ''} ${
                estado.fondos < ACCIONES[a].costo ? 'sin-fondos' : ''
              }`}
              onClick={() => elegirHerramienta(a)}
              onMouseEnter={() => setTip(a)}
              onMouseLeave={() => setTip((t) => (t === a ? null : t))}
            >
              <span>{ACCIONES[a].emoji}</span>
              <span className="chip-nombre">{ACCIONES[a].corto}</span>
              <span className="paleta-costo">{ACCIONES[a].costo}</span>
            </button>
          ))}
        </div>
        <button
          className="boton-mes-cockpit"
          onClick={() => setEstado((e) => avanzarMes(e, NIVEL))}
        >
          Avanzar<br />
          mes ⏵
        </button>
      </div>

      {estado.eventoActivo && (
        <div className="codex-fondo">
          <div className="codex-panel">
            {!estado.retroEvento ? (
              <>
                <p className="etiqueta-fase">
                  Mes {estado.mes} · dilema
                </p>
                <h2 className="evento-titulo">{estado.eventoActivo.titulo}</h2>
                <p className="nodo-texto">{estado.eventoActivo.texto}</p>
                <div className="opciones">
                  {opcionesEvento.map((opcion, i) => (
                    <button
                      key={i}
                      className="opcion"
                      onClick={() => setEstado((e) => resolverEvento(e, opcion))}
                    >
                      {opcion.texto}
                      {opcion.fondos ? ` (${opcion.fondos} fondos)` : ''}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="etiqueta-retro">Lo que dice la experiencia real</p>
                <p className="retro-decision">
                  Tu decisión: <em>{estado.retroEvento.texto}</em>
                </p>
                <p className="retro-texto">{estado.retroEvento.retro}</p>
                {estado.mensaje && <p className="mensaje-consecuencia">💥 {estado.mensaje}</p>}
                {estado.retroEvento.codex && estado.retroEvento.codex.length > 0 && (
                  <div className="codex-desbloqueado">
                    <span>📖 Nuevo en el Códex:</span>
                    {estado.retroEvento.codex.map((id) => {
                      const entrada = content.obtenerEntradaCodex(id);
                      return entrada ? (
                        <button
                          key={id}
                          className="chip-codex"
                          onClick={() => setCodexAbierto(true)}
                        >
                          {entrada.titulo}
                        </button>
                      ) : null;
                    })}
                  </div>
                )}
                {estado.eventoActivo.eco && (
                  <div className="eco-historico">
                    <p className="eco-etiqueta">🕯️ Eco histórico</p>
                    <p className="eco-texto">{estado.eventoActivo.eco.texto}</p>
                    <button
                      className="chip-codex"
                      onClick={() => setHistoriaAbierta(estado.eventoActivo!.eco!.historiaId)}
                    >
                      Leer la historia completa →
                    </button>
                  </div>
                )}
                <button
                  className="boton-principal"
                  onClick={() => setEstado((e) => cerrarEvento(e, NIVEL))}
                >
                  Continuar →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {menuCelda && celdaMenu && (
        <div className="codex-fondo" onClick={cerrarMenu}>
          <div className="codex-panel menu-celda" onClick={(e) => e.stopPropagation()}>
            <div className="codex-cabecera">
              <h2>
                {celdaMenu.tipo === 'tierra'
                  ? '¿Qué construir aquí?'
                  : celdaMenu.tipo === 'escombros'
                    ? 'Esta celda tiene escombros'
                    : 'Aquí hay un campo minado'}
              </h2>
              <button className="boton-cerrar" onClick={cerrarMenu}>
                ✕
              </button>
            </div>

            {celdaMenu.tipo === 'tierra' ? (
              <div className="menu-grid">
                {CONSTRUIBLES.map((e) => {
                  const sinFondos = estado.fondos < e.costo;
                  return (
                    <button
                      key={e.tipo}
                      className={`chip-construir ${seleccionMenu === e.tipo ? 'activa' : ''} ${sinFondos ? 'sin-fondos' : ''}`}
                      onClick={() => setSeleccionMenu(e.tipo)}
                    >
                      <span>{e.emoji}</span>
                      <span className="chip-nombre">{e.corto}</span>
                      <span className="paleta-costo">{e.costo}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="codex-intro">
                {celdaMenu.tipo === 'escombros'
                  ? 'Despeja los escombros para poder construir en esta celda.'
                  : 'Las minas siguen matando años después de la guerra. Desminar es lento y costoso — pero la seguridad va primero.'}
              </p>
            )}

            {defMenu && <p className="menu-desc">💡 {defMenu.porque}</p>}

            <div className="acciones-finales menu-acciones">
              <button
                className="boton-principal"
                disabled={!puedePagarMenu}
                onClick={confirmarMenu}
              >
                {seleccionMenu
                  ? `✓ ${defMenu?.corto ?? 'Construir'} (${costoMenu}) ${puedePagarMenu ? '' : '— sin fondos'}`
                  : 'Elige una opción'}
              </button>
              <button className="boton-secundario" onClick={cerrarMenu}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {codexAbierto && (
        <Codex descubiertos={estado.codexDescubierto} onCerrar={() => setCodexAbierto(false)} />
      )}

      {historiaEco && (
        <HistoriaModal historia={historiaEco} onCerrar={() => setHistoriaAbierta(null)} />
      )}
    </div>
  );
}
