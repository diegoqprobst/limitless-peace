import type { Indicadores } from '../engine/types';
import { promedio } from '../engine/types';
import { useLang } from '../i18n/LanguageContext';
import { PanelIndicadores } from './PanelIndicadores';

interface Props {
  indicadores: Indicadores;
  decisiones: number;
  codexDescubierto: number;
  onReiniciar: () => void;
  onAbrirCodex: () => void;
}

export function PantallaFinal({
  indicadores,
  decisiones,
  codexDescubierto,
  onReiniciar,
  onAbrirCodex,
}: Props) {
  const { ui, content } = useLang();
  const final = content.obtenerFinal(indicadores);

  return (
    <main className="pantalla pantalla-final">
      <p className="sobretitulo">{ui.finalSobretitulo}</p>
      <h1 className={`titulo-final ${final.id}`}>{final.titulo}</h1>

      <section className="tarjeta">
        <p className="final-descripcion">{final.descripcion}</p>
        <hr />
        <p className="etiqueta-retro">{ui.leccionLabel}</p>
        <p className="retro-texto">{final.leccion}</p>
      </section>

      <section className="tarjeta">
        <p className="etiqueta-retro">{ui.estadoLabel}</p>
        <PanelIndicadores indicadores={indicadores} />
        <p className="estadisticas">
          {ui.indicePaz}: <strong>{Math.round(promedio(indicadores))}/100</strong> ·{' '}
          {ui.decisionesTomadas}: <strong>{decisiones}</strong> · {ui.codexDescubierto}:{' '}
          <strong>
            {codexDescubierto}/{content.codex.length}
          </strong>
        </p>
      </section>

      <div className="acciones-finales">
        <button className="boton-principal" onClick={onReiniciar}>
          {ui.reintentar}
        </button>
        <button className="boton-secundario" onClick={onAbrirCodex}>
          {ui.repasarCodex}
        </button>
      </div>

      <p className="nota-final">{ui.notaFinal}</p>
    </main>
  );
}
