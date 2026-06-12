import { useMemo, useState } from 'react';
import type { Herramienta } from '../builder/types';
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
import { useLang } from '../i18n/LanguageContext';
import { PanelIndicadores } from './PanelIndicadores';
import { Codex } from './Codex';
import { HistoriaModal } from './HistoriaModal';

interface Props {
  onVolverMenu: () => void;
}

const NIVEL = NIVEL_VALLE;

export function Territorio({ onVolverMenu }: Props) {
  const { content } = useLang();
  const [estado, setEstado] = useState<EstadoTerritorio>(() => crearEstado(NIVEL));
  const [dificultad, setDificultad] = useState<Dificultad>('libre');
  const [codexAbierto, setCodexAbierto] = useState(false);
  const [historiaAbierta, setHistoriaAbierta] = useState<string | null>(null);

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

  if (estado.fase === 'intro') {
    return (
      <main className="pantalla pantalla-inicio">
        <p className="sobretitulo">Modo Territorio · prototipo</p>
        <h1 className="titulo-juego">{NIVEL.nombre}</h1>
        <p className="resumen">{NIVEL.intro}</p>
        <div className="caja-rol">
          <h2>La meta</h2>
          <p>
            Repobla al menos {Math.ceil(NIVEL.metaFamilias * 100)}% de las casas y lleva los cuatro
            indicadores por encima de {NIVEL.metaIndicador}. Cada edificio irradia vitalidad a su
            alrededor; las familias vuelven cuando su casa supera {UMBRAL_RETORNO} de vitalidad.
            Cada mes recibes fondos — y a veces, dilemas.
          </p>
          <h2>Inspiración</h2>
          <p>{NIVEL.inspiracion}</p>
        </div>

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
          <button
            className="boton-principal"
            onClick={() => setEstado({ ...crearEstado(NIVEL, dificultad), fase: 'jugando' })}
          >
            Comenzar la reconstrucción →
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
    <main className="pantalla territorio">
      <div className="territorio-cabecera">
        <button className="boton-volver" onClick={onVolverMenu}>
          ← Menú
        </button>
        <div className="territorio-hud">
          <span className="hud-dato">
            📅 Mes <strong>{estado.mes}</strong>
          </span>
          <span className="hud-dato">
            💰 <strong>{estado.fondos}</strong> <small>(+{ingreso}/mes)</small>
          </span>
          <span className="hud-dato">
            🏠 <strong>{pobladas}/{total}</strong> familias
          </span>
        </div>
        <button className="boton-codex" onClick={() => setCodexAbierto(true)}>
          📖
          {estado.codexDescubierto.length > 0 && (
            <span className="contador-codex">{estado.codexDescubierto.length}</span>
          )}
        </button>
      </div>

      <PanelIndicadores indicadores={estado.indicadores} />

      {alertas.length > 0 && (
        <div className="alertas">
          {alertas.map((a) => (
            <span key={a} className="alerta">
              {a}
            </span>
          ))}
        </div>
      )}

      <div className="territorio-cuerpo">
        <Suspense fallback={<div className="tablero3d tablero3d-cargando">Levantando el valle…</div>}>
          <Tablero3D
            celdas={estado.celdas}
            herramienta={estado.herramienta}
            onCelda={(f, c) => setEstado((e) => actuar(e, NIVEL, f, c))}
            efecto={estado.efectoVisual}
          />
        </Suspense>

        <aside className="diario">
          <p className="paleta-titulo">Diario del valle</p>
          <div className="diario-entradas">
            {[...estado.diario].reverse().map((entrada, i) => (
              <p key={estado.diario.length - i} className="diario-entrada">
                {entrada}
              </p>
            ))}
          </div>
        </aside>

        <aside className="paleta">
          <p className="paleta-titulo">Construir</p>
          {CONSTRUIBLES.map((e) => (
            <button
              key={e.tipo}
              className={`paleta-item ${estado.herramienta === e.tipo ? 'activa' : ''} ${
                estado.fondos < e.costo ? 'sin-fondos' : ''
              }`}
              onClick={() => elegirHerramienta(e.tipo)}
              title={e.descripcion}
            >
              <span className="paleta-emoji">{e.emoji}</span>
              <span className="paleta-nombre">{e.nombre}</span>
              <span className="paleta-costo">{e.costo}</span>
            </button>
          ))}
          <p className="paleta-titulo">Acciones</p>
          {(['limpiar', 'desminar'] as const).map((a) => (
            <button
              key={a}
              className={`paleta-item ${estado.herramienta === a ? 'activa' : ''} ${
                estado.fondos < ACCIONES[a].costo ? 'sin-fondos' : ''
              }`}
              onClick={() => elegirHerramienta(a)}
              title={ACCIONES[a].descripcion}
            >
              <span className="paleta-emoji">{ACCIONES[a].emoji}</span>
              <span className="paleta-nombre">{ACCIONES[a].nombre}</span>
              <span className="paleta-costo">{ACCIONES[a].costo}</span>
            </button>
          ))}
          <button
            className="boton-principal boton-mes"
            onClick={() => setEstado((e) => avanzarMes(e, NIVEL))}
          >
            Avanzar mes ⏵
          </button>
        </aside>
      </div>

      <p className={`territorio-mensaje ${estado.mensaje ? 'visible' : ''}`}>
        {estado.mensaje ??
          (estado.herramienta
            ? 'Haz clic en una celda del valle para aplicar la herramienta.'
            : 'Elige qué construir · arrastra para orbitar la cámara · rueda para acercar')}
      </p>

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
                  {estado.eventoActivo.opciones.map((opcion, i) => (
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

      {codexAbierto && (
        <Codex descubiertos={estado.codexDescubierto} onCerrar={() => setCodexAbierto(false)} />
      )}

      {historiaEco && (
        <HistoriaModal historia={historiaEco} onCerrar={() => setHistoriaAbierta(null)} />
      )}
    </main>
  );
}
