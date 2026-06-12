/**
 * MODO EXPEDIENTE — la historia real, decisión por decisión.
 *
 * A diferencia de La Mesa (ficción) y del Jardín (biografías), un Expediente
 * recorre UN proceso real con fechas y hechos verificables. El jugador decide
 * ANTES de saber qué se decidió de verdad — y luego compara. La gracia no es
 * "adivinar la historia": a veces la decisión histórica fue un error, y eso
 * también se aprende (escena 3).
 *
 * Fuentes: archivo CAIN (Ulster University), texto del Acuerdo de Belfast
 * (1998), informes de la Comisión Mitchell, cobertura BBC/Irish Times.
 * Lectura recomendada en el cierre: "No digas nada", P. R. Keefe.
 */

export interface EscenaExpediente {
  id: string;
  fecha: string;
  titulo: string;
  /** La situación histórica en ese momento, sin spoilers de lo que vino. */
  contexto: string;
  pregunta: string;
  opciones: string[];
  /** Índice de la opción que coincide con la decisión histórica. */
  historica: number;
  /** Qué se decidió de verdad y qué pasó después. */
  queOcurrio: string;
  /** La lección — incluida cuando lo histórico salió mal. */
  reflexion: string;
  codex?: string[];
}

export interface Expediente {
  id: string;
  titulo: string;
  lugar: string;
  intro: string;
  escenas: EscenaExpediente[];
  cierre: {
    texto: string;
    libro: { titulo: string; autor: string; nota: string };
    enlaces: { titulo: string; url: string }[];
  };
}

