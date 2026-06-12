import type { NivelTerritorio } from './types';

/**
 * NIVEL PROTOTIPO — "El Valle de las Nieblas"
 *
 * Región rural de Miravalle, dos años después de la firma del acuerdo.
 * Ficción inspirada en el posconflicto colombiano: retorno de población
 * desplazada, desminado humanitario, reincorporación, programas de
 * desarrollo territorial. El códex documenta los casos reales.
 */
export const NIVEL_VALLE: NivelTerritorio = {
  id: 'valle-nieblas',
  nombre: 'El Valle de las Nieblas',
  lugar: 'Región rural de Miravalle · 2 años después del acuerdo',
  intro:
    'La guerra pasó por este valle y se llevó casi todo: seis familias viven desplazadas en la ' +
    'capital, esperando volver. Quedan escombros, un campo minado y un silencio que pesa. Tu equipo ' +
    'humanitario acompaña la reconstrucción: con fondos limitados, decide qué levantar y en qué ' +
    'orden. Cuando el tejido social respire de nuevo — y solo entonces — tu equipo podrá retirarse. ' +
    'Esa es la meta: que no te necesiten.',
  inspiracion:
    'Ficción inspirada en el posconflicto colombiano: los Programas de Desarrollo con Enfoque ' +
    'Territorial (PDET), el desminado humanitario y el retorno de comunidades desplazadas. ' +
    'Consulta el Códex para los casos reales.',
  mapa: [
    // T tierra · E escombros · C casa destruida · M minado · R río
    'TTEETTTRTT',
    'TCEECTTRTC',
    'TTTTEETRTT',
    'EECTTTTTTT', // ← el vado: único cruce del río
    'TTTTETTRCT',
    'TMMTTTTRTT',
    'TMCTTETRTT',
  ],
  posicionBase: [3, 5],
  fondosIniciales: 120,
  ingresoBase: 20,
  mantenimientoPorEdificio: 2,
  indicadoresIniciales: {
    confianza: 30,
    seguridad: 25,
    justicia: 20,
    legitimidad: 35,
  },
  metaFamilias: 0.8,
  metaIndicador: 55,
  eventos: [
    {
      id: 'retorno-excombatientes',
      mes: 2,
      titulo: 'Los que dejaron las armas',
      texto:
        'Doce excombatientes en proceso de reincorporación piden instalarse en el valle: quieren ' +
        'trabajar la tierra. Algunas familias retornadas se inquietan: "¿vamos a vivir al lado de ' +
        'los que nos dispararon?"',
      opciones: [
        {
          texto: 'Acogerlos con un proyecto productivo conjunto entre excombatientes y campesinos.',
          efectos: { confianza: 8, seguridad: 4 },
          fondos: -15,
          retro:
            'La reintegración comunitaria —no aislada— es la que funciona: cuando excombatientes y ' +
            'víctimas trabajan la misma tierra, el "otro" recupera nombre y rostro. En Colombia, las ' +
            'cooperativas de reincorporados (café, cerveza, turismo) son de los logros más sólidos ' +
            'del acuerdo. Costó fondos, pero compró lo más caro: convivencia.',
          codex: ['ddr'],
        },
        {
          texto: 'Pedirles esperar: que se instalen cuando el valle esté reconstruido.',
          efectos: { confianza: -8, seguridad: -3 },
          retro:
            'Un reincorporado sin tierra ni proyecto es exactamente lo que las disidencias reclutan. ' +
            'Posponer la reintegración no la evita: la entrega al mejor postor armado. La "R" del DDR ' +
            'no puede esperar a que todo lo demás esté listo — es parte de la reconstrucción, no su premio.',
          codex: ['ddr'],
        },
      ],
      eco: {
        historiaId: 'mandela',
        texto:
          'Nelson Mandela salió de 27 años de cárcel y eligió trabajar con quienes lo encerraron: ' +
          'aprendió su idioma, entendió sus miedos, los hizo socios de la transición. Convivir con ' +
          'el antiguo enemigo no es ingenuidad — es la estrategia más exigente que existe.',
      },
    },
    {
      id: 'rumor-memorial',
      mes: 4,
      titulo: 'El rumor',
      texto:
        'Circula un rumor en el valle: "el memorial reabre heridas; mejor mirar al futuro". Algunos ' +
        'vecinos piden frenar cualquier acto de memoria. Otros — las familias de las víctimas — ' +
        'sienten que sin memoria el retorno es una mentira.',
      opciones: [
        {
          texto: 'Convocar un diálogo comunitario: que víctimas y escépticos diseñen juntos los actos de memoria.',
          efectos: { confianza: 6, justicia: 6 },
          fondos: -10,
          retro:
            'La memoria impuesta divide; la memoria construida en común cose. Los procesos de memoria ' +
            'que funcionan (Guatemala, Perú, Colombia) son los que la comunidad siente propios. El ' +
            'silencio, en cambio, no cierra heridas: las privatiza y las hereda.',
          codex: ['memoria'],
        },
        {
          texto: 'Pausar los actos de memoria para no generar conflicto.',
          efectos: { justicia: -10, legitimidad: -4 },
          retro:
            'El "pacto del olvido" parece prudencia y es una hipoteca: la memoria reprimida vuelve ' +
            'décadas después, todavía inflamada (España es el caso clásico). Y para las víctimas, el ' +
            'silencio oficial es una segunda forma de desaparición.',
          codex: ['memoria'],
        },
      ],
      eco: {
        historiaId: 'berry-magee',
        texto:
          'Jo Berry perdió a su padre en una bomba del IRA — y dedicó su vida a entender al hombre ' +
          'que la puso. Hoy dan charlas juntos. La memoria que sana no es la que olvida ni la que ' +
          'acusa: es la que se atreve a conversar.',
      },
    },
    {
      id: 'amenaza-lideresa',
      mes: 6,
      titulo: 'La amenaza',
      texto:
        'Aparece un panfleto bajo la puerta de la lideresa que impulsa el retorno: "Váyase o atengase ' +
        'a las consecuencias". Es la persona que más ha cosido este valle. Todos los ojos se vuelven ' +
        'hacia tu equipo.',
      opciones: [
        {
          texto: 'Activar protección inmediata y exigir al Estado desmantelar la estructura que amenaza.',
          efectos: { seguridad: 8, confianza: 5 },
          fondos: -20,
          retro:
            'Cada líder social asesinado le dice a mil que organizarse cuesta la vida. Las garantías de ' +
            'seguridad no son un punto más del posconflicto: son su condición de posibilidad. La ' +
            'protección individual gana tiempo; solo desmantelar las redes criminales gana la paz.',
          codex: ['garantias-seguridad'],
        },
        {
          texto: 'Registrar la denuncia y recomendar a la lideresa bajar el perfil un tiempo.',
          efectos: { seguridad: -10, confianza: -8, legitimidad: -5 },
          retro:
            'Pedirle a la lideresa que se silencie es hacer el trabajo de quienes la amenazan. Donde el ' +
            'Estado no protege a quienes cosen el tejido social, el miedo reconstruye lo que la guerra ' +
            'dejó: el silencio. El exterminio de la Unión Patriótica empezó con panfletos como este.',
          codex: ['garantias-seguridad'],
        },
      ],
      eco: {
        historiaId: 'rabin',
        texto:
          'A Yitzhak Rabin no lo mató el enemigo contra el que guerreó toda su vida: lo mató alguien ' +
          'de su propio pueblo que no le perdonó hacer la paz. A los que cosen el tejido roto, ' +
          'alguien siempre intenta callarlos. Protegerlos no es un gasto: es el proceso entero.',
      },
    },
    {
      id: 'lluvias',
      mes: 5,
      visual: 'lluvia',
      titulo: 'Las lluvias se llevan el vado',
      texto:
        'Una creciente del río destruye el paso del vado: la única conexión entre las dos orillas ' +
        'del valle. Las familias del otro lado quedan aisladas del mercado y de la escuela. ' +
        'La caja del proyecto no estaba preparada para esto.',
      opciones: [
        {
          texto: 'Reconstruirlo ya, en minga comunitaria con materiales pagados por el proyecto.',
          efectos: { confianza: 6, legitimidad: 3 },
          fondos: -30,
          retro:
            'Caro y agotador — y probablemente correcto. Las crisis de recursos son el pan de cada ' +
            'día de la reconstrucción: los presupuestos de paz nunca incluyen la creciente del río. ' +
            'Los proyectos que sobreviven son los que guardan reservas y los que convierten cada ' +
            'emergencia en trabajo común: la minga también cose el tejido.',
          codex: ['implementacion'],
        },
        {
          texto: 'Esperar a que el gobierno central envíe la ayuda prometida.',
          efectos: { legitimidad: -8, confianza: -5 },
          retro:
            'La ayuda llegará — en seis meses, quizás. Mientras tanto el valle aprende la lección ' +
            'equivocada: que el proceso no responde cuando duele. La implementación se juega en ' +
            'estas semanas grises; cada promesa que tarda es un voto para los que dicen que la paz ' +
            'no sirve.',
          codex: ['implementacion'],
        },
      ],
      eco: {
        historiaId: 'bigombe',
        texto:
          'Cuando a Betty Bigombe se le acabó el cargo oficial y el presupuesto, siguió mediando ' +
          'en Uganda con sus propios ahorros. La paz casi nunca fracasa por falta de ideas: ' +
          'fracasa por falta de alguien dispuesto a sostenerla cuando los recursos se acaban.',
      },
    },
  ],
  eventosCondicionales: [
    {
      id: 'incursion',
      condicion: (ind, ctx) => ind.seguridad < 40 && ctx.mes >= 3,
      titulo: 'La incursión',
      texto:
        'Lo que temías: un grupo armado disidente entra de noche al valle. Saben que aquí hay ' +
        'inversión nueva y poca protección. Exigen "colaboración" — y para demostrar que van en ' +
        'serio, amenazan con destruir lo construido.',
      opciones: [
        {
          texto: 'Activar de urgencia un esquema de protección comunitaria con el Estado y los garantes.',
          efectos: { seguridad: 8, confianza: 3 },
          fondos: -25,
          retro:
            'Llegaste tarde pero llegaste: donde la seguridad no se construye a tiempo, se paga en ' +
            'crisis y al doble de precio. Los territorios de posconflicto sin presencia estatal ' +
            'integral son un vacío — y los vacíos, en una guerra que termina, siempre los llena ' +
            'alguien armado.',
          codex: ['garantias-seguridad'],
        },
        {
          texto: 'No ceder ni gastar: confiar en que no se atrevan a más.',
          efectos: { confianza: -8, seguridad: -5 },
          retro:
            'Se atrevieron. La esperanza no es un plan de seguridad: los saboteadores miden el costo ' +
            'de actuar, y donde nadie responde, el costo es cero. Lo que la guerra no destruyó, lo ' +
            'destruye el vacío que dejó.',
          codex: ['spoilers', 'garantias-seguridad'],
          efectoEspecial: 'destruir-edificio',
        },
      ],
      eco: {
        historiaId: 'hume',
        texto:
          'Treinta años de "Troubles" le enseñaron a John Hume que la violencia siempre vuelve a ' +
          'probar la puerta cuando la paz avanza. Su respuesta nunca fue rendirse ni devolver el ' +
          'golpe: fue cerrar los vacíos — con presencia, con diálogo, con comunidad organizada.',
      },
    },
    {
      id: 'accidente-mina',
      condicion: (_ind, ctx) => ctx.minas > 0 && ctx.mes >= 6,
      titulo: 'El campo que nadie limpió',
      texto:
        'Un niño que pastoreaba entró al campo minado que sigue sin desminar. Sobrevivió, pero ' +
        'perdió una pierna. El valle entero está de luto y de rabia: la guerra terminó en los ' +
        'papeles, pero sigue enterrada en la tierra.',
      opciones: [
        {
          texto: 'Priorizar el desminado de inmediato y acompañar a la familia con todo el proyecto.',
          efectos: { seguridad: -4, confianza: 2, justicia: 3 },
          retro:
            'Las minas antipersonal no distinguen la firma de un acuerdo: siguen matando años — a ' +
            'veces décadas — después. Por eso el desminado humanitario no es una tarea más de la ' +
            'lista: es la frontera física entre la guerra y la paz. Cada mes que espera, cobra.',
          codex: ['dih'],
        },
        {
          texto: 'Cercar el campo con señales y dejar el desminado para cuando haya más fondos.',
          efectos: { seguridad: -8, confianza: -6, legitimidad: -4 },
          retro:
            'Las cercas se caen, los niños no leen señales y el ganado tampoco. Aplazar el desminado ' +
            'es aceptar estadísticamente la próxima víctima. El DIH es claro: proteger a la población ' +
            'civil no espera al presupuesto del año entrante.',
          codex: ['dih'],
        },
      ],
    },
  ],
};
