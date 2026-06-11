import type { Final } from '../engine/types';
import { promedio } from '../engine/types';

/**
 * Finales del escenario. Se evalúan en orden: aplica el primero que cumpla.
 * El último es el final por defecto.
 */
export const FINALES: Final[] = [
  {
    id: 'paz-sostenible',
    titulo: 'Una paz que echa raíces',
    descripcion:
      'Diez años después, Miravalle no es un paraíso — ningún país lo es — pero los fusiles ' +
      'callaron y siguen callados. Los excombatientes tienen proyectos de vida, las víctimas ' +
      'conocieron la verdad y el acuerdo sobrevivió a dos cambios de gobierno. Las nuevas ' +
      'generaciones discuten sus conflictos en las urnas y en las calles, no en el monte.',
    leccion:
      'Lograste el equilibrio más difícil: confianza entre enemigos, seguridad verificable, ' +
      'justicia para las víctimas y respaldo social. Ningún proceso real lo consigue todo — ' +
      'pero los que se acercan comparten lo que hiciste: víctimas al centro, mecanismos en vez ' +
      'de buena voluntad, y pedagogía incansable.',
    aplica: (ind) =>
      promedio(ind) >= 65 &&
      ind.confianza >= 50 &&
      ind.seguridad >= 50 &&
      ind.justicia >= 50 &&
      ind.legitimidad >= 50,
  },
  {
    id: 'paz-fragil',
    titulo: 'Una paz frágil pero viva',
    descripcion:
      'El acuerdo se firmó y, a duras penas, se cumple. Hay zonas donde la paz es real y zonas ' +
      'donde sigue siendo una promesa. Cada elección nacional vuelve a poner el proceso en juego. ' +
      'Aún así: las muertes cayeron drásticamente, y miles de niñas y niños crecen sin conocer ' +
      'la guerra que marcó a sus padres.',
    leccion:
      'Bienvenido al resultado más común de los procesos de paz reales: imperfecto, disputado, ' +
      'reversible — y aun así, inmensamente mejor que la guerra. La paz frágil se cuida durante ' +
      'décadas; identifica tus indicadores más bajos para ver qué flancos quedaron abiertos.',
    aplica: (ind) => promedio(ind) >= 50,
  },
  {
    id: 'acuerdo-en-riesgo',
    titulo: 'Un acuerdo en cuidados intensivos',
    descripcion:
      'Se firmó un acuerdo, pero nació débil: sectores enteros lo rechazan, los incumplimientos ' +
      'se acumulan y grupos disidentes ya ocupan los territorios que el FIM dejó. La comunidad ' +
      'internacional intenta sostener con respiración artificial lo que la política nacional ' +
      'deja morir.',
    leccion:
      'Un acuerdo de papel sin confianza, seguridad o legitimidad suficientes entra en la zona ' +
      'de riesgo donde recaen la mitad de los procesos. Revisa tus decisiones: ¿dónde sacrificaste ' +
      'lo importante por lo urgente? Vuelve a jugar y prueba otro camino — en eso este juego es ' +
      'más amable que la historia.',
    aplica: (ind) => promedio(ind) >= 35,
  },
  {
    id: 'recaida',
    titulo: 'La guerra vuelve',
    descripcion:
      'El proceso colapsó. Cada parte culpa a la otra; ambas se preparan para la siguiente ' +
      'ofensiva. Una generación más heredará el conflicto, y los próximos negociadores — dentro ' +
      'de diez o veinte años — tendrán que empezar desde una desconfianza aún más profunda. ' +
      'Las víctimas de la próxima década aún no lo saben.',
    leccion:
      'Así terminan muchos intentos reales: Caguán, Sri Lanka, tantos otros. Las causas casi ' +
      'siempre se parecen: precondiciones imposibles, crisis sin mecanismos para procesarlas, ' +
      'víctimas al margen, saboteadores sin estrategia. La buena noticia: en este juego puedes ' +
      'volver a intentarlo. Los países también, pero pagan cada intento en vidas.',
    aplica: () => true,
  },
];

export function obtenerFinal(ind: Parameters<Final['aplica']>[0]): Final {
  return FINALES.find((f) => f.aplica(ind)) ?? FINALES[FINALES.length - 1];
}
