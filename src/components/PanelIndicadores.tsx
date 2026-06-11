import type { Indicadores, ClaveIndicador } from '../engine/types';
import { useLang } from '../i18n/LanguageContext';

interface Props {
  indicadores: Indicadores;
  /** Valores previos para animar/señalar el cambio reciente. */
  previos?: Indicadores;
}

const CLAVES: ClaveIndicador[] = ['confianza', 'seguridad', 'justicia', 'legitimidad'];

export function PanelIndicadores({ indicadores, previos }: Props) {
  const { ui } = useLang();

  return (
    <div className="panel-indicadores">
      {CLAVES.map((clave) => {
        const valor = indicadores[clave];
        const delta = previos ? valor - previos[clave] : 0;
        return (
          <div key={clave} className="indicador">
            <div className="indicador-cabecera">
              <span className="indicador-nombre">{ui.indicadores[clave]}</span>
              <span className="indicador-valor">
                {valor}
                {delta !== 0 && (
                  <span className={delta > 0 ? 'delta positivo' : 'delta negativo'}>
                    {delta > 0 ? ` +${delta}` : ` ${delta}`}
                  </span>
                )}
              </span>
            </div>
            <div className="barra">
              <div
                className={`barra-relleno ${clave} ${valor < 30 ? 'critico' : ''}`}
                style={{ width: `${valor}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
