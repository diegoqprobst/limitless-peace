import type { Nodo, Indicadores, Opcion } from '../engine/types';
import type { RetroPendiente } from '../App';
import { useLang } from '../i18n/LanguageContext';
import { PanelIndicadores } from './PanelIndicadores';

interface Props {
  nodo: Nodo;
  indicadores: Indicadores;
  retroPendiente: RetroPendiente | null;
  onElegir: (opcion: Opcion) => void;
  onContinuar: () => void;
  onAbrirCodex: () => void;
}

export function PantallaJuego({
  nodo,
  indicadores,
  retroPendiente,
  onElegir,
  onContinuar,
  onAbrirCodex,
}: Props) {
  const { ui, content } = useLang();
  const fase = content.fases.find((f) => f.numero === nodo.fase);

  return (
    <main className="pantalla pantalla-juego mesa-escenario">
      {/* camino de fases: faros que se encienden con el avance del proceso */}
      <div className="camino">
        {content.fases.map((f, i) => (
          <div className="camino-paso" key={f.numero}>
            <div
              className={`camino-nodo ${f.numero === nodo.fase ? 'activa' : ''} ${
                f.numero < nodo.fase ? 'completada' : ''
              }`}
              title={f.descripcion}
            >
              <span className="camino-punto" />
              <span className="camino-label">{f.numero}</span>
            </div>
            {i < content.fases.length - 1 && (
              <span className={`camino-linea ${f.numero < nodo.fase ? 'hecha' : ''}`} />
            )}
          </div>
        ))}
      </div>

      <PanelIndicadores
        indicadores={indicadores}
        previos={retroPendiente?.indicadoresPrevios}
      />

      {!retroPendiente ? (
        <section className="escena" key={nodo.id}>
          <p className="escena-fase eyebrow">{ui.faseLabel(nodo.fase, fase?.nombre ?? '')}</p>
          <h2 className="display escena-titulo">{nodo.titulo}</h2>
          {nodo.imagen && (
            <figure className="escena-imagen">
              <img src={`/${nodo.imagen}`} alt="" loading="lazy" />
            </figure>
          )}
          <p className="escena-texto">{nodo.texto}</p>
          <div className="opciones">
            {nodo.opciones.map((opcion, i) => (
              <button key={i} className="opcion" onClick={() => onElegir(opcion)}>
                <span className="opcion-num">{String.fromCharCode(65 + i)}</span>
                <span className="opcion-txt">{opcion.texto}</span>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="escena retro" key="retro">
          <div className="retro-marca">
            <span className="retro-em" />
            <span className="eyebrow">{ui.retroLabel}</span>
          </div>
          <p className="retro-decision">
            <span className="retro-tu">{ui.tuDecision}</span>
            <em>«{retroPendiente.opcion.texto}»</em>
          </p>
          <p className="retro-texto">{retroPendiente.opcion.retro}</p>

          {retroPendiente.opcion.codex && retroPendiente.opcion.codex.length > 0 && (
            <div className="codex-desbloqueado">
              <span className="etq">{ui.nuevoCodex}</span>
              {retroPendiente.opcion.codex.map((id) => {
                const entrada = content.obtenerEntradaCodex(id);
                return entrada ? (
                  <button key={id} className="chip-codex" onClick={onAbrirCodex}>
                    {entrada.titulo}
                  </button>
                ) : null;
              })}
            </div>
          )}

          <button className="boton-principal" onClick={onContinuar}>
            {ui.continuar}
          </button>
        </section>
      )}
    </main>
  );
}
