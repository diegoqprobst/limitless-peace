import type { Nodo, NombreFase } from '../engine/types';

/**
 * ESCENARIO 1 — "El camino de Miravalle"
 *
 * Conflicto ficticio que sintetiza dinámicas de procesos de paz reales
 * (Colombia 2012-2016, Sudáfrica, Irlanda del Norte, Guatemala, Mindanao).
 * El jugador es asesor/a técnico de un equipo internacional de mediación
 * humanitaria, guiado por los principios de neutralidad e imparcialidad.
 *
 * Para crear un nuevo escenario: duplicar este archivo, cambiar los nodos
 * y registrarlo. El motor no necesita cambios.
 */

export const CONTEXTO = {
  titulo: 'El camino de Miravalle',
  resumen:
    'La República de Miravalle lleva 32 años en conflicto armado interno entre ' +
    'el Gobierno y el Frente Insurgente de las Montañas (FIM). El saldo: más de ' +
    '60.000 víctimas, 400.000 personas desplazadas y un país profundamente dividido. ' +
    'Tras una década de estancamiento militar, ambas partes han aceptado en secreto ' +
    'explorar una salida negociada. Tú integras el equipo de mediación humanitaria ' +
    'internacional que acompañará el proceso. Cada decisión que tomes está inspirada ' +
    'en dilemas reales de procesos de paz.',
};

export const FASES: NombreFase[] = [
  {
    numero: 0,
    nombre: 'Pre-negociación',
    descripcion: 'Los contactos secretos que deciden si habrá mesa o no.',
  },
  {
    numero: 1,
    nombre: 'Medidas humanitarias y cese al fuego',
    descripcion: 'Reducir el sufrimiento mientras se negocia.',
  },
  {
    numero: 2,
    nombre: 'Negociación sustantiva',
    descripcion: 'Víctimas, justicia, armas: los temas que definen el acuerdo.',
  },
  {
    numero: 3,
    nombre: 'Firma y refrendación',
    descripcion: 'Convertir un texto en un pacto social.',
  },
  {
    numero: 4,
    nombre: 'Implementación',
    descripcion: 'Donde los acuerdos se cumplen… o se marchitan.',
  },
];

export const INDICADORES_INICIALES = {
  confianza: 35,
  seguridad: 40,
  justicia: 30,
  legitimidad: 45,
};

export const NODO_INICIAL = 'canal-secreto';

