import { useState } from 'react';
import { EXPEDIENTE_IRLANDA } from '../data/expediente-irlanda';
import { useLang } from '../i18n/LanguageContext';
import { Codex } from './Codex';

/**
 * MODO EXPEDIENTE: recorre un proceso de paz real, decisión por decisión.
 * Flujo: intro → escena (decides) → revelación (qué ocurrió de verdad) → … → cierre.
 */

interface Props {
  onVolverMenu: () => void;
}

const EXP = EXPEDIENTE_IRLANDA;

export function Expediente({ onVolverMenu }: Props) {
  const { content } = useLang();
  const [fase, setFase] = useState<'intro' | 'escena' | 'revelacion' | 'final'>('intro');
  const [idx, setIdx] = useState(0);
  const [eleccion, setEleccion] = useState<number | null>(null);
  const [coincidencias, setCoincidencias] = useState(0);
  const [codexAbierto, setCodexAbierto] = useState(false);
  const [codexDescubierto, setCodexDescubierto] = useState<string[]>([]);

  const escena = EXP.escenas[idx];

  const elegir = (i: number) => {
    setEleccion(i);
    if (i === escena.historica) setCoincidencias((c) => c + 1);
    if (escena.codex) {
      setCodexDescubierto((prev) => [...new Set([...prev, ...escena.codex!])]);
    }
    setFase('revelacion');
  };

  const continuar = () => {
    if (idx + 1 < EXP.escenas.length) {
      setIdx(idx + 1);
      setEleccion(null);
      setFase('escena');
    } else {
      setFase('final');
    }
  };

  return (
    <div className="app">
      <header className="cabecera">
        <span className="logo" onClick={onVolverMenu}>
          🕊️ Limitless Peace
        </span>
        <div className="cabecera-acciones">
          <button className="boton-codex" onClick={onVolverMenu}>
            ← Menú
          </button>
          <button className="boton-codex" onClick={() => setCodexAbierto(true)}>
            📖
            {codexDescubierto.length > 0 && (
              <span className="contador-codex">{codexDescubierto.length}</span>
            )}
          </button>
        </div>
      </header>

      {fase === 'intro' && (
        <main className="pantalla pantalla-inicio">
          <p className="sobretitulo">Expediente · historia real, decisión por decisión</p>
          <h1 className="titulo-juego">{EXP.titulo}</h1>
          <p className="codex-detalle-categoria expediente-lugar">{EXP.lugar}</p>
          <p className="resumen">{EXP.intro}</p>
          <div className="caja-rol">
            <h2>Cómo funciona</h2>
            <p>
              Decides primero, la historia se revela después. <strong>No es un examen</strong>:
              a veces la decisión histórica fue un error — y compararte con ella es donde está
              el aprendizaje.
            </p>
          </div>
          <button className="boton-principal" onClick={() => setFase('escena')}>
            Abrir el expediente →
          </button>
        </main>
      )}

      {fase === 'escena' && (
        <main className="pantalla">
          <div className="expediente-progreso">
            {EXP.escenas.map((e, i) => (
              <span
                key={e.id}
                className={`expediente-punto ${i < idx ? 'pasado' : ''} ${i === idx ? 'actual' : ''}`}
              />
            ))}
          </div>
          <section className="tarjeta nodo">
            <p className="etiqueta-fase">
              📂 {escena.fecha} · decisión {idx + 1} de {EXP.escenas.length}
            </p>
            <h2>{escena.titulo}</h2>
            <p className="nodo-texto">{escena.contexto}</p>
            <p className="expediente-pregunta">{escena.pregunta}</p>
            <div className="opciones">
              {escena.opciones.map((opcion, i) => (
                <button key={i} className="opcion" onClick={() => elegir(i)}>
                  {opcion}
                </button>
              ))}
            </div>
          </section>
        </main>
      )}

      {fase === 'revelacion' && eleccion !== null && (
        <main className="pantalla">
          <section className="tarjeta retro">
            <p className="etiqueta-retro">📂 El expediente se abre · {escena.fecha}</p>
            <p className="retro-decision">
              Tu decisión: <em>{escena.opciones[eleccion]}</em>
            </p>
            <p
              className={`expediente-veredicto ${eleccion === escena.historica ? 'coincide' : 'difiere'}`}
            >
              {eleccion === escena.historica
                ? '✓ Coincidiste con la decisión histórica.'
                : '✕ La historia tomó otro camino.'}
            </p>
            <h3 className="expediente-subtitulo">Lo que ocurrió</h3>
            <p className="retro-texto">{escena.queOcurrio}</p>
            <div className="caja-reflexion">
              <h4>🕊️ La lección</h4>
              <p>{escena.reflexion}</p>
            </div>
            {escena.codex && escena.codex.length > 0 && (
              <div className="codex-desbloqueado">
                <span>📖 Conceptos del Códex:</span>
                {escena.codex.map((id) => {
                  const entrada = content.obtenerEntradaCodex(id);
                  return entrada ? (
                    <button key={id} className="chip-codex" onClick={() => setCodexAbierto(true)}>
                      {entrada.titulo}
                    </button>
                  ) : null;
                })}
              </div>
            )}
            <button className="boton-principal" onClick={continuar}>
              {idx + 1 < EXP.escenas.length ? 'Siguiente decisión →' : 'Cerrar el expediente →'}
            </button>
          </section>
        </main>
      )}

      {fase === 'final' && (
        <main className="pantalla pantalla-final">
          <p className="sobretitulo">Expediente cerrado</p>
          <h1 className="titulo-final paz-fragil">{EXP.titulo}</h1>
          <section className="tarjeta">
            <p className="final-descripcion">{EXP.cierre.texto}</p>
            <p className="estadisticas">
              Coincidiste con la decisión histórica en{' '}
              <strong>
                {coincidencias}/{EXP.escenas.length}
              </strong>{' '}
              — recuerda: la historia también se equivocó (la precondición de 1995).
            </p>
          </section>
          <section className="tarjeta">
            <p className="etiqueta-retro">📚 Para seguir el hilo</p>
            <p className="retro-texto">
              <strong>
                «{EXP.cierre.libro.titulo}», {EXP.cierre.libro.autor}.
              </strong>{' '}
              {EXP.cierre.libro.nota}
            </p>
            <div className="historia-enlaces">
              {EXP.cierre.enlaces.map((e) => (
                <a
                  key={e.url}
                  className="historia-enlace"
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {e.titulo} ↗
                </a>
              ))}
            </div>
          </section>
          <div className="acciones-finales">
            <button
              className="boton-principal"
              onClick={() => {
                setIdx(0);
                setEleccion(null);
                setCoincidencias(0);
                setFase('intro');
              }}
            >
              ↺ Volver a abrirlo
            </button>
            <button className="boton-secundario" onClick={onVolverMenu}>
              ← Volver al menú
            </button>
          </div>
        </main>
      )}

      {codexAbierto && (
        <Codex descubiertos={codexDescubierto} onCerrar={() => setCodexAbierto(false)} />
      )}

      <footer className="pie">
        Hechos verificables · fuentes en docs/fuentes.md · los matices que faltan caben en los
        libros enlazados
      </footer>
    </div>
  );
}
