import { useEffect, useRef, useState } from 'react';

/**
 * Música de fondo (compuesta por Diego). El botón solo aparece si existe
 * /audio/tema.m4a. Apagado por defecto — en talleres el silencio es oro —
 * y recuerda la preferencia. Fade suave al encender/apagar.
 */

const RUTA = '/audio/tema.m4a';
const VOLUMEN = 0.35;

export function BotonMusica() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [disponible, setDisponible] = useState(false);
  const [sonando, setSonando] = useState(false);

  useEffect(() => {
    const a = new Audio(RUTA);
    a.loop = true;
    a.volume = 0;
    a.addEventListener('canplaythrough', () => setDisponible(true), { once: true });
    a.addEventListener('error', () => setDisponible(false));
    audio.current = a;
    return () => {
      a.pause();
      audio.current = null;
    };
  }, []);

  const alternar = () => {
    const a = audio.current;
    if (!a) return;
    if (sonando) {
      // fade out
      const bajar = setInterval(() => {
        a.volume = Math.max(0, a.volume - 0.05);
        if (a.volume <= 0) {
          a.pause();
          clearInterval(bajar);
        }
      }, 60);
      setSonando(false);
      localStorage.setItem('lp-musica', '0');
    } else {
      a.play().catch(() => setDisponible(false));
      const subir = setInterval(() => {
        a.volume = Math.min(VOLUMEN, a.volume + 0.05);
        if (a.volume >= VOLUMEN) clearInterval(subir);
      }, 60);
      setSonando(true);
      localStorage.setItem('lp-musica', '1');
    }
  };

  if (!disponible) return null;

  return (
    <button
      className="boton-musica"
      onClick={alternar}
      title={sonando ? 'Silenciar música' : 'Música de fondo (compuesta por Diego)'}
    >
      {sonando ? '🔊' : '🎵'}
    </button>
  );
}
