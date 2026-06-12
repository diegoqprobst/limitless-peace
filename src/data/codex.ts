import type { EntradaCodex } from '../engine/types';

/**
 * EL CÓDEX — la documentación viva del juego.
 * Cada entrada explica un concepto real de construcción de paz, con un caso
 * real y una pregunta para discusión en talleres. Las entradas se "descubren"
 * al jugar, pero todas son consultables desde el menú.
 */
export const CODEX: EntradaCodex[] = [
  {
    id: 'pre-negociacion',
    titulo: 'Pre-negociación y canales secretos',
    categoria: 'Cómo empieza un proceso',
    definicion:
      'La fase exploratoria —usualmente secreta— en la que las partes deciden si negociar, ' +
      'sobre qué, dónde y con qué reglas. Suele ser más determinante que la negociación pública.',
    enLaPractica:
      'Emisarios de confianza, terceros discretos, reuniones en el exterior. El producto típico ' +
      'es un "acuerdo marco" que fija agenda y reglas. Sin esta fase, las mesas públicas nacen ' +
      'sin piso y colapsan ante la primera crisis.',
    casoReal:
      'El proceso colombiano tuvo ~20 meses de encuentros secretos en La Habana (2011-2012) antes ' +
      'del anuncio público. En Irlanda del Norte, el Gobierno británico mantuvo un canal secreto ' +
      'con el IRA durante años mientras públicamente decía "no negociamos con terroristas".',
    paraReflexionar:
      '¿Es legítimo que una democracia negocie en secreto asuntos que afectan a toda la sociedad? ' +
      '¿Qué se gana y qué se pierde?',
  },
  {
    id: 'mediacion',
    titulo: 'Mediación y buenos oficios',
    categoria: 'Cómo empieza un proceso',
    definicion:
      'Intervención de un tercero aceptado por las partes para facilitar la comunicación, proponer ' +
      'fórmulas y acompañar el proceso. El mediador no decide: crea condiciones para que las partes decidan.',
    enLaPractica:
      'Los mediadores transportan mensajes que las partes no pueden decirse de frente, redactan ' +
      'borradores "de nadie" que ambas pueden criticar sin ceder, y absorben crisis. Su capital es ' +
      'la confianza de ambas partes: por eso la imparcialidad no es decorativa, es operativa.',
    casoReal:
      'Noruega ha facilitado procesos en Colombia, Sri Lanka, Filipinas y Oriente Medio (Acuerdos de ' +
      'Oslo). El Centro Henry Dunant y la diplomacia suiza facilitan diálogos discretos en decenas ' +
      'de conflictos.',
    paraReflexionar:
      'Si un mediador amenaza o presiona a una de las partes, ¿qué pierde? ¿En qué se parece la ' +
      'mediación entre Estados a mediar un conflicto entre personas?',
  },
  {
    id: 'garantes',
    titulo: 'Países garantes y acompañantes',
    categoria: 'Cómo empieza un proceso',
    definicion:
      'Estados u organizaciones que dan fe del proceso, custodian los acuerdos parciales y elevan ' +
      'el costo diplomático de incumplir o abandonar la mesa.',
    enLaPractica:
      'Prestan sedes seguras, financian la logística, atestiguan cada acuerdo y median en crisis. ' +
      'Su sola presencia cambia el cálculo: levantarse de la mesa ya no es un desplante bilateral ' +
      'sino un desaire a la comunidad internacional.',
    casoReal:
      'En La Habana: Cuba y Noruega como garantes, Chile y Venezuela como acompañantes. En los ' +
      'acuerdos de Esquipulas (Centroamérica, 1987), el Grupo de Contadora cumplió un rol similar.',
    paraReflexionar:
      '¿Por qué un enemigo confiaría en lo que firma su adversario? ¿Qué mecanismos reemplazan a ' +
      'la confianza cuando no existe?',
  },
  {
    id: 'agenda',
    titulo: 'El diseño de la agenda',
    categoria: 'Cómo empieza un proceso',
    definicion:
      'La lista cerrada de temas que se negociarán y las reglas del juego (confidencialidad, ' +
      'mecánica de acuerdos, vocerías). Define el tamaño del proceso: ni rendición ni refundación del país.',
    enLaPractica:
      'La regla "nada está acordado hasta que todo esté acordado" permite avanzar por puntos sin que ' +
      'lo cedido en uno se use como rehén en otro. Una buena agenda aborda las causas del conflicto ' +
      'sin pretender resolver en la mesa todos los problemas nacionales.',
    casoReal:
      'Contraste colombiano: Caguán (1999) pactó 12 puntos con ~100 subtemas y nunca acordó nada; ' +
      'La Habana (2012) pactó 6 puntos y produjo un acuerdo final en 4 años.',
    paraReflexionar:
      '¿Qué temas pondrías tú en la agenda de paz de un conflicto que conozcas? ¿Cuáles dejarías ' +
      'fuera y por qué?',
  },
  {
    id: 'dih',
    titulo: 'Derecho Internacional Humanitario (DIH)',
    categoria: 'Marco humanitario',
    definicion:
      'El conjunto de normas que limita los medios y métodos de la guerra y protege a quienes no ' +
      'participan (civiles) o dejaron de participar (heridos, detenidos) en las hostilidades. ' +
      'Núcleo: los Convenios de Ginebra de 1949 y sus Protocolos.',
    enLaPractica:
      'Aplica a TODAS las partes de un conflicto, negocien o no: prohíbe atacar civiles, tomar ' +
      'rehenes, usar minas antipersonal, negar acceso humanitario. En un proceso de paz, los acuerdos ' +
      'humanitarios tempranos suelen ser simplemente DIH puesto en práctica.',
    casoReal:
      'Los acuerdos humanitarios del proceso colombiano (desminado conjunto, liberaciones, búsqueda ' +
      'de desaparecidos) se construyeron sobre obligaciones de DIH preexistentes, con el CICR como ' +
      'intermediario neutral en muchas operaciones.',
    paraReflexionar:
      'Si la guerra de todos modos causa sufrimiento, ¿por qué importa que tenga reglas? ¿Qué pasaría ' +
      'sin ellas?',
  },
  {
    id: 'principios-humanitarios',
    titulo: 'Los Principios Fundamentales del Movimiento',
    categoria: 'Marco humanitario',
    definicion:
      'Los 7 principios del Movimiento Internacional de la Cruz Roja y de la Media Luna Roja: ' +
      'humanidad, imparcialidad, neutralidad, independencia, voluntariado, unidad y universalidad.',
    enLaPractica:
      'La neutralidad (no tomar partido en las hostilidades) y la imparcialidad (atender según la ' +
      'necesidad, sin discriminación) no son posturas morales abstractas: son lo que permite cruzar ' +
      'líneas de combate, hablar con todas las partes y ser aceptado por todas. Un actor humanitario ' +
      'que toma partido pierde el acceso — y con él, la capacidad de proteger.',
    casoReal:
      'El CICR ha servido de intermediario neutral en liberaciones de personas en poder de grupos ' +
      'armados en Colombia, Filipinas y decenas de conflictos, precisamente porque todas las partes ' +
      'confían en su neutralidad.',
    paraReflexionar:
      '¿Neutralidad es lo mismo que indiferencia? ¿Cómo se mantiene la neutralidad frente a hechos ' +
      'atroces sin volverse cómplice del silencio?',
  },
  {
    id: 'respuesta-humanitaria',
    titulo: 'La caja de herramientas humanitaria (ERU)',
    categoria: 'Marco humanitario',
    definicion:
      'Las Unidades de Respuesta a Emergencias (ERU) son los módulos estandarizados que la ' +
      'Federación Internacional (IFRC) despliega en crisis: equipos y personal listos para ' +
      'instalar en días lo esencial — salud, agua, alimentos, logística, campamento base.',
    enLaPractica:
      'Los módulos clásicos son: atención básica de salud y hospital de referencia; agua y ' +
      'saneamiento (plantas potabilizadoras que producen agua segura para decenas de miles ' +
      'de personas); distribución de socorro (alimentos y bienes esenciales, entregados con ' +
      'imparcialidad); logística; telecomunicaciones; y el campamento base que sostiene a los ' +
      'equipos. El manual Esfera fija los estándares mínimos: por ejemplo, ~15 litros de agua ' +
      'por persona al día. En el modo Territorio construyes exactamente estas piezas.',
    casoReal:
      'Las ERU de la Cruz Roja se han desplegado en cientos de emergencias: el terremoto de ' +
      'Haití (2010), el tifón Haiyan en Filipinas (2013), el éxodo rohinyá en Bangladesh ' +
      '(2017). En posconflicto, estas capacidades acompañan el retorno de comunidades ' +
      'desplazadas mientras el Estado restablece servicios.',
    paraReflexionar:
      'Si solo pudieras instalar UNA unidad en una comunidad en crisis, ¿cuál elegirías y por ' +
      'qué? ¿Cambia tu respuesta si la crisis es guerra en vez de terremoto?',
  },
  {
    id: 'medidas-confianza',
    titulo: 'Medidas de construcción de confianza',
    categoria: 'Sostener la mesa',
    definicion:
      'Gestos recíprocos, verificables y usualmente simultáneos que demuestran voluntad sin exigir ' +
      'que nadie "ceda primero": liberaciones, desescalada, acuerdos humanitarios parciales.',
    enLaPractica:
      'Resuelven el dilema central entre enemigos: ambos quieren la paz pero ninguno puede arriesgarse ' +
      'a que el otro lo engañe. La simultaneidad y la verificación de terceros reemplazan la confianza ' +
      'que aún no existe. Cada gesto cumplido hace posible el siguiente, más grande.',
    casoReal:
      'El desminado humanitario conjunto de El Orejón (2015): soldados y guerrilleros de las FARC ' +
      'desminando el mismo campo, años antes de la firma. Pequeño en escala, enorme en señal.',
    paraReflexionar:
      'Piensa en un conflicto personal o comunitario: ¿qué "medida de confianza" pequeña y recíproca ' +
      'podría destrabarlo?',
  },
  {
    id: 'cese-fuego',
    titulo: 'Cese al fuego y cese de hostilidades',
    categoria: 'Sostener la mesa',
    definicion:
      'Acuerdo para suspender las acciones ofensivas (cese al fuego) o todas las hostilidades, ' +
      'incluyendo actos contra la población civil (cese de hostilidades). Puede ser unilateral, ' +
      'bilateral, temporal o definitivo.',
    enLaPractica:
      'Su éxito depende menos de la voluntad que del diseño: zonas y conductas definidas con precisión ' +
      'militar, mecanismos para procesar incidentes, y verificación de terceros. Un cese ambiguo genera ' +
      'más crisis que la guerra abierta, porque cada incidente parece traición.',
    casoReal:
      'El cese al fuego bilateral colombiano (2016) tuvo un Mecanismo tripartito de Monitoreo y ' +
      'Verificación (Gobierno-FARC-ONU) y protocolos de decenas de páginas. Sobrevivió a incidentes ' +
      'que habrían destruido un cese informal.',
    paraReflexionar:
      '¿Por qué crees que muchos procesos negocian "en medio del conflicto" en lugar de exigir el ' +
      'silencio de los fusiles primero?',
  },
  {
    id: 'verificacion',
    titulo: 'Monitoreo y verificación',
    categoria: 'Sostener la mesa',
    definicion:
      'Mecanismos —usualmente con terceros imparciales— que comprueban el cumplimiento de lo acordado ' +
      'y procesan los incumplimientos técnica, no políticamente.',
    enLaPractica:
      'Convierten acusaciones ("¡violaron el acuerdo!") en expedientes (qué pasó, quién, qué protocolo ' +
      'aplica). Esto le quita a cada incidente el poder de destruir el proceso entero. Verificar también ' +
      'la implementación de largo plazo, con datos públicos, mantiene la presión sobre los responsables.',
    casoReal:
      'La Misión de Verificación de la ONU en Colombia y el Barómetro del Instituto Kroc (que mide el ' +
      'cumplimiento de cada una de las 578 disposiciones del acuerdo) son referencia mundial.',
    paraReflexionar:
      '"Lo que no se mide, no se cumple." ¿Aplica esto también a los acuerdos cotidianos entre personas?',
  },
  {
    id: 'spoilers',
    titulo: 'Saboteadores (spoilers)',
    categoria: 'Sostener la mesa',
    definicion:
      'Actores que perciben la paz como amenaza a su poder, ideología o economía, y actúan para ' +
      'descarrilarla — desde adentro o desde afuera de la mesa, con violencia o con política.',
    enLaPractica:
      'La teoría (Stedman, 1997) distingue spoilers limitados (quieren un acuerdo distinto), ' +
      'codiciosos (quieren más) y totales (no quieren acuerdo). Cada tipo exige estrategia distinta: ' +
      'incorporar, negociar o aislar. El error fatal es tratar a todo crítico como spoiler total — ' +
      'o a un spoiler total como crítico de buena fe.',
    casoReal:
      'El asesinato de Yitzhak Rabin (1995) por un extremista israelí opuesto a Oslo, y los atentados ' +
      'del "IRA Real" tras el Acuerdo de Viernes Santo, muestran que los extremos de ambos bandos ' +
      'se alían objetivamente contra el centro.',
    paraReflexionar:
      '¿Quién pierde con la paz? Identificarlo en cualquier conflicto explica buena parte de su persistencia.',
  },
  {
    id: 'victimas',
    titulo: 'Centralidad de las víctimas',
    categoria: 'El corazón del acuerdo',
    definicion:
      'Principio según el cual los derechos de las víctimas —verdad, justicia, reparación y no ' +
      'repetición— son el eje del acuerdo, no un capítulo accesorio.',
    enLaPractica:
      'Se concreta en participación directa (audiencias, delegaciones a la mesa), en el diseño de los ' +
      'mecanismos de justicia transicional y en programas de reparación. Las víctimas suelen ser, ' +
      'contra todo estereotipo, el sector MÁS dispuesto a la reconciliación — más que las élites ' +
      'políticas que hablan en su nombre.',
    casoReal:
      'Las 5 delegaciones de víctimas que viajaron a La Habana (2014) cambiaron el tono de la ' +
      'negociación. El acuerdo resultante creó un sistema integral (JEP, Comisión de la Verdad, ' +
      'Unidad de Búsqueda) construido alrededor de sus derechos.',
    paraReflexionar:
      '¿Por qué crees que las víctimas directas suelen apoyar los procesos de paz más que quienes ' +
      'vivieron la guerra por televisión?',
  },
  {
    id: 'justicia-transicional',
    titulo: 'Justicia transicional',
    categoria: 'El corazón del acuerdo',
    definicion:
      'El conjunto de mecanismos judiciales y extrajudiciales con que una sociedad procesa crímenes ' +
      'masivos al salir de una guerra o dictadura: tribunales especiales, comisiones de la verdad, ' +
      'reparaciones y reformas de no repetición.',
    enLaPractica:
      'Su dilema fundacional: la justicia ordinaria plena haría imposible la paz (nadie negocia su ' +
      'cárcel), y la impunidad total haría indigna la paz (y viola el derecho internacional). Las ' +
      'fórmulas restaurativas —sanción reducida a cambio de verdad plena y reparación— habitan ese ' +
      'estrecho espacio intermedio.',
    casoReal:
      'La Jurisdicción Especial para la Paz (Colombia): amnistía para delitos políticos, sanciones ' +
      'restaurativas de 5-8 años para crímenes graves confesados, hasta 20 de cárcel para quien niegue ' +
      'y sea vencido en juicio. Imperfecta y atacada por ambos extremos — como casi toda fórmula viable.',
    paraReflexionar:
      '¿Cuánta justicia estás dispuesto a intercambiar por cuánta paz? ¿Quién tiene derecho a decidir ' +
      'ese intercambio: las víctimas, la sociedad, los jueces?',
  },
  {
    id: 'amnistias',
    titulo: 'Amnistías: usos y límites',
    categoria: 'El corazón del acuerdo',
    definicion:
      'Perdón jurídico de ciertos delitos. Históricamente la herramienta estándar de los finales de ' +
      'guerra; hoy el derecho internacional la prohíbe para crímenes de guerra, lesa humanidad y genocidio.',
    enLaPractica:
      'Sigue siendo legítima (y necesaria) para el delito político y conexos —la rebelión misma—, ' +
      'pues sin ella ningún insurgente podría reincorporarse. La línea roja contemporánea: los ' +
      'crímenes atroces deben tener verdad y sanción, aunque sea restaurativa.',
    casoReal:
      'Las autoamnistías del Cono Sur (Argentina 1983, Chile 1978) fueron anuladas décadas después ' +
      'por tribunales nacionales e internacionales: la impunidad pactada no dio la seguridad jurídica ' +
      'que prometía. La amnistía sudafricana fue condicional: verdad completa a cambio de perdón, ' +
      'caso por caso.',
    paraReflexionar:
      '¿Puede una sociedad "perdonar" en nombre de las víctimas? ¿Qué diferencia una amnistía que ' +
      'construye paz de una que compra silencio?',
  },
  {
    id: 'comision-verdad',
    titulo: 'Comisiones de la verdad',
    categoria: 'El corazón del acuerdo',
    definicion:
      'Órganos temporales, usualmente extrajudiciales, que investigan patrones de violencia, escuchan ' +
      'a las víctimas y producen un relato documentado de lo ocurrido, con recomendaciones de no repetición.',
    enLaPractica:
      'No reemplazan a los jueces: los complementan. Su producto no es una sentencia sino un espejo — ' +
      'el reconocimiento público de lo que pasó. La separación de lo judicial (lo confesado ante la ' +
      'comisión no sirve como prueba en juicio) incentiva verdades que ningún tribunal obtendría.',
    casoReal:
      'Sudáfrica (1996-1998, presidida por Desmond Tutu, con audiencias públicas televisadas), ' +
      'Guatemala (CEH, 1999, que documentó actos de genocidio), Perú (CVR, 2003), ' +
      'Colombia (2018-2022, informe final "Hay futuro si hay verdad").',
    paraReflexionar:
      '¿Para qué sirve la verdad sin cárcel? ¿Y la cárcel sin verdad? ¿Cuál de las dos repara más a ' +
      'una familia que busca a un desaparecido?',
  },
  {
    id: 'memoria',
    titulo: 'Memoria histórica',
    categoria: 'El corazón del acuerdo',
    definicion:
      'El trabajo social e institucional de recordar el conflicto: museos, archivos, conmemoraciones, ' +
      'pedagogía escolar. Lo contrario del "pacto de olvido".',
    enLaPractica:
      'La memoria no es venganza ni nostalgia: es la vacuna narrativa contra la repetición. Las ' +
      'sociedades que no procesan su pasado lo heredan intacto a la siguiente generación, lista para ' +
      'reutilizarlo como combustible.',
    casoReal:
      'El Centro Nacional de Memoria Histórica de Colombia y su informe "¡Basta Ya!" (2013); los ' +
      'memoriales de Ruanda; el contraste alemán (memoria activa del nazismo) versus el largo silencio ' +
      'español sobre la Guerra Civil.',
    paraReflexionar:
      '"Recordar para no repetir" — ¿conoces casos donde la memoria se haya usado, al revés, para ' +
      'mantener vivo el odio? ¿Qué diferencia una memoria que sana de una que inflama?',
  },
  {
    id: 'ddr',
    titulo: 'DDR: Desarme, Desmovilización y Reintegración',
    categoria: 'Del fusil a la vida civil',
    definicion:
      'El proceso por el cual los combatientes entregan las armas (desarme), abandonan la estructura ' +
      'militar (desmovilización) y construyen una vida civil sostenible (reintegración).',
    enLaPractica:
      'El desarme es un evento logístico; la reintegración es una transformación de años: ingresos, ' +
      'salud mental, educación, aceptación comunitaria. Los programas que la descuidan producen ' +
      'reincidencia y nuevos grupos armados. La secuencia importa: los desarmes graduales y ' +
      'verificados funcionan mejor que las entregas-espectáculo.',
    casoReal:
      'En Irlanda del Norte el desarme del IRA tomó 7 años tras el acuerdo. En Colombia, la ONU ' +
      'verificó la dejación de ~9.000 armas en 2017; los retrasos en la R (tierra, proyectos ' +
      'productivos, seguridad) siguen siendo el flanco débil.',
    paraReflexionar:
      'Si fueras un combatiente de 35 años que entró a la guerra a los 15, ¿qué necesitarías para ' +
      'no volver? ¿Qué le pedirías al Estado y qué a tu comunidad?',
  },
  {
    id: 'garantias-seguridad',
    titulo: 'Garantías de seguridad',
    categoria: 'Del fusil a la vida civil',
    definicion:
      'Los compromisos y dispositivos que protegen la vida de quienes dejan las armas, de los líderes ' +
      'sociales y de las comunidades, incluyendo el desmantelamiento de las organizaciones que los atacan.',
    enLaPractica:
      'Son la respuesta al miedo más racional de un insurgente: ser exterminado después de desarmarse. ' +
      'Incluyen esquemas de protección, presencia estatal integral en los territorios y unidades ' +
      'especiales de investigación. Su incumplimiento es el predictor más directo de rearme.',
    casoReal:
      'El exterminio de la Unión Patriótica (Colombia, años 80-90: miles de exguerrilleros amnistiados ' +
      'y militantes asesinados tras desmovilizarse) volvió la desconfianza estructural: explica por qué ' +
      'las FARC negociaron 30 años después con tanto énfasis en garantías.',
    paraReflexionar:
      '¿Qué pasa con un proceso de paz cuando matan a los que firmaron? ¿Quién gana con cada uno de ' +
      'esos asesinatos?',
  },
  {
    id: 'genero',
    titulo: 'Enfoque de género en los acuerdos',
    categoria: 'Una paz para toda la sociedad',
    definicion:
      'El análisis y las medidas que reconocen que el conflicto afecta de forma diferenciada a mujeres, ' +
      'hombres y personas LGBTIQ+, y que la paz debe responder a esas diferencias para ser completa.',
    enLaPractica:
      'Va de la participación (mujeres en las delegaciones y mecanismos) al contenido (medidas sobre ' +
      'violencia sexual, acceso a tierra, economía del cuidado). Marco internacional: Resolución 1325 ' +
      'del Consejo de Seguridad (2000) y la agenda Mujeres, Paz y Seguridad.',
    casoReal:
      'La Subcomisión de Género de La Habana (2014-2016) revisó todo el acuerdo: ~130 medidas con ' +
      'enfoque de género. Estudios cuantitativos asocian la participación significativa de mujeres ' +
      'con acuerdos más duraderos.',
    paraReflexionar:
      'Si la guerra golpea distinto, ¿puede la paz ser idéntica para todos? ¿Qué grupos de tu propia ' +
      'comunidad vivirían "la misma" crisis de formas muy diferentes?',
  },
  {
    id: 'participacion',
    titulo: 'Participación de la sociedad civil',
    categoria: 'Una paz para toda la sociedad',
    definicion:
      'Los mecanismos por los cuales la ciudadanía —víctimas, comunidades, iglesias, academia, ' +
      'empresarios, jóvenes— incide en la negociación y en la implementación.',
    enLaPractica:
      'Foros temáticos, mesas regionales, audiencias, miles de propuestas escritas. La participación ' +
      'no le quita eficacia a la mesa: le da raíces. Los acuerdos "de élites", sin apropiación social, ' +
      'dependen de la suerte electoral de sus firmantes.',
    casoReal:
      'Los foros temáticos que alimentaron cada punto de la agenda en Colombia; el proceso ' +
      'constitucional sudafricano, con millones de aportes ciudadanos, sigue siendo el estándar de oro.',
    paraReflexionar:
      '¿La paz se firma o se construye? ¿Qué papel concreto puede jugar una persona joven voluntaria ' +
      'en un proceso de paz?',
  },
  {
    id: 'refrendacion',
    titulo: 'Refrendación de los acuerdos',
    categoria: 'Del papel al pacto social',
    definicion:
      'El mecanismo por el cual un acuerdo negociado entre las partes adquiere respaldo político y ' +
      'jurídico más amplio: plebiscito, aprobación legislativa, asamblea constituyente o combinaciones.',
    enLaPractica:
      'Es un trade-off: el plebiscito da la legitimidad más fuerte pero arriesga todo a un Sí/No ' +
      'vulnerable a la desinformación y al clima político del momento. La vía legislativa es más ' +
      'segura pero puede leerse como elitista. En ambos casos, sin pedagogía masiva no hay refrendación sana.',
    casoReal:
      'Colombia 2016: el plebiscito perdió 50,2% a 49,8% con 63% de abstención; el acuerdo se renegoció ' +
      'y refrendó vía Congreso. Irlanda del Norte 1998: referendos simultáneos en las dos Irlandas ' +
      'aprobaron el Acuerdo de Viernes Santo con 71% y 94% — precedidos de intensa pedagogía.',
    paraReflexionar:
      '¿Debe un acuerdo de paz someterse a votación popular? ¿Qué pasa si la mayoría vota No a la paz ' +
      'negociada — y qué dice eso sobre cómo se comunicó?',
  },
  {
    id: 'pedagogia-paz',
    titulo: 'Pedagogía de paz',
    categoria: 'Del papel al pacto social',
    definicion:
      'El esfuerzo deliberado y masivo de explicar qué contiene un acuerdo, qué no contiene, y cómo ' +
      'afecta la vida cotidiana — disputándole el terreno a la desinformación.',
    enLaPractica:
      'Versiones del acuerdo en lenguaje claro, formación de multiplicadores comunitarios, radio local, ' +
      'conversaciones cara a cara, juegos y simulaciones (como este). La regla: el vacío de explicación ' +
      'siempre lo llena el adversario, y todo acuerdo compite contra su caricatura.',
    casoReal:
      'Tras el No de 2016, Colombia multiplicó la pedagogía territorial del acuerdo renegociado. ' +
      'En Irlanda del Norte, el texto completo del acuerdo se envió a cada hogar antes del referendo.',
    paraReflexionar:
      'Este juego es un ejercicio de pedagogía de paz. ¿Qué concepto te cambió la forma de pensar? ' +
      '¿Cómo se lo explicarías a alguien en 2 minutos?',
  },
  {
    id: 'implementacion',
    titulo: 'Implementación: la década decisiva',
    categoria: 'Del papel al pacto social',
    definicion:
      'La fase —de 10 a 15 años— en que lo firmado se convierte (o no) en reformas, instituciones y ' +
      'cambios reales. Cerca de la mitad de los acuerdos de paz recaen en violencia en la primera década.',
    enLaPractica:
      'Exige instituciones dedicadas, presupuesto plurianual protegido por ley, verificación externa ' +
      'con datos públicos, y sobre todo continuidad a través de gobiernos que no firmaron el acuerdo ' +
      'y pueden querer enterrarlo. La paz se gana en el año 8, no en la foto de la firma.',
    casoReal:
      'El Barómetro del Instituto Kroc mide cada disposición del acuerdo colombiano desde 2016: la ' +
      'implementación avanza de forma desigual — alta en desarme, rezagada en reforma rural y garantías ' +
      'de seguridad. Guatemala muestra el contraejemplo: acuerdos ambiciosos (1996) ampliamente incumplidos.',
    paraReflexionar:
      '¿Por qué es más fácil firmar la paz que cumplirla? ¿Qué puede hacer la ciudadanía durante los ' +
      '15 años de implementación?',
  },
];

export function obtenerEntradaCodex(id: string): EntradaCodex | undefined {
  return CODEX.find((e) => e.id === id);
}

export const CATEGORIAS_CODEX = [...new Set(CODEX.map((e) => e.categoria))];
