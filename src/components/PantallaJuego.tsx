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
    <main className="pantalla pantalla-juego">
      <div className="linea-fases">
        {content.fases.map((f) => (
          <div
            key={f.numero}
            className={`fase ${f.numero === nodo.fase ? 'activa' : ''} ${
              f.numero < nodo.fase ? 'completada' : ''
            }`}
            title={f.descripcion}
          >
            <span className="fase-numero">{f.numero}</span>
            <span className="fase-nombre">{f.nombre}</span>
          </div>
        ))}
      </div>

      <PanelIndicadores
        indicadores={indicadores}
        previos={retroPendiente?.indicadoresPrevios}
      />

      {!retroPendiente ? (
        <section className="tarjeta nodo">
          <p className="etiqueta-fase">{ui.faseLabel(nodo.fase, fase?.nombre ?? '')}</p>
          <h2>{nodo.titulo}</h2>
          <p className="nodo-texto">{nodo.texto}</p>
          <div className="opciones">
            {nodo.opciones.map((opcion, i) => (
              <button key={i} className="opcion" onClick={() => onElegir(opcion)}>
                {opcion.texto}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="tarjeta retro">
          <p className="etiqueta-retro">{ui.retroLabel}</p>
          <p className="retro-decision">
            {ui.tuDecision} <em>{retroPendiente.opcion.texto}</em>
          </p>
          <p className="retro-texto">{retroPendiente.opcion.retro}</p>

          {retroPendiente.opcion.codex && retroPendiente.opcion.codex.length > 0 && (
            <div className="codex-desbloqueado">
              <span>{ui.nuevoCodex}</span>
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
