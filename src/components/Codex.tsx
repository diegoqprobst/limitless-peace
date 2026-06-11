import { useState } from 'react';
import { useLang } from '../i18n/LanguageContext';

interface Props {
  descubiertos: string[];
  onCerrar: () => void;
}

export function Codex({ descubiertos, onCerrar }: Props) {
  const { ui, content } = useLang();
  const [seleccionada, setSeleccionada] = useState<string | null>(null);
  const entrada = content.codex.find((e) => e.id === seleccionada);

  return (
    <div className="codex-fondo" onClick={onCerrar}>
      <div className="codex-panel" onClick={(e) => e.stopPropagation()}>
        <div className="codex-cabecera">
          <h2>{ui.codexTitulo}</h2>
          <button className="boton-cerrar" onClick={onCerrar}>
            ✕
          </button>
        </div>

        {!entrada ? (
          <div className="codex-lista">
            <p className="codex-intro">{ui.codexIntro(content.codex.length)}</p>
            {content.categoriasCodex.map((categoria) => (
              <div key={categoria} className="codex-categoria">
                <h3>{categoria}</h3>
                {content.codex
                  .filter((e) => e.categoria === categoria)
                  .map((e) => (
                    <button
                      key={e.id}
                      className={`codex-item ${descubiertos.includes(e.id) ? 'descubierto' : ''}`}
                      onClick={() => setSeleccionada(e.id)}
                    >
                      {descubiertos.includes(e.id) ? '🕊️ ' : ''}
                      {e.titulo}
                    </button>
                  ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="codex-detalle">
            <button className="boton-volver" onClick={() => setSeleccionada(null)}>
              {ui.codexVolver}
            </button>
            <p className="codex-detalle-categoria">{entrada.categoria}</p>
            <h3>{entrada.titulo}</h3>
            <h4>{ui.codexQueEs}</h4>
            <p>{entrada.definicion}</p>
            <h4>{ui.codexPractica}</h4>
            <p>{entrada.enLaPractica}</p>
            <h4>{ui.codexCaso}</h4>
            <p>{entrada.casoReal}</p>
            <div className="caja-reflexion">
              <h4>{ui.codexDiscutir}</h4>
              <p>{entrada.paraReflexionar}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