export const NODOS: Nodo[] = [
  // ───────────────────────── FASE 0: PRE-NEGOCIACIÓN ─────────────────────────
  {
    id: 'canal-secreto',
    fase: 0,
    titulo: 'El primer contacto',
    texto:
      'Un emisario del FIM hace llegar una carta: están dispuestos a hablar, pero ' +
      'temen que el Gobierno use el anuncio para humillarlos públicamente. El ' +
      'Gobierno, a su vez, teme que sentarse a la mesa se lea como debilidad. ' +
      'Tu equipo debe recomendar cómo iniciar los contactos.',
    opciones: [
      {
        texto: 'Establecer un canal secreto de exploración en un tercer país, sin prensa.',
        efectos: { confianza: +10, legitimidad: -3 },
        retro:
          'La fase exploratoria discreta permite a las partes hablar sin el costo político ' +
          'de hacerlo en público. Así empezó el proceso colombiano (encuentros secretos en ' +
          'La Habana, 2011-2012) y el de Irlanda del Norte (canal secreto Gobierno británico–IRA). ' +
          'El riesgo: cuando se filtre, parte de la sociedad sentirá que se negoció "a sus espaldas".',
        codex: ['pre-negociacion', 'mediacion'],
      },
      {
        texto: 'Anunciar públicamente el inicio de diálogos para generar respaldo ciudadano.',
        efectos: { confianza: -8, legitimidad: +5 },
        retro:
          'Anunciar antes de acordar reglas básicas expone el proceso a sabotaje temprano: ' +
          'cada declaración se vuelve munición política y las partes endurecen posiciones para ' +
          'su audiencia. Procesos anunciados prematuramente (Caguán, Colombia 1999-2002) ' +
          'colapsaron en parte por negociar bajo los reflectores sin agenda clara.',
        codex: ['pre-negociacion'],
      },
      {
        texto: 'Exigir al FIM un cese unilateral de ataques como condición previa para hablar.',
        efectos: { confianza: -10, seguridad: +3 },
        retro:
          'Las precondiciones duras suelen matar los diálogos antes de nacer: la parte más débil ' +
          'las lee como rendición encubierta. La evidencia comparada sugiere negociar "en medio ' +
          'del conflicto" con reglas claras, y dejar el cese al fuego como resultado temprano de ' +
          'la mesa, no como requisito de entrada.',
        codex: ['pre-negociacion'],
      },
    ],
    siguiente: 'garantes',
  },
  {
    id: 'garantes',
    fase: 0,
    titulo: 'Sede y garantes',
    texto:
      'Las partes aceptan explorar diálogos. Ahora hay que decidir dónde se negociará ' +
      'y quién acompañará la mesa. Cada detalle logístico es también un mensaje político.',
    opciones: [
      {
        texto: 'Sede en un país neutral, con dos Estados garantes aceptados por ambas partes.',
        efectos: { confianza: +10, legitimidad: +4 },
        retro:
          'Los garantes dan testimonio, destraban crisis y elevan el costo de levantarse de la ' +
          'mesa. En Colombia, Cuba y Noruega como garantes (y Chile y Venezuela como acompañantes) ' +
          'fueron clave para sostener 4 años de negociación. La sede neutral protege la seguridad ' +
          'de los negociadores y baja la presión mediática.',
        codex: ['garantes', 'mediacion'],
      },
      {
        texto: 'Negociar dentro de Miravalle para que el proceso "se sienta propio".',
        efectos: { confianza: -6, seguridad: -8, legitimidad: +6 },
        retro:
          'Negociar en el territorio tiene valor simbólico, pero en conflicto activo expone la mesa ' +
          'a atentados, espionaje y presión diaria de los medios. La zona de distensión del Caguán ' +
          'mostró el costo: el territorio mismo se volvió objeto de disputa y desconfianza.',
        codex: ['garantes'],
      },
      {
        texto: 'Prescindir de garantes internacionales: "este conflicto lo resolvemos solos".',
        efectos: { confianza: -8 },
        retro:
          'Sin terceros, cada crisis depende solo de la buena voluntad de dos enemigos históricos. ' +
          'Los acompañantes internacionales no deciden por las partes: crean condiciones para que ' +
          'las partes decidan. Casi ningún proceso de paz contemporáneo exitoso ha prescindido de ellos.',
        codex: ['garantes'],
      },
    ],
    siguiente: 'agenda',
  },
  {
    id: 'agenda',
    fase: 0,
    titulo: 'La agenda: ¿todo o lo esencial?',
    texto:
      'Antes de instalar la mesa pública hay que pactar QUÉ se va a negociar. El FIM quiere ' +
      'discutir "el modelo de país completo". El Gobierno quiere hablar solo de desarme. ' +
      'Tu equipo facilita la redacción del acuerdo marco.',
    opciones: [
      {
        texto: 'Agenda acotada: los puntos que causaron y sostienen el conflicto, nada más.',
        efectos: { confianza: +8, legitimidad: +5 },
        retro:
          'El Acuerdo General de La Habana (2012) definió 6 puntos concretos y una regla de oro: ' +
          '"nada está acordado hasta que todo esté acordado". Una agenda acotada hace el proceso ' +
          'manejable y verificable. Las agendas totales ("refundar el país en la mesa") tienden a ' +
          'eternizar las negociaciones hasta el colapso.',
        codex: ['agenda', 'pre-negociacion'],
      },
      {
        texto: 'Agenda amplia y abierta: que las partes discutan todos los problemas del país.',
        efectos: { confianza: -5, legitimidad: -4 },
        retro:
          'En el Caguán se pactó una agenda de 12 puntos con decenas de subtemas — prácticamente ' +
          'el programa de un Estado. Tres años después no se había acordado nada sustantivo. ' +
          'Una mesa de paz no reemplaza a la democracia: resuelve el conflicto armado para que ' +
          'los demás conflictos se tramiten sin armas.',
        codex: ['agenda'],
      },
      {
        texto: 'Solo desarme y reintegración: las causas del conflicto se discuten después.',
        efectos: { confianza: -8, justicia: -5 },
        retro:
          'Para un grupo armado, entregar las armas sin abordar ninguna de sus reivindicaciones ' +
          'equivale a una rendición, no a una negociación. Los acuerdos que ignoran las causas ' +
          '(tierra, exclusión política, derechos) tienen altas tasas de recaída en violencia en ' +
          'la década siguiente.',
        codex: ['agenda'],
      },
    ],
    siguiente: 'acuerdo-humanitario',
  },

  // ──────────────── FASE 1: MEDIDAS HUMANITARIAS Y CESE AL FUEGO ────────────────
  {
    id: 'acuerdo-humanitario',
    fase: 1,
    titulo: 'Mientras se negocia, la guerra sigue',
    texto:
      'La mesa quedó instalada, pero en el terreno continúan los combates. Una ofensiva del ' +
      'ejército deja una comunidad sin acceso a alimentos ni atención médica; el FIM retiene ' +
      'a 14 personas. La opinión pública pregunta: ¿de qué sirve la mesa si la gente sigue sufriendo?',
    opciones: [
      {
        texto: 'Proponer acuerdos humanitarios inmediatos: liberación de retenidos, acceso humanitario y desminado piloto.',
        efectos: { confianza: +8, seguridad: +10, legitimidad: +8 },
        retro:
          'Los acuerdos humanitarios parciales generan "victorias tempranas" que demuestran que la mesa ' +
          'sirve, sin esperar al acuerdo final. En Colombia, el desminado conjunto en El Orejón (2015) y ' +
          'la liberación de secuestrados construyeron confianza verificable. Además aplican el Derecho ' +
          'Internacional Humanitario: la guerra también tiene límites.',
        codex: ['dih', 'principios-humanitarios', 'medidas-confianza'],
      },
      {
        texto: 'Mantener la mesa concentrada en la agenda política y no "distraerse" con lo humanitario.',
        efectos: { seguridad: -8, legitimidad: -10 },
        retro:
          'Una mesa que negocia durante años sin aliviar el sufrimiento pierde a la ciudadanía. ' +
          'La población evalúa el proceso por lo que cambia en su vida, no por los comunicados. ' +
          'El DIH obliga a proteger a la población civil en todo momento — no es una concesión ' +
          'de la mesa, es una obligación de las partes.',
        codex: ['dih'],
      },
      {
        texto: 'Condicionar todo gesto humanitario a concesiones políticas de la otra parte.',
        efectos: { confianza: -6, seguridad: -5, justicia: -4 },
        retro:
          'Usar el sufrimiento de la población como ficha de cambio viola el principio de humanidad ' +
          'y envenena la mesa. El acceso humanitario, la atención médica y el trato digno a las ' +
          'personas no son negociables según el DIH y los Principios Fundamentales del Movimiento ' +
          'de la Cruz Roja y de la Media Luna Roja.',
        codex: ['principios-humanitarios', 'dih'],
      },
    ],
    siguiente: 'cese-fuego',
  },
  {
    id: 'cese-fuego',
    fase: 1,
    titulo: 'Diseñar el cese al fuego',
    texto:
      'Con las primeras medidas humanitarias andando, las partes piden a tu equipo opciones ' +
      'técnicas para silenciar los fusiles. Un cese al fuego mal diseñado puede destruir el ' +
      'proceso: cada disparo se convertirá en acusación.',
    opciones: [
      {
        texto: 'Cese bilateral con protocolos detallados, zonas definidas y verificación de un tercero (ONU).',
        efectos: { confianza: +8, seguridad: +12 },
        retro:
          'Un cese al fuego sin verificación es una acusación esperando a ocurrir. El Mecanismo de ' +
          'Monitoreo y Verificación tripartito en Colombia (Gobierno–FARC–ONU, 2016) procesaba cada ' +
          'incidente técnicamente antes de que escalara políticamente. Los protocolos convierten ' +
          '"¡violaron el cese!" en un expediente verificable.',
        codex: ['cese-fuego', 'verificacion'],
      },
      {
        texto: 'Pedir solo un cese unilateral del FIM como muestra de buena fe.',
        efectos: { confianza: -4, seguridad: +4 },
        retro:
          'Los ceses unilaterales son frágiles: sin reciprocidad ni verificación, cualquier operación ' +
          'militar del otro lado los quiebra y deja a quien lo declaró ante sus bases como ingenuo. ' +
          'Pueden servir como gesto inicial, pero no sostienen un proceso largo.',
        codex: ['cese-fuego'],
      },
      {
        texto: 'Desescalada informal sin acuerdo escrito, para no "amarrar" militarmente al Gobierno.',
        efectos: { seguridad: -6, confianza: -5 },
        retro:
          'Sin reglas escritas, cada parte interpreta la desescalada a su favor y los incidentes no ' +
          'tienen árbitro. La ambigüedad que facilita firmar un acuerdo es la misma que después lo ' +
          'dinamita. Lo no escrito no se puede verificar; lo no verificable no construye confianza.',
        codex: ['cese-fuego', 'verificacion'],
      },
    ],
    siguiente: 'violacion-cese',
  },
  {
    id: 'violacion-cese',
    fase: 1,
    titulo: 'La primera crisis',
    texto:
      'Una unidad del FIM embosca una patrulla militar: 3 soldados muertos. El FIM alega que la ' +
      'patrulla entró a una zona excluida por los protocolos. Los medios piden romper la mesa. ' +
      'El presidente te llama: "¿Qué hacemos?"',
    opciones: [
      {
        texto: 'Activar el mecanismo de verificación: investigar el incidente técnicamente y responder según protocolo.',
        efectos: { confianza: +6, seguridad: +5, legitimidad: +3 },
        retro:
          'Los procesos de paz no fracasan por tener crisis — todos las tienen — sino por no tener ' +
          'mecanismos para procesarlas. Tratar el incidente como un caso técnico (¿qué pasó?, ¿quién ' +
          'incumplió qué protocolo?, ¿qué consecuencia aplica?) evita que se convierta en juicio ' +
          'político sobre todo el proceso. Así sobrevivió el cese colombiano a múltiples incidentes.',
        codex: ['verificacion', 'spoilers'],
      },
      {
        texto: 'Suspender la mesa indefinidamente hasta que el FIM "demuestre voluntad real de paz".',
        efectos: { confianza: -12, seguridad: -8 },
        retro:
          'Suspender la mesa ante cada crisis entrega el control del proceso a quien quiera sabotearlo: ' +
          'basta un ataque para frenarlo todo. Los saboteadores ("spoilers") de ambos bandos aprenden ' +
          'rápido esa lección. La mesa debe ser más resistente que sus peores días.',
        codex: ['spoilers'],
      },
      {
        texto: 'Minimizar públicamente el incidente para proteger la mesa.',
        efectos: { legitimidad: -10, justicia: -6 },
        retro:
          'Ocultar o minimizar hechos de violencia destruye la credibilidad del proceso y revictimiza ' +
          'a las familias. La transparencia duele menos que la mentira descubierta. Un proceso de paz ' +
          'se sostiene sobre la verdad incómoda, no sobre la calma fabricada.',
        codex: ['verificacion'],
      },
    ],
    // Si la confianza quedó muy baja tras la fase 1, el proceso entra en crisis.
    siguiente: (ind) => (ind.confianza < 35 ? 'crisis-confianza' : 'victimas'),
  },
  {
    id: 'crisis-confianza',
    fase: 1,
    titulo: 'El proceso pende de un hilo',
    texto:
      'La acumulación de desconfianza pasa factura: el FIM congela su participación y el Gobierno ' +
      'evalúa retirarse. Los garantes convocan una reunión de emergencia. Hace falta un gesto que ' +
      'salve el proceso.',
    opciones: [
      {
        texto: 'Proponer un paquete de medidas de confianza recíprocas y simultáneas, verificadas por los garantes.',
        efectos: { confianza: +12, seguridad: +4 },
        retro:
          'Las medidas de construcción de confianza (liberaciones, suspensión de operaciones ofensivas, ' +
          'gestos simultáneos) funcionan cuando son recíprocas y verificables: nadie "cede primero", ' +
          'ambos ceden a la vez ante un testigo. La simultaneidad resuelve el dilema del prisionero ' +
          'que paraliza a los enemigos históricos.',
        codex: ['medidas-confianza'],
      },
      {
        texto: 'Presionar con un ultimátum: o vuelven a la mesa esta semana, o el equipo mediador se retira.',
        efectos: { confianza: -8, legitimidad: -4 },
        retro:
          'Un mediador que amenaza pierde su activo principal: ser el espacio seguro al que ambas partes ' +
          'pueden volver sin humillarse. Los ultimátums fuerzan a las partes a elegir entre la mesa y su ' +
          'orgullo — y el orgullo suele ganar. La paciencia estratégica es parte del oficio.',
        codex: ['mediacion'],
      },
    ],
    siguiente: 'victimas',
  },

  // ───────────────────── FASE 2: NEGOCIACIÓN SUSTANTIVA ─────────────────────
  {
    id: 'victimas',
    fase: 2,
    titulo: 'Las víctimas piden la palabra',
    texto:
      'Organizaciones de víctimas exigen participar: "Negocian sobre nuestro dolor sin nosotros". ' +
      'Algunos negociadores temen que su presencia "emocionalice" la mesa y la paralice. ' +
      'Tu equipo debe proponer un mecanismo.',
    opciones: [
      {
        texto: 'Llevar delegaciones plurales de víctimas a la mesa, a hablar de frente con quienes les hicieron daño.',
        efectos: { justicia: +12, legitimidad: +10, confianza: +4 },
        retro:
          'En 2014, sesenta víctimas viajaron a La Habana y se sentaron frente a las FARC y al Gobierno. ' +
          'Fue un punto de inflexión: humanizó la mesa, obligó a los negociadores a mirar el costo real ' +
          'de la guerra y dio origen al Sistema Integral de Verdad, Justicia, Reparación y No Repetición. ' +
          'Centrar a las víctimas no debilita un proceso: lo ancla moralmente.',
        codex: ['victimas', 'justicia-transicional'],
      },
      {
        texto: 'Recibir sus propuestas por escrito, pero mantener la mesa solo entre las partes armadas.',
        efectos: { justicia: -6, legitimidad: -8 },
        retro:
          'Las víctimas como "insumo documental" perpetúan su exclusión. La evidencia comparada (estudios ' +
          'sobre acuerdos 1989-2011) muestra que los procesos con participación social significativa ' +
          'producen acuerdos más duraderos. Un acuerdo entre élites armadas, sin la sociedad, nace huérfano.',
        codex: ['victimas'],
      },
      {
        texto: 'Posponer el tema de víctimas para el final, cuando "lo difícil ya esté resuelto".',
        efectos: { justicia: -10, confianza: -4 },
        retro:
          'Dejar a las víctimas para el final delata cómo se les concibe: un trámite, no el centro. ' +
          'Además es un error táctico: los temas de verdad y justicia condicionan el desarme y la ' +
          'participación política, así que igual habrá que abrirlos — pero ya sin tiempo ni confianza.',
        codex: ['victimas'],
      },
    ],
    siguiente: 'justicia',
  },
  {
    id: 'justicia',
    fase: 2,
    titulo: 'El dilema de la justicia',
    texto:
      'El nudo más duro del proceso: ¿qué pasa con los crímenes cometidos en 32 años de guerra? ' +
      'El FIM dice: "no negociamos para ir a la cárcel". Las víctimas dicen: "no hay paz sin justicia". ' +
      'El derecho internacional prohíbe amnistiar crímenes de guerra y de lesa humanidad.',
    opciones: [
      {
        texto: 'Tribunal especial: amnistía solo para delitos políticos; los crímenes graves se juzgan con penas restaurativas a cambio de verdad plena.',
        efectos: { justicia: +12, confianza: +5, legitimidad: -4 },
        retro:
          'Es el modelo de la Jurisdicción Especial para la Paz colombiana: quien aporta verdad plena y ' +
          'repara recibe sanciones restaurativas (5-8 años de restricción de libertad y trabajos de ' +
          'reparación); quien no, hasta 20 años de cárcel. Intenta el equilibrio que exige el Estatuto ' +
          'de Roma: máxima justicia que permita la paz. Nadie queda contento del todo — esa es la señal ' +
          'de un compromiso real. Parte de la opinión pública lo llamará impunidad: prepárate para defenderlo.',
        codex: ['justicia-transicional', 'amnistias'],
      },
      {
        texto: 'Amnistía general e incondicional: "borrón y cuenta nueva" para cerrar la guerra rápido.',
        efectos: { confianza: +6, justicia: -15, legitimidad: -8 },
        retro:
          'Las amnistías generales fueron la norma hasta los años 90 (España 1977, autoamnistías en el ' +
          'Cono Sur). Hoy violan el derecho internacional para crímenes graves y tienen un costo ' +
          'documentado: sin verdad ni sanción, las heridas se transmiten entre generaciones y los ' +
          'tribunales internacionales pueden reabrir los casos, destruyendo la seguridad jurídica ' +
          'que la amnistía prometía.',
        codex: ['amnistias', 'justicia-transicional'],
      },
      {
        texto: 'Justicia ordinaria plena: cárcel común para todos los responsables, sin tratamiento especial.',
        efectos: { justicia: +5, confianza: -14 },
        retro:
          'Ningún grupo armado negocia su propia cárcel: esa exigencia equivale a pedir la rendición, ' +
          'que tras 32 años de guerra sin vencedor militar no va a ocurrir. La justicia transicional ' +
          'existe precisamente porque la justicia ordinaria, diseñada para la criminalidad común, ' +
          'no puede procesar miles de crímenes de un conflicto ni incentivar su fin.',
        codex: ['justicia-transicional'],
      },
    ],
    siguiente: 'verdad',
  },
  {
    id: 'verdad',
    fase: 2,
    titulo: 'La verdad y la memoria',
    texto:
      'Junto al tribunal, las partes discuten cómo esclarecer lo que pasó: por qué empezó la guerra, ' +
      'quiénes la financiaron, qué pasó con los desaparecidos. Hay sectores poderosos a los que ' +
      'la verdad incomoda.',
    opciones: [
      {
        texto: 'Comisión de la verdad extrajudicial + unidad de búsqueda de desaparecidos, con enfoque territorial.',
        efectos: { justicia: +10, legitimidad: +6 },
        retro:
          'Las comisiones de la verdad (Sudáfrica 1996, Guatemala 1997, Perú 2001, Colombia 2017) no ' +
          'reemplazan a los jueces: construyen el relato común que una sociedad necesita para no repetir. ' +
          'Separarla de lo judicial (lo dicho ante la comisión no se usa en juicios) incentiva a los ' +
          'perpetradores a contar la verdad completa. Buscar a los desaparecidos es, además, una ' +
          'obligación humanitaria con las familias.',
        codex: ['comision-verdad', 'memoria'],
      },
      {
        texto: 'Dejar la verdad solo en manos de los procesos judiciales, caso por caso.',
        efectos: { justicia: -5, legitimidad: -4 },
        retro:
          'Los juicios producen verdad procesal sobre casos individuales, no explicaciones sobre patrones, ' +
          'responsabilidades colectivas y causas. A su ritmo, esclarecer 60.000 crímenes tomaría siglos. ' +
          'Sin un relato compartido, cada sector seguirá contando "su" guerra — el combustible de la próxima.',
        codex: ['comision-verdad'],
      },
      {
        texto: '"Mirar al futuro": ni comisión ni énfasis en el pasado, para no reabrir heridas.',
        efectos: { justicia: -12, legitimidad: -6 },
        retro:
          'El silencio no cierra las heridas: las privatiza. La experiencia española (el "pacto del olvido") ' +
          'muestra que la memoria reprimida vuelve décadas después, todavía inflamada. Las sociedades no ' +
          'eligen entre recordar u olvidar, sino entre procesar el pasado o ser gobernadas por él.',
        codex: ['memoria'],
      },
    ],
    siguiente: 'ddr',
  },
  {
    id: 'ddr',
    fase: 2,
    titulo: 'Las armas y la vida después',
    texto:
      'Llega el punto del desarme: 8.000 combatientes del FIM deben dejar las armas y volver a la vida ' +
      'civil. Muchos llevan 20 años en la guerra; no conocen otro oficio. El diseño de este punto ' +
      'decide si la paz se consolida o si nacen nuevos grupos armados.',
    opciones: [
      {
        texto: 'DDR integral: dejación verificada por la ONU + reintegración con proyectos productivos, salud, educación y acompañamiento comunitario.',
        efectos: { seguridad: +12, confianza: +6, legitimidad: +4 },
        retro:
          'DDR significa Desarme, Desmovilización y Reintegración — y la R es la más difícil y la más ' +
          'importante. Un excombatiente con proyecto de vida no vuelve al monte; uno abandonado es ' +
          'reclutable por el siguiente grupo. La evidencia (Naciones Unidas, casos de Centroamérica y ' +
          'África) es clara: escatimar en reintegración sale carísimo en seguridad.',
        codex: ['ddr', 'verificacion'],
      },
      {
        texto: 'Desarme rápido a cambio de un pago único por combatiente, sin programa de largo plazo.',
        efectos: { seguridad: +4, legitimidad: -5 },
        retro:
          'Los pagos únicos ("cash for guns") producen titulares y fotos de armas fundidas, pero la ' +
          'plata se acaba en meses y las habilidades de guerra permanecen. En varios procesos ' +
          'centroamericanos, excombatientes sin reintegración real terminaron en el crimen organizado. ' +
          'El desarme es un evento; la reintegración es una década.',
        codex: ['ddr'],
      },
      {
        texto: 'Exigir entrega de armas inmediata y pública antes de implementar cualquier otro punto.',
        efectos: { confianza: -10, seguridad: -4 },
        retro:
          'Las armas son la única garantía que un grupo insurgente cree tener de que cumplirán lo pactado. ' +
          'Por eso los desarmes exitosos son graduales y simultáneos con la implementación: en Irlanda ' +
          'del Norte, el "decommissioning" del IRA tomó 7 años después del Acuerdo de Viernes Santo. ' +
          'Secuenciar mal el desarme puede revertir todo el proceso.',
        codex: ['ddr', 'garantias-seguridad'],
      },
    ],
    siguiente: 'genero',
  },
  {
    id: 'genero',
    fase: 2,
    titulo: 'La paz, ¿para quiénes?',
    texto:
      'Organizaciones de mujeres señalan que la guerra las golpeó de forma diferenciada — violencia ' +
      'sexual, desplazamiento, jefaturas de hogar — y que en la mesa casi no hay mujeres. Proponen ' +
      'crear una instancia de género que revise todos los acuerdos.',
    opciones: [
      {
        texto: 'Crear la Subcomisión de Género y aumentar la participación de mujeres en ambas delegaciones.',
        efectos: { justicia: +8, legitimidad: +8 },
        retro:
          'La Subcomisión de Género de La Habana (2014) fue pionera mundial: revisó cada punto del acuerdo ' +
          'con enfoque de género e incluyó más de 100 medidas específicas. La evidencia cuantitativa ' +
          '(estudios sobre 40+ procesos) indica que la participación significativa de mujeres se asocia ' +
          'con acuerdos más probables de firmarse y de durar más de 15 años. No es un gesto: es diseño ' +
          'de calidad.',
        codex: ['genero', 'participacion'],
      },
      {
        texto: 'Incluir una mención general a la igualdad en el preámbulo del acuerdo.',
        efectos: { legitimidad: -3, justicia: -3 },
        retro:
          'Las menciones de preámbulo no asignan responsables, presupuesto ni metas: son letra muerta ' +
          'desde el día uno. La diferencia entre "tener en cuenta el género" y un mecanismo con mandato ' +
          'es la diferencia entre una intención y una política. Lo que no se institucionaliza, no se implementa.',
        codex: ['genero'],
      },
      {
        texto: 'Rechazar la propuesta: "la paz beneficia a todos por igual, no hay que segmentarla".',
        efectos: { legitimidad: -8, justicia: -6 },
        retro:
          'La guerra no golpea a todos por igual, y una paz ciega a esas diferencias reproduce exclusiones ' +
          'que alimentaron el conflicto. La Resolución 1325 del Consejo de Seguridad de la ONU (2000) ' +
          'reconoce exactamente esto: sin las mujeres no hay paz sostenible.',
        codex: ['genero'],
      },
    ],
    siguiente: 'spoilers-nodo',
  },
  {
    id: 'spoilers-nodo',
    fase: 2,
    titulo: 'Los enemigos de la paz',
    texto:
      'El acuerdo está cerca y los saboteadores se activan: un sector político lanza una campaña ' +
      'feroz ("entregan el país al terrorismo"), y un frente del FIM anuncia que no se acogerá ' +
      'al acuerdo. Ambos extremos se necesitan mutuamente.',
    opciones: [
      {
        texto: 'Doble estrategia: diálogo con los críticos de buena fe para ajustar el texto, y aislamiento político de los violentos.',
        efectos: { legitimidad: +8, confianza: +4, seguridad: +3 },
        retro:
          'La literatura sobre "spoilers" (Stedman) distingue críticos legítimos —que quieren un acuerdo ' +
          'distinto— de saboteadores totales —que quieren que no haya acuerdo. A los primeros se les ' +
          'escucha y se les incorpora; a los segundos se les aísla quitándoles audiencia. Confundirlos ' +
          'es fatal: tratar a todo crítico como enemigo fabrica más enemigos.',
        codex: ['spoilers', 'pedagogia-paz'],
      },
      {
        texto: 'Ignorar a los críticos y acelerar la firma antes de que ganen fuerza.',
        efectos: { legitimidad: -12, confianza: +2 },
        retro:
          'Acelerar para esquivar la crítica deja el malestar intacto y sin canal — y el malestar sin canal ' +
          'vota, marcha o dispara. El plebiscito colombiano de 2016 (50,2% por el No) mostró el costo de ' +
          'subestimar a la oposición: el acuerdo tuvo que renegociarse desde una posición debilitada.',
        codex: ['spoilers', 'refrendacion'],
      },
      {
        texto: 'Responder a la campaña opositora con descalificaciones igual de duras.',
        efectos: { legitimidad: -8, confianza: -3 },
        retro:
          'Polarizar en defensa de la paz es un oxímoron que la ciudadanía detecta de inmediato. Cada ' +
          'insulto confirma el relato del adversario ("nos desprecian") y encoge el centro político que ' +
          'todo acuerdo necesita para sobrevivir a los ciclos electorales.',
        codex: ['pedagogia-paz'],
      },
    ],
    siguiente: 'refrendacion-nodo',
  },

  // ───────────────────── FASE 3: FIRMA Y REFRENDACIÓN ─────────────────────
  {
    id: 'refrendacion-nodo',
    fase: 3,
    titulo: 'Sellar el pacto',
    texto:
      'El texto final está listo: 280 páginas que tocan justicia, armas, víctimas y participación. ' +
      'Ahora hay que decidir cómo se aprueba. El Gobierno quiere un plebiscito para "blindarlo con ' +
      'la voz del pueblo". Las encuestas son volátiles y la campaña será brutal.',
    opciones: [
      {
        texto: 'Refrendación por el Congreso, con amplia pedagogía pública del acuerdo antes y después.',
        efectos: { legitimidad: +6, confianza: +5 },
        retro:
          'La refrendación legislativa es constitucionalmente sólida y menos vulnerable a campañas de ' +
          'desinformación que un referendo binario sobre 280 páginas. Su déficit: puede percibirse como ' +
          '"paz de élites" — por eso la pedagogía masiva no es opcional. Tras el No de 2016, Colombia ' +
          'renegoció el texto y lo refrendó vía Congreso.',
        codex: ['refrendacion', 'pedagogia-paz'],
      },
      {
        texto: 'Plebiscito nacional: que la ciudadanía apruebe o rechace el acuerdo en las urnas.',
        efectos: { legitimidad: +3, confianza: -8 },
        retro:
          'Someter un acuerdo complejo a un Sí/No lo convierte en plebiscito sobre el gobierno de turno, ' +
          'los odios acumulados y las noticias falsas. Colombia 2016 y el Brexit son advertencias gemelas: ' +
          'la pregunta que se vota nunca es la pregunta de la papeleta. Si se elige esta vía, exige meses ' +
          'de pedagogía y un plan B explícito para el No — nadie lo tenía en 2016.',
        codex: ['refrendacion'],
      },
      {
        texto: 'Firma directa entre las partes, sin mecanismo de refrendación.',
        efectos: { confianza: +4, legitimidad: -10 },
        retro:
          'Un acuerdo sin refrendación queda jurídica y políticamente desnudo: el siguiente gobierno puede ' +
          'desconocerlo alegando que "nadie lo votó". La refrendación no es un trámite — es el mecanismo ' +
          'que convierte un pacto entre enemigos en una política de Estado que sobrevive elecciones.',
        codex: ['refrendacion'],
      },
    ],
    siguiente: 'pedagogia-nodo',
  },
  {
    id: 'pedagogia-nodo',
    fase: 3,
    titulo: 'Explicar la paz',
    texto:
      'Estudios de opinión revelan que el 70% de la ciudadanía no sabe qué contiene el acuerdo, y ' +
      'circulan versiones falsas ("expropiarán las casas", "habrá impunidad total"). Queda poco ' +
      'presupuesto de comunicación.',
    opciones: [
      {
        texto: 'Pedagogía territorial: versiones simples del acuerdo, líderes comunitarios formados, radio local, y espacios cara a cara.',
        efectos: { legitimidad: +10, justicia: +3 },
        retro:
          'La desinformación se combate con cercanía, no solo con datos: la gente cree en quien conoce. ' +
          'Los formatos ganadores son resúmenes en lenguaje claro, emisoras comunitarias y conversaciones ' +
          'presenciales donde la gente pregunta lo que le da miedo preguntar. La pedagogía de paz es al ' +
          'acuerdo lo que la vacunación a la epidemia: lenta, masiva y vital. (Este juego es, de hecho, ' +
          'un ejercicio de pedagogía de paz.)',
        codex: ['pedagogia-paz'],
      },
      {
        texto: 'Campaña masiva en medios nacionales con celebridades y piezas publicitarias emotivas.',
        efectos: { legitimidad: +3 },
        retro:
          'La publicidad llega lejos pero convence poco en temas donde el miedo manda: una pauta no ' +
          'responde la pregunta concreta de un campesino sobre su tierra. En 2016, la campaña del No ' +
          'reconoció abiertamente haber apostado a la indignación segmentada por audiencias — y derrotó ' +
          'a la publicidad institucional del Sí. La emoción se disputa cara a cara.',
        codex: ['pedagogia-paz'],
      },
      {
        texto: 'Confiar en que el texto "hable por sí mismo": publicarlo íntegro y esperar.',
        efectos: { legitimidad: -8 },
        retro:
          'Nadie lee 280 páginas, pero todos escuchan un rumor. El vacío de explicación no queda vacío: ' +
          'lo llena el adversario. Todo acuerdo de paz compite contra su caricatura, y la caricatura ' +
          'gana por goleada si nadie la disputa.',
        codex: ['pedagogia-paz'],
      },
    ],
    siguiente: 'implementacion-nodo',
  },

  // ───────────────────────── FASE 4: IMPLEMENTACIÓN ─────────────────────────
  {
    id: 'implementacion-nodo',
    fase: 4,
    titulo: 'El día después',
    texto:
      'El acuerdo se firmó. Las cámaras se fueron. Ahora vienen 15 años de implementación: reformas, ' +
      'reincorporación, justicia transicional en marcha. La historia es ingrata: cerca de la mitad de ' +
      'los acuerdos de paz recaen en violencia en la primera década. Hay que diseñar el seguimiento.',
    opciones: [
      {
        texto: 'Comisión de seguimiento con las partes + verificación internacional + presupuesto plurianual protegido por ley.',
        efectos: { seguridad: +8, confianza: +6, legitimidad: +5 },
        retro:
          'Los acuerdos no se cumplen solos: necesitan instituciones que midan, plata que no dependa del ' +
          'humor fiscal de cada año, y verificadores externos que den fe (en Colombia: la Misión de ' +
          'Verificación de la ONU y el instituto Kroc midiendo cada disposición). Implementar es la fase ' +
          'más larga y menos glamorosa — y donde realmente se gana o se pierde la paz.',
        codex: ['implementacion', 'verificacion'],
      },
      {
        texto: 'Dejar la implementación a los ministerios existentes, sin estructuras nuevas: "para eso está el Estado".',
        efectos: { seguridad: -6, confianza: -8 },
        retro:
          'Las burocracias ordinarias tienen prioridades ordinarias: sin dolientes institucionales ' +
          'específicos, los compromisos del acuerdo compiten —y pierden— contra la agenda del día. ' +
          'Los estudios de implementación comparada muestran que los acuerdos con mecanismos dedicados ' +
          'de seguimiento se cumplen significativamente más.',
        codex: ['implementacion'],
      },
      {
        texto: 'Concentrar todos los recursos en los primeros 2 años para mostrar resultados rápidos.',
        efectos: { legitimidad: +4, seguridad: -5 },
        retro:
          'El "frontloading" produce inauguraciones, pero la paz se juega en el año 8, cuando otro ' +
          'gobierno, sin fotos que ganar, decide si sigue pagando las cuentas del acuerdo que firmó su ' +
          'antecesor. Por eso los buenos acuerdos blindan la implementación por ley y la planifican a ' +
          '10-15 años.',
        codex: ['implementacion'],
      },
    ],
    siguiente: 'proteccion',
  },
  {
    id: 'proteccion',
    fase: 4,
    titulo: 'Proteger a los que firmaron',
    texto:
      'Primer año de implementación: sicarios asesinan a 2 excombatientes en proceso de reincorporación ' +
      'y a una lideresa social que impulsaba el acuerdo en su territorio. El pánico cunde entre los ' +
      'desmovilizados: "firmamos nuestra sentencia de muerte".',
    opciones: [
      {
        texto: 'Programa robusto de garantías de seguridad: protección individual y colectiva, y desmantelamiento de las redes criminales que matan.',
        efectos: { seguridad: +10, confianza: +8 },
        retro:
          'Cada excombatiente asesinado le dice a mil que el Estado no puede protegerlos — el argumento ' +
          'perfecto para rearmarse. El precedente atroz es el exterminio de la Unión Patriótica en ' +
          'Colombia (años 80: miles de militantes desmovilizados asesinados), herida que retrasó la paz ' +
          'una generación. Las garantías de seguridad no son un punto más del acuerdo: son su condición ' +
          'de posibilidad.',
        codex: ['garantias-seguridad', 'ddr'],
      },
      {
        texto: 'Tratar los asesinatos como crimen común y dejar que la policía local los investigue caso a caso.',
        efectos: { seguridad: -10, confianza: -8 },
        retro:
          'Tratar la violencia sistemática como casos aislados garantiza que continúe: nadie investiga ' +
          'el patrón, nadie desmantela la estructura. La violencia contra firmantes y líderes sociales ' +
          'es violencia política contra el acuerdo mismo, y requiere respuesta estatal del mismo nivel.',
        codex: ['garantias-seguridad'],
      },
    ],
    siguiente: undefined,
  },
];

export function obtenerNodo(id: string): Nodo {
  const nodo = NODOS.find((n) => n.id === id);
  if (!nodo) throw new Error(`Nodo no encontrado: ${id}`);
  return nodo;
}
