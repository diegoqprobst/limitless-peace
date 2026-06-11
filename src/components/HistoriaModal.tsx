import { useState } from 'react';
import type { Historia } from '../data/historias';
import { useLang } from '../i18n/LanguageContext';
import { Codex } from './Codex';

/**
 * Modal con una historia real del Jardín de la Memoria.
 * Se usa en el Jardín y también dentro de las partidas (ecos históricos).
 */
export function HistoriaModal({
  historia,
  onCerrar,
}: {
  historia: Historia;
  onCerrar: () => void;
}) {
  const { lang } = useLang();
  const es = lang === 'es';
  const [codexAbierto, setCodexAbierto] = useState(false);

  return (
    <div className="codex-fondo" onClick={onCerrar}>
      <div className="codex-panel historia-panel" onClick={(e) => e.stopPropagation()}>
        <div className="codex-cabecera">
          <div>
            <p className="codex-detalle-categoria">{historia.proceso}</p>
            <h2 className="historia-titulo">{historia.titulo}</h2>
            <p className="historia-nombre">{historia.nombre}</p>
          </div>
          <button className="boton-cerrar" onClick={onCerrar}>
            ✕
          </button>
        </div>
        {historia.parrafos.map((p, i) => (
          <p key={i} className="historia-parrafo">
            {p}
          </p>
        ))}
        {historia.cita && (
          <blockquote className="historia-cita">
            «{historia.cita.texto}»<footer>— {historia.cita.autor}</footer>
          </blockquote>
        )}
        <div className="caja-reflexion">
          <h4>{es ? '🕊️ Lo que enseña' : '🕊️ What it teaches'}</h4>
          <p>{historia.leccion}</p>
        </div>
        <div className="codex-desbloqueado">
          <span>📖 {es ? 'Conceptos relacionados:' : 'Related concepts:'}</span>
          <button className="chip-codex" onClick={() => setCodexAbierto(true)}>
            {es ? 'Abrir el Códex' : 'Open the Codex'}
          </button>
        </div>
      </div>
      {codexAbierto && (
        <Codex descubiertos={historia.codex} onCerrar={() => setCodexAbierto(false)} />
      )}
    </div>
  );
}
