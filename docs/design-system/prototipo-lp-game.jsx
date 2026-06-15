/* ════════════════════════════════════════════════════════════════
   Pantalla de juego: camino de fases, escena de decisión (dos voces),
   tarjetas de opción, retroalimentación y signos vitales.
   ════════════════════════════════════════════════════════════════ */
const { useState: useStateG, useEffect: useEffectG, useRef: useRefG } = React;

/* ── Camino de fases ─────────────────────────────────────────────── */
function CaminoFases({ faseActual }) {
  return (
    <div className="camino">
      {LP.FASES.map((f, i) => (
        <div className="camino-paso" key={f.numero}>
          <div className={`camino-nodo ${f.numero === faseActual ? 'activa' : ''} ${f.numero < faseActual ? 'completada' : ''}`}>
            <span className="camino-punto"></span>
            <span className="camino-label">{f.numero}. {f.nombre}</span>
          </div>
          {i < LP.FASES.length - 1 && (
            <span className={`camino-linea ${f.numero < faseActual ? 'hecha' : ''}`}></span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Signos vitales (indicadores) ────────────────────────────────── */
function SignosVitales({ indicadores, deltas, pulso }) {
  return (
    <div className="vitales">
      {LP.INDICADORES.map((ind) => {
        const v = indicadores[ind.clave];
        const d = deltas ? deltas[ind.clave] : 0;
        return (
          <div className={`vital ${pulso && d !== 0 ? 'pulso' : ''}`} key={ind.clave}>
            <div className="vital-cab">
              <span className="vital-nombre">{ind.nombre}</span>
              <span className="vital-valor">
                {v}
                {d !== 0 && (
                  <span className={`vital-delta show ${d > 0 ? 'pos' : 'neg'}`}>
                    {d > 0 ? `+${d}` : d}
                  </span>
                )}
              </span>
            </div>
            <div className="vital-pista">
              <div className="vital-relleno" style={{ width: `${v}%`, background: ind.color, boxShadow: `0 0 10px ${ind.color}66` }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Escena de decisión ──────────────────────────────────────────── */
function EscenaDecision({ nodo, onElegir }) {
  const fase = LP.FASES.find((f) => f.numero === nodo.fase);
  return (
    <div className="escena" key={nodo.id}>
      <div className="escena-fase eyebrow">Fase {nodo.fase} · {fase.nombre}</div>
      <h2 className="display">{nodo.titulo}</h2>
      <p className="escena-texto">{nodo.texto}</p>

      <div className="voces">
        <div className="voz izq">
          <p className="voz-dice">«{nodo.vozA.dice}»</p>
          <p className="voz-quien">{nodo.vozA.quien}</p>
        </div>
        <div className="voz-vs">vs</div>
        <div className="voz der">
          <p className="voz-dice">«{nodo.vozB.dice}»</p>
          <p className="voz-quien">{nodo.vozB.quien}</p>
        </div>
      </div>

      <div className="opciones">
        {nodo.opciones.map((op, i) => (
          <button className="opcion" key={i} onClick={() => onElegir(op, i)}>
            <span className="opcion-num">{String.fromCharCode(65 + i)}</span>
            <span className="opcion-txt">{op.texto}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Retroalimentación ───────────────────────────────────────────── */
function Retro({ opcion, onContinuar, onAbrirCodex, esUltima }) {
  return (
    <div className="escena retro" key="retro">
      <div className="retro-marca">
        <span className="em"></span>
        <span className="eyebrow">Lo que tu decisión enseña</span>
      </div>
      <p className="retro-decision">
        <span className="tu">Elegiste</span>
        «{opcion.texto}»
      </p>
      <p className="retro-texto">{opcion.retro}</p>

      {opcion.codex && opcion.codex.length > 0 && (
        <div className="codex-nuevo">
          <span className="etq">Nuevo en el Códex</span>
          {opcion.codex.map((id) => {
            const e = LP.CODEX.find((c) => c.id === id);
            return e ? (
              <button className="chip-codex" key={id} onClick={() => onAbrirCodex(id)}>{e.titulo}</button>
            ) : null;
          })}
        </div>
      )}

      <button className="boton-principal" onClick={onContinuar}>
        {esUltima ? 'Ver el desenlace' : 'Continuar'}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

/* ── Pantalla de juego (orquesta escena + retro + vitales) ───────── */
function PantallaJuego({ estado, acciones }) {
  const { indicadores, indiceNodo, retro } = estado;
  const nodo = LP.NODOS[indiceNodo];

  return (
    <div className="escena-wrap">
      {!retro ? (
        <EscenaDecision nodo={nodo} onElegir={acciones.elegir} />
      ) : (
        <Retro
          opcion={retro.opcion}
          esUltima={indiceNodo >= LP.NODOS.length - 1}
          onContinuar={acciones.continuar}
          onAbrirCodex={acciones.abrirCodex}
        />
      )}
    </div>
  );
}

Object.assign(window, { CaminoFases, SignosVitales, EscenaDecision, Retro, PantallaJuego });
