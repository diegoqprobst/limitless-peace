import { useState } from 'react';

/**
 * Reporte de problemas sin fricción para el playtest: nada de cuentas ni
 * formularios externos. Describe → envía por correo (mailto prellenado con
 * contexto técnico) o copia el reporte para pegarlo en WhatsApp/DM.
 */

const CORREO = 'diegoaquinde@gmail.com';

function contextoTecnico(modo: string): string {
  return [
    `Modo: ${modo}`,
    `URL: ${window.location.href}`,
    `Pantalla: ${window.innerWidth}x${window.innerHeight}`,
    `Navegador: ${navigator.userAgent.slice(0, 120)}`,
    `Fecha: ${new Date().toISOString().slice(0, 16)}`,
  ].join('\n');
}

export function BotonReporte({ modo }: { modo: string }) {
  const [abierto, setAbierto] = useState(false);
  const [texto, setTexto] = useState('');
  const [copiado, setCopiado] = useState(false);

  const reporte = `🐞 Reporte — Limitless Peace\n\n${texto || '(sin descripción)'}\n\n— Contexto —\n${contextoTecnico(modo)}`;

  const enviarCorreo = () => {
    const asunto = encodeURIComponent('🐞 Bug en Limitless Peace');
    const cuerpo = encodeURIComponent(reporte);
    window.location.href = `mailto:${CORREO}?subject=${asunto}&body=${cuerpo}`;
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(reporte);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // sin permiso de portapapeles: el correo sigue disponible
    }
  };

  return (
    <>
      <button
        className="boton-reporte"
        onClick={() => setAbierto(true)}
        title="¿Algo falló o se ve raro? Cuéntanos"
      >
        🐞 Reportar
      </button>

      {abierto && (
        <div className="codex-fondo" onClick={() => setAbierto(false)}>
          <div className="codex-panel reporte-panel" onClick={(e) => e.stopPropagation()}>
            <div className="codex-cabecera">
              <h2>🐞 ¿Qué pasó?</h2>
              <button className="boton-cerrar" onClick={() => setAbierto(false)}>
                ✕
              </button>
            </div>
            <p className="codex-intro">
              Cuéntalo con tus palabras — qué hiciste, qué esperabas y qué pasó. Los datos
              técnicos (dispositivo, pantalla) se añaden solos.
            </p>
            <textarea
              className="reporte-texto"
              rows={4}
              placeholder="Ej.: toqué 'Avanzar mes' y no pasó nada / el texto se sale de la pantalla en mi celular…"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              autoFocus
            />
            <div className="acciones-finales reporte-acciones">
              <button className="boton-principal" onClick={enviarCorreo}>
                ✉️ Enviar por correo
              </button>
              <button className="boton-secundario" onClick={copiar}>
                {copiado ? '✓ Copiado' : '📋 Copiar para WhatsApp'}
              </button>
            </div>
            <p className="nota-final">¡Gracias! Cada reporte hace mejor el juego 🕊️</p>
          </div>
        </div>
      )}
    </>
  );
}
