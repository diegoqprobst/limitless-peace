import { useLang } from '../i18n/LanguageContext';

interface Props {
  onElegirMesa: () => void;
  onElegirTerritorio: () => void;
  onElegirMemoria: () => void;
}

export function MenuPrincipal({ onElegirMesa, onElegirTerritorio, onElegirMemoria }: Props) {
  const { lang } = useLang();
  const es = lang === 'es';

  return (
    <main className="pantalla pantalla-inicio">
      <p className="sobretitulo">
        {es
          ? 'Un juego sobre cómo se construye — y se pierde — la paz'
          : 'A game about how peace is built — and lost'}
      </p>
      <h1 className="titulo-juego">Limitless Peace</h1>
      <p className="resumen menu-resumen">
        {es
          ? 'Dos formas de jugar la paz: negóciala en la mesa, o reconstrúyela en el territorio.'
          : 'Two ways to play peace: negotiate it at the table, or rebuild it in the territory.'}
      </p>

      <div className="menu-modos">
        <button className="tarjeta modo-tarjeta" onClick={onElegirMesa}>
          <span className="modo-emoji">🕊️</span>
          <span className="modo-nombre">{es ? 'La Mesa' : 'The Table'}</span>
          <span className="modo-descripcion">
            {es
              ? 'Acompaña un proceso de paz completo como mediador humanitario: 17 decisiones, de los contactos secretos a la implementación.'
              : 'Accompany a full peace process as a humanitarian mediator: 17 decisions, from secret contacts to implementation.'}
          </span>
          <span className="modo-etiqueta">{es ? 'Narrativo · 25 min' : 'Narrative · 25 min'}</span>
        </button>

        <button className="tarjeta modo-tarjeta" onClick={onElegirTerritorio}>
          <span className="modo-emoji">🌱</span>
          <span className="modo-nombre">{es ? 'El Territorio' : 'The Territory'}</span>
          <span className="modo-descripcion">
            {es
              ? 'Dos años después del acuerdo: reconstruye el tejido social de un valle devastado, edificio a edificio, hasta que no te necesiten.'
              : 'Two years after the agreement: rebuild the social fabric of a devastated valley, building by building, until they no longer need you.'}
          </span>
          <span className="modo-etiqueta">
            {es ? 'Estrategia · prototipo' : 'Strategy · prototype'}
          </span>
        </button>

        <button className="tarjeta modo-tarjeta" onClick={onElegirMemoria}>
          <span className="modo-emoji">🕯️</span>
          <span className="modo-nombre">{es ? 'La Memoria' : 'The Memory'}</span>
          <span className="modo-descripcion">
            {es
              ? 'Un jardín con seis llamas. Cada una guarda la historia real de alguien que construyó la paz — y lo que le costó.'
              : 'A garden with six flames. Each holds the true story of someone who built peace — and what it cost them.'}
          </span>
          <span className="modo-etiqueta">
            {es ? 'Historias reales · 3D' : 'True stories · 3D'}
          </span>
        </button>
      </div>
    </main>
  );
}
