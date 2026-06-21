import { useLang } from '../i18n/LanguageContext';

interface Props {
  contexto: { titulo: string; resumen: string };
  onComenzar: () => void;
  /** Si hay una partida guardada, reanudarla. */
  onContinuar?: () => void;
  /** Nº de decisiones de la partida guardada (para el botón Continuar). */
  decisionesGuardadas?: number;
}

export function PantallaInicio({ contexto, onComenzar, onContinuar, decisionesGuardadas }: Props) {
  const { lang, ui } = useLang();
  const es = lang === 'es';

  return (
    <main className="pantalla pantalla-inicio mesa-escenario">
      <div className="vela-grande" aria-hidden="true" />
      <p className="sobretitulo">{ui.inicioSobretitulo}</p>
      <h1 className="titulo-juego display">{contexto.titulo}</h1>
      <p className="resumen gancho">
        {es
          ? 'Treinta y dos años de guerra. Una mesa secreta. Tú asesoras al equipo mediador — y cada decisión viene de procesos de paz reales.'
          : 'Thirty-two years of war. A secret table. You advise the mediation team — and every decision is drawn from real peace processes.'}
      </p>

      {onContinuar ? (
        <>
          <button className="boton-principal" onClick={onContinuar}>
            {es ? '▶ Continuar' : '▶ Continue'}
            {decisionesGuardadas ? (
              <span className="boton-sub">
                {es
                  ? `decisión ${decisionesGuardadas + 1}`
                  : `decision ${decisionesGuardadas + 1}`}
              </span>
            ) : null}
          </button>
          <button className="boton-secundario boton-nueva" onClick={onComenzar}>
            {es ? 'Empezar de nuevo' : 'Start over'}
          </button>
        </>
      ) : (
        <button className="boton-principal" onClick={onComenzar}>
          {ui.inicioComenzar}
        </button>
      )}

      <details className="como-jugar">
        <summary>{es ? '¿Cómo se juega? · la historia completa' : 'How to play · the full story'}</summary>
        <p>{contexto.resumen}</p>
        {es ? (
          <p>
            <strong>Tu rol:</strong> asesor/a técnico de un equipo internacional de mediación
            humanitaria. No mandas tropas ni firmas decretos: recomiendas, facilitas y proteges
            el proceso.
          </p>
        ) : (
          <p>
            <strong>Your role:</strong> technical advisor to an international humanitarian
            mediation team. You do not command troops or sign decrees: you recommend, facilitate,
            and protect the process.
          </p>
        )}
        {es ? (
          <p>
            <strong>Cómo funciona:</strong> cada elección mueve cuatro indicadores — Confianza,
            Seguridad, Justicia y Legitimidad — y desbloquea entradas del Códex. No hay opciones
            "trampa": hay dilemas, como en la realidad.
          </p>
        ) : (
          <p>
            <strong>How it works:</strong> each choice moves four indicators — Trust, Security,
            Justice and Legitimacy — and unlocks Codex entries. There are no "trick" options:
            there are dilemmas, as in reality.
          </p>
        )}
      </details>
    </main>
  );
}