export const EXPEDIENTE_IRLANDA: Expediente = {
  id: 'irlanda',
  titulo: 'Irlanda del Norte: el camino al Viernes Santo',
  lugar: 'Belfast, Derry, Londres, Dublín · 1988–1998',
  intro:
    'Treinta años de "Troubles": más de 3.500 muertos en una guerra de baja intensidad entre ' +
    'republicanos (mayoría católica, por la unificación con Irlanda), lealistas (mayoría ' +
    'protestante, por seguir en el Reino Unido) y el Estado británico. Bombas en las ciudades, ' +
    'francotiradores, huelgas de hambre, desaparecidos. Vas a tomar, en orden, siete decisiones ' +
    'reales de este proceso — sin saber todavía qué se decidió de verdad. Después de cada una, ' +
    'el expediente se abre: esto fue lo que ocurrió.',
  escenas: [
    {
      id: 'hume-adams',
      fecha: 'Enero de 1988',
      titulo: 'Hablar con los intocables',
      contexto:
        'Eres John Hume, líder del partido nacionalista moderado (SDLP) y figura respetada del ' +
        'pacifismo. Te proponen reunirte en secreto con Gerry Adams, presidente de Sinn Féin — ' +
        'el brazo político del IRA, que sigue poniendo bombas. Si se filtra, la prensa te ' +
        'destrozará: "le da respetabilidad a los terroristas". Tu partido puede pagar el costo ' +
        'electoral. Tus amigos te dicen que no.',
      pregunta: '¿Te reúnes con Adams?',
      opciones: [
        'Sí: sin hablar con quienes disparan, la paz es imposible. Asumo el costo.',
        'No: reunirse legitima la violencia. Solo dialogaré cuando el IRA renuncie a las armas.',
        'Solo a través de intermediarios, sin contacto directo ni actas.',
      ],
      historica: 0,
      queOcurrio:
        'Hume se reunió con Adams — en 1988 y de nuevo, en secreto, desde 1993. Cuando se supo, ' +
        'fue crucificado: la prensa lo llamó ingenuo y cómplice, su partido se desangró en las ' +
        'urnas (años después, Sinn Féin lo superaría). Pero ese canal Hume–Adams produjo los ' +
        'principios que destrabaron todo: el futuro de Irlanda del Norte se decidiría solo por ' +
        'consentimiento y sin violencia. Hume recibió el Nobel en 1998 — y pagó el precio ' +
        'político completo por él.',
      reflexion:
        'La decisión correcta y la decisión popular casi nunca son la misma. Hume eligió ser ' +
        'eficaz antes que electable — el tipo de coraje que los procesos de paz consumen en ' +
        'cantidades industriales.',
      codex: ['pre-negociacion', 'mediacion'],
    },
    {
      id: 'canal-secreto',
      fecha: '1990–1993',
      titulo: 'El canal que no existe',
      contexto:
        'Ahora eres el gobierno británico. Públicamente tu posición es de hierro: "no negociamos ' +
        'con terroristas". El primer ministro John Major declara en el Parlamento que hablar con ' +
        'el IRA le "revolvería el estómago". Pero existe un canal secreto de mensajes con el ' +
        'liderazgo republicano — y por ahí acaba de llegar una señal de que el IRA explora un ' +
        'final. Mientras tanto, las bombas siguen: si el canal se filtra, el gobierno queda como ' +
        'mentiroso ante el país.',
      pregunta: '¿Mantienes el canal secreto mientras las bombas siguen estallando?',
      opciones: [
        'Sí: el canal es la única puerta de salida. Que la posición pública siga siendo "nunca".',
        'No: cada bomba lo hace indefendible. Se cierra hasta que haya un cese verificable.',
      ],
      historica: 0,
      queOcurrio:
        'El canal se mantuvo — mensajeros, claves, negaciones públicas — incluso tras atentados ' +
        'atroces. Cuando la prensa lo reveló en noviembre de 1993, el escándalo fue mayúsculo… y ' +
        'un mes después llegó la Declaración de Downing Street, la base política del proceso. ' +
        'Sin esos tres años de mensajes secretos, no había sobre qué construirla.',
      reflexion:
        'Los Estados también usan canales secretos — y la hipocresía aparente ("nunca ' +
        'negociaremos" mientras se negocia) suele ser el costo de mantener viva la única salida. ' +
        'Lo viste en La Mesa: la fase exploratoria discreta existe porque la luz pública mata ' +
        'los comienzos.',
      codex: ['pre-negociacion'],
    },
    {
      id: 'decommissioning',
      fecha: 'Marzo de 1995',
      titulo: 'La precondición',
      contexto:
        'Lo impensable ocurrió: el IRA declaró un alto el fuego completo en agosto de 1994, y los ' +
        'paramilitares lealistas lo siguieron. Hay euforia y desconfianza a partes iguales. Ahora ' +
        'el gobierno británico debe decidir las condiciones para que Sinn Féin entre a la mesa de ' +
        'negociación. Los unionistas exigen que el IRA entregue las armas ANTES de cualquier ' +
        'negociación: "no se negocia con una pistola sobre la mesa". Los republicanos responden ' +
        'que la entrega previa es la rendición que no negociaron.',
      pregunta: '¿Exiges el desarme previo como condición para negociar?',
      opciones: [
        'Sí: sin entrega previa de armas, sentarse es premiar la violencia.',
        'No: el desarme será resultado de la negociación, no su requisito. Verificación en paralelo.',
      ],
      historica: 0,
      queOcurrio:
        'El gobierno exigió desarme previo (el famoso "Washington 3") — y congeló el proceso ' +
        'durante 18 meses. La Comisión Mitchell recomendó en enero de 1996 el desarme EN PARALELO ' +
        'a las negociaciones; fue ignorada. Tres semanas después, el IRA rompió el cese con la ' +
        'bomba de Canary Wharf en Londres: dos muertos, cien heridos. La precondición que buscaba ' +
        'seguridad produjo lo contrario. Cuando el proceso renació en 1997, se adoptó exactamente ' +
        'lo que Mitchell había propuesto.',
      reflexion:
        'La decisión histórica fue un ERROR — y por eso esta escena importa: los expedientes no ' +
        'son para adivinar la historia sino para aprender de ella. Las precondiciones imposibles ' +
        'se sienten como firmeza y funcionan como sabotaje. (En La Mesa, esta es la primera ' +
        'trampa del juego.)',
      codex: ['agenda', 'cese-fuego'],
    },
    {
      id: 'sinn-fein-mesa',
      fecha: 'Septiembre de 1997',
      titulo: 'Sentar al diablo a la mesa',
      contexto:
        'Nuevo gobierno (Blair), nuevo cese del IRA, nueva oportunidad. Sinn Féin acepta los ' +
        '"Principios Mitchell" — compromiso con medios exclusivamente pacíficos — y pide entrar ' +
        'a las negociaciones multipartidistas. El partido unionista más duro (DUP, de Ian ' +
        'Paisley) anuncia que si Sinn Féin entra, ellos se levantan de la mesa y denunciarán ' +
        'todo el proceso como traición.',
      pregunta: '¿Dejas entrar a Sinn Féin sabiendo que el DUP abandonará la mesa?',
      opciones: [
        'Sí: una mesa sin los que disparan no negocia el fin de los disparos. Que el DUP decida su silla.',
        'No: sin el unionismo duro adentro, cualquier acuerdo nacerá cojo. Primero hay que retenerlos.',
      ],
      historica: 0,
      queOcurrio:
        'Sinn Féin entró; el DUP se levantó y se quedó afuera por elección propia. El proceso ' +
        'siguió con los unionistas moderados (UUP, de David Trimble, que arriesgó su carrera al ' +
        'quedarse). El acuerdo se firmó sin el DUP — que años después, ironías de la historia, ' +
        'terminó gobernando BAJO ese mismo acuerdo, compartiendo poder con Sinn Féin (2007).',
      reflexion:
        'No todos los actores entran al mismo tiempo, y esperar al último endurecido puede costar ' +
        'el proceso entero. A los críticos se les deja la puerta abierta — pero la mesa no se ' +
        'detiene por los que eligen no sentarse. (Stedman llamaría al DUP de 1997 un spoiler ' +
        'limitado: quería otro acuerdo, no ningún acuerdo.)',
      codex: ['spoilers', 'participacion'],
    },
    {
      id: 'presos',
      fecha: 'Abril de 1998',
      titulo: 'La píldora más amarga',
      contexto:
        'Semana santa, Stormont. El mediador George Mitchell puso fecha límite y el acuerdo está ' +
        'a horas de cerrarse. Queda el punto que nadie quiere tocar: los presos. Republicanos y ' +
        'lealistas exigen la liberación anticipada de sus prisioneros — incluidos autores de ' +
        'atentados con muertos — como parte del acuerdo. Para las víctimas es una profanación. ' +
        'Sin ese punto, ninguno de los dos bandos armados firma.',
      pregunta: '¿Aceptas liberar a los presos paramilitares dentro del acuerdo?',
      opciones: [
        'Sí: liberación anticipada condicionada al cese, en dos años. Sin esto no hay acuerdo.',
        'No: hay líneas que no se cruzan. Los responsables de muertes cumplen condena completa.',
        'Solo caso por caso, con revisión judicial individual y sin plazo garantizado.',
      ],
      historica: 0,
      queOcurrio:
        'El acuerdo incluyó la liberación anticipada (en dos años) de los presos de las ' +
        'organizaciones en cese. Fue la cláusula más dolorosa para la sociedad — familias de ' +
        'víctimas viendo salir a los asesinos de los suyos — y los negociadores la defendieron ' +
        'con el argumento más incómodo del proceso: la paz se firma con los que hicieron la ' +
        'guerra, y sus presos eran parte del precio. 428 presos salieron bajo el acuerdo.',
      reflexion:
        'Es la versión norirlandesa del dilema de la justicia que jugaste en La Mesa: ¿cuánta ' +
        'justicia entregas por cuánta paz? No hay respuesta limpia — hay precios, y alguien ' +
        'concreto los paga. Por eso las víctimas no pueden ser un pie de página del acuerdo.',
      codex: ['justicia-transicional', 'amnistias', 'victimas'],
    },
    {
      id: 'referendos',
      fecha: 'Mayo de 1998',
      titulo: 'Preguntarle a todos',
      contexto:
        'El Acuerdo de Viernes Santo está firmado: gobierno compartido, principio de ' +
        'consentimiento, desarme, presos, comisiones. Ahora hay que decidir cómo legitimarlo. ' +
        'La opción audaz: referendos SIMULTÁNEOS en Irlanda del Norte y en la República de ' +
        'Irlanda — que toda la isla vote el mismo día. Si pierde en cualquiera de los dos, ' +
        'todo el edificio se cae. Las encuestas en el norte son inciertas: el unionismo está ' +
        'partido en dos.',
      pregunta: '¿Sometes el acuerdo a referendo doble y simultáneo?',
      opciones: [
        'Sí: solo un mandato popular en toda la isla blinda el acuerdo contra los saboteadores.',
        'No: demasiado riesgo. Ratificación parlamentaria en Londres y Dublín, más segura.',
      ],
      historica: 0,
      queOcurrio:
        'El 22 de mayo de 1998 votó toda la isla — la primera votación conjunta desde 1918. ' +
        'Norte: 71,1% sí. República: 94,4% sí (cediendo además su reclamo constitucional sobre ' +
        'el norte). Antes del voto, el texto completo del acuerdo se envió a CADA hogar de ' +
        'Irlanda del Norte: pedagogía masiva, no propaganda. Ese mandato popular fue el blindaje ' +
        'que le permitió al acuerdo sobrevivir todo lo que vino después.',
      reflexion:
        'El contraste con el plebiscito colombiano de 2016 (que perdió) es la lección doble: el ' +
        'referendo es un arma poderosa y peligrosa — gana quien hace la pedagogía, no quien ' +
        'tiene la razón. Texto en cada casa, campaña transversal, y la pregunta correcta en el ' +
        'momento correcto.',
      codex: ['refrendacion', 'pedagogia-paz'],
    },
    {
      id: 'omagh',
      fecha: '15 de agosto de 1998',
      titulo: 'La prueba de fuego',
      contexto:
        'Tres meses después del referendo, un coche bomba del "IRA Auténtico" — disidentes que ' +
        'rechazan el acuerdo — estalla en una calle comercial de Omagh un sábado por la tarde. ' +
        '29 muertos, cientos de heridos: el peor atentado en treinta años de conflicto, DESPUÉS ' +
        'de firmada la paz. El país está en shock. Hay presión enorme por respuestas de mano ' +
        'dura: suspender el acuerdo, reintroducir internamiento sin juicio, volver a empezar.',
      pregunta: 'Como liderazgo político (de todos los bandos), ¿qué respondes?',
      opciones: [
        'Sostener el acuerdo: condena unánime, duelo conjunto, y que el atentado aísle a los disidentes.',
        'Suspender la implementación hasta desmantelar a los disidentes: la seguridad primero.',
      ],
      historica: 0,
      queOcurrio:
        'El acuerdo resistió. La condena fue unánime e incluyó, por primera vez en la historia, ' +
        'a Sinn Féin condenando sin ambigüedad un atentado republicano. Víctimas católicas y ' +
        'protestantes fueron lloradas juntas. Los disidentes quedaron políticamente solos: Omagh, ' +
        'que buscaba matar el proceso, terminó consolidándolo. La implementación siguió — con ' +
        'crisis, con suspensiones temporales del gobierno compartido, con el desarme del IRA ' +
        'recién completado en 2005 — pero el edificio nunca volvió a estar en duda.',
      reflexion:
        'Todo acuerdo será atacado por quienes pierden con él — la pregunta nunca es si habrá ' +
        'crisis sino si el proceso tiene más legitimidad que sus saboteadores. La respuesta a ' +
        'Omagh fue posible porque el referendo había hecho la paz propiedad de todos. Cada pieza ' +
        'de un proceso sostiene a las demás.',
      codex: ['spoilers', 'implementacion'],
    },
  ],
  cierre: {
    texto:
      'Siete decisiones, diez años, un acuerdo que sigue vivo — imperfecto, con un gobierno que ' +
      'se cae y se levanta, pero sin volver a la guerra. Irlanda del Norte enseña las dos caras: ' +
      'que la paz negociada funciona, y que se construye con decisiones impopulares, errores ' +
      'caros (la precondición de 1995) y precios que duelen (los presos). Si una sola persona ' +
      'joven sale de este expediente entendiendo que la paz es artesanía y no milagro, cumplió.',
    libro: {
      titulo: 'No digas nada',
      autor: 'Patrick Radden Keefe',
      nota:
        'La otra cara de este expediente: la desaparición de Jean McConville y lo que el ' +
        'conflicto le hizo a la gente común — memoria, silencio y verdad. Imprescindible para ' +
        'entender por qué los acuerdos no cierran las heridas por sí solos.',
    },
    enlaces: [
      { titulo: 'Texto del Acuerdo de Belfast (1998)', url: 'https://www.gov.uk/government/publications/the-belfast-agreement' },
      { titulo: 'Archivo CAIN del conflicto (Ulster University)', url: 'https://cain.ulster.ac.uk/' },
      { titulo: 'El Acuerdo de Viernes Santo — Wikipedia', url: 'https://es.wikipedia.org/wiki/Acuerdo_de_Viernes_Santo' },
    ],
  },
};
