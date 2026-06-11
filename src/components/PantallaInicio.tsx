import { useLang } from '../i18n/LanguageContext';

interface Props {
  contexto: { titulo: string; resumen: string };
  onComenzar: () => void;
}

export function PantallaInicio({ contexto, onComenzar }: Props) {
  const { lang, ui } = useLang();

  return (
    <main className="pantalla pantalla-inicio">
      <p className="sobretitulo">{ui.inicioSobretitulo}</p>
      <h1 className="titulo-juego">{contexto.titulo}</h1>
      <p className="resumen">{contexto.resumen}</p>

      <div className="caja-rol">
        <h2>{ui.inicioRolTitulo}</h2>
        {lang === 'en' ? (
          <p>
            You are a technical advisor to an international{' '}
            <strong>humanitarian mediation</strong> team. You do not command troops or sign
            decrees: you recommend, facilitate, and protect the process. Your tools are the same
            ones used in real processes — and so are your dilemmas.
          </p>
        ) : (
          <p>
            Eres asesor/a técnico de un equipo internacional de{' '}
            <strong>mediación humanitaria</strong>. No mandas tropas ni firmas decretos:
            recomiendas, facilitas y proteges el proceso. Tus herramientas son las mismas de los
            procesos reales — y tus dilemas también.
          </p>
        )}
        <h2>{ui.inicioComoTitulo}</h2>
        {lang === 'en' ? (
          <p>
            At each moment of the process you will choose between options inspired by real
            decisions. Each choice moves four indicators — <strong>Trust</strong>,{' '}
            <strong>Security</strong>, <strong>Justice</strong> and <strong>Legitimacy</strong> —
            and unlocks entries in the <strong>Codex</strong>, the game's encyclopedia of peace
            processes. There are no "trick" options: there are dilemmas, as in reality.
          </p>
        ) : (
          <p>
            En cada momento del proceso elegirás entre opciones inspiradas en decisiones reales.
            Cada elección mueve cuatro indicadores — <strong>Confianza</strong>,{' '}
            <strong>Seguridad</strong>, <strong>Justicia</strong> y{' '}
            <strong>Legitimidad</strong> — y desbloquea entradas del <strong>Códex</strong>, la
            enciclopedia del juego sobre procesos de paz. No hay opciones "trampa": hay dilemas,
            como en la realidad.
          </p>
        )}
      </div>

      <button className="boton-principal" onClick={onComenzar}>
        {ui.inicioComenzar}
      </button>
    </main>
  );
}
