/**
 * EL JARDÍN DE LA MEMORIA — historias reales de artesanos de la paz.
 *
 * A diferencia de los niveles jugables (ficción), estas son historias
 * verdaderas, contadas con respeto y documentadas en docs/fuentes.md.
 * Las citas directas solo se incluyen cuando están bien documentadas.
 */

export interface Historia {
  id: string;
  /** Persona(s) protagonista(s). */
  nombre: string;
  /** Título literario de la historia. */
  titulo: string;
  /** Proceso y años. */
  proceso: string;
  parrafos: string[];
  cita?: { texto: string; autor: string };
  /** Lo que esta historia enseña sobre construir la paz. */
  leccion: string;
  /** Entradas del códex relacionadas. */
  codex: string[];
  /** Foto con licencia libre (Wikimedia Commons). */
  imagen?: { url: string; credito: string };
  /** Para profundizar: biografías, archivos, sitios oficiales. */
  enlaces: { titulo: string; url: string }[];
}

export const HISTORIAS: Historia[] = [
  {
    id: 'rabin',
    nombre: 'Yitzhak Rabin',
    titulo: 'El general que eligió la paz',
    proceso: 'Israel · Acuerdos de Oslo · 1993–1995',
    parrafos: [
      'Pocos hombres conocieron la guerra tan de cerca como Yitzhak Rabin. Soldado desde los ' +
        'veinte años, jefe del ejército israelí en la Guerra de los Seis Días, ministro de ' +
        'Defensa durante la primera Intifada: su biografía era la biografía militar de su país. ' +
        'Nadie podía acusarlo de ingenuo, de débil, de no entender al enemigo. Quizás por eso ' +
        'fue él quien pudo hacer lo impensable.',
      'En 1993, siendo primer ministro, Rabin firmó los Acuerdos de Oslo con la OLP de Yasser ' +
        'Arafat — la organización contra la que había combatido toda su vida. La foto del ' +
        'apretón de manos en la Casa Blanca le dio la vuelta al mundo: se nota, si la miras, ' +
        'cuánto le cuesta. Vino el Nobel de la Paz, y vinieron también los pactos siguientes: ' +
        'pacto tras pacto, contra una oposición interna cada vez más feroz que lo llamaba traidor.',
      'El 4 de noviembre de 1995, al salir de un acto multitudinario por la paz en Tel Aviv, ' +
        'un extremista judío opuesto a los acuerdos le disparó por la espalda. En el bolsillo ' +
        'de Rabin encontraron, manchada de sangre, la hoja con la letra de la "Canción de la ' +
        'Paz" que acababa de cantar en la tarima. No lo mató el enemigo contra el que guerreó ' +
        'toda su vida: lo mató alguien de su propio pueblo que no le perdonó hacer la paz.',
    ],
    cita: {
      texto: 'La paz no se hace con los amigos. La paz se hace con enemigos muy desagradables.',
      autor: 'Yitzhak Rabin',
    },
    leccion:
      'Dos lecciones a la vez: los pacificadores más creíbles suelen venir de la guerra, porque ' +
      'nadie conoce su precio mejor que ellos. Y los enemigos más letales de la paz no siempre ' +
      'están al otro lado de la frontera — a menudo están en casa. Por eso en el juego los ' +
      'saboteadores son una mecánica, no un accidente.',
    codex: ['spoilers', 'pre-negociacion'],
    imagen: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Flickr_-_Israel_Defense_Forces_-_Life_of_Lt._Gen._Yitzhak_Rabin%2C_7th_IDF_Chief_of_Staff_in_photos_%2811%29.jpg/330px-Flickr_-_Israel_Defense_Forces_-_Life_of_Lt._Gen._Yitzhak_Rabin%2C_7th_IDF_Chief_of_Staff_in_photos_%2811%29.jpg',
      credito: 'Foto: IDF / Wikimedia Commons',
    },
    enlaces: [
      { titulo: 'Biografía — Wikipedia', url: 'https://es.wikipedia.org/wiki/Isaac_Rabin' },
      { titulo: 'Premio Nobel de la Paz 1994', url: 'https://www.nobelprize.org/prizes/peace/1994/rabin/facts/' },
      { titulo: 'Los Acuerdos de Oslo — Wikipedia', url: 'https://es.wikipedia.org/wiki/Acuerdos_de_Oslo' },
    ],
  },
  {
    id: 'mandela',
    nombre: 'Nelson Mandela',
    titulo: 'El prisionero que negoció con su carcelero',
    proceso: 'Sudáfrica · Fin del apartheid · 1990–1994',
    parrafos: [
      'Veintisiete años preso. Picando piedra en una cantera al sol, viendo morir amigos, ' +
        'perdiéndose el funeral de su madre y de su hijo. Si alguien tenía derecho al odio era ' +
        'Nelson Mandela. En vez de eso, en la celda aprendió afrikáans — el idioma de sus ' +
        'carceleros — para entender cómo pensaban, qué temían, qué los haría sentarse a negociar.',
      'Desde la cárcel inició conversaciones secretas con el gobierno que lo había encerrado. ' +
        'Cuando salió libre en 1990, con el país al borde de la guerra civil, sorprendió a ' +
        'todos: no pidió venganza sino elecciones. Negoció con F.W. de Klerk una transición que ' +
        'a cada paso pudo descarrilar — masacres, saboteadores armados, su propia gente ' +
        'pidiéndole mano dura. Compartieron el Nobel en 1993, sin ser nunca amigos.',
      'Como presidente, vistió la camiseta de los Springboks — el equipo de rugby símbolo de ' +
        'los blancos — en la final del Mundial de 1995, y un estadio que diez años antes lo ' +
        'consideraba terrorista coreó su nombre. No fue un gesto sentimental: fue estrategia ' +
        'pura. Mandela entendió que una paz sin los antiguos enemigos adentro es solo una ' +
        'tregua con fecha de vencimiento.',
    ],
    cita: {
      texto:
        'Si quieres hacer la paz con tu enemigo, tienes que trabajar con tu enemigo. ' +
        'Entonces se convierte en tu socio.',
      autor: 'Nelson Mandela',
    },
    leccion:
      'La reconciliación no es blandura: es la estrategia más exigente que existe. Requiere ' +
      'entender al adversario mejor de lo que él se entiende, y construir un futuro donde ' +
      'quepa — porque el que no cabe, conspira.',
    codex: ['comision-verdad', 'medidas-confianza'],
    imagen: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Nelson_Mandela_1994_%282%29.jpg/330px-Nelson_Mandela_1994_%282%29.jpg',
      credito: 'Foto: Wikimedia Commons',
    },
    enlaces: [
      { titulo: 'Biografía — Wikipedia', url: 'https://es.wikipedia.org/wiki/Nelson_Mandela' },
      { titulo: 'Premio Nobel de la Paz 1993', url: 'https://www.nobelprize.org/prizes/peace/1993/mandela/facts/' },
      { titulo: 'Fundación Nelson Mandela', url: 'https://www.nelsonmandela.org/' },
    ],
  },
  {
    id: 'hume',
    nombre: 'John Hume',
    titulo: 'El maestro que hablaba con todos',
    proceso: 'Irlanda del Norte · Acuerdo de Viernes Santo · 1968–1998',
    parrafos: [
      'John Hume era un maestro de escuela de Derry que repetía una idea simple en un país ' +
        'donde la simpleza no existía: la división real no es entre católicos y protestantes, ' +
        'sino entre quienes creen en la violencia y quienes no. Durante treinta años de ' +
        '"Troubles" — bombas, francotiradores, huelgas de hambre — insistió en lo mismo: hay ' +
        'que hablar. Con todos. Especialmente con los que disparan.',
      'En los años 80 hizo lo que era un suicidio político: reunirse en secreto con Gerry ' +
        'Adams, líder del brazo político del IRA, mientras la prensa lo crucificaba por ' +
        '"darle respetabilidad a los terroristas". Esas conversaciones, despreciadas en su ' +
        'momento, abrieron el canal que años después desembocó en el alto el fuego del IRA ' +
        'y en la mesa de negociación de la que salió el Acuerdo de Viernes Santo en 1998.',
      'Compartió el Nobel con David Trimble, su adversario unionista. Cuando murió en 2020, ' +
        'lo lloraron ambos bandos — el privilegio más raro de Irlanda del Norte. Su método ' +
        'cabe en una frase que les decía a los jóvenes: la paz no es un documento, es un ' +
        'proceso de curar relaciones rotas, y nadie cura nada sin hablar con el que lo hirió.',
    ],
    cita: {
      texto: 'No puedes comerte una bandera.',
      autor: 'John Hume, sobre anteponer el bienestar de la gente a los símbolos',
    },
    leccion:
      'Hablar con el enemigo no es traición: es el trabajo. Los canales secretos que hoy ' +
      'parecen vergonzosos son los que mañana parecen visionarios — el juego te hace tomar ' +
      'esa misma decisión en la primera jugada de La Mesa.',
    codex: ['pre-negociacion', 'mediacion'],
    imagen: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/John_Hume_2008.jpg/330px-John_Hume_2008.jpg',
      credito: 'Foto: Wikimedia Commons',
    },
    enlaces: [
      { titulo: 'Biografía — Wikipedia', url: 'https://es.wikipedia.org/wiki/John_Hume' },
      { titulo: 'Premio Nobel de la Paz 1998', url: 'https://www.nobelprize.org/prizes/peace/1998/hume/facts/' },
      { titulo: 'El Acuerdo de Viernes Santo — Wikipedia', url: 'https://es.wikipedia.org/wiki/Acuerdo_de_Viernes_Santo' },
    ],
  },
  {
    id: 'bigombe',
    nombre: 'Betty Bigombe',
    titulo: 'La mujer que caminó hacia la selva',
    proceso: 'Uganda · Mediación con el LRA · 1988–2005',
    parrafos: [
      'Cuando el gobierno de Uganda la nombró ministra para "pacificar el norte", Betty ' +
        'Bigombe entendió algo que sus colegas no: no se puede pacificar por decreto a un ' +
        'enemigo que no conoces. Así que hizo lo que nadie había intentado — caminar hacia la ' +
        'selva, sin escolta militar, a buscar al Ejército de Resistencia del Señor de Joseph ' +
        'Kony, uno de los grupos armados más brutales del mundo, conocido por secuestrar ' +
        'niños y convertirlos en soldados.',
      'Organizó los primeros encuentros cara a cara entre el gobierno y el LRA. En 1994 ' +
        'estuvo a días de lograr un acuerdo de paz que se frustró por ultimátums políticos ' +
        'de última hora — una lección amarga sobre cómo los plazos impuestos desde afuera ' +
        'matan procesos que necesitan tiempo. Una década después, ya sin cargo oficial, ' +
        'gastó sus propios ahorros para volver a mediar, porque las madres de los niños ' +
        'secuestrados seguían llamándola a ella.',
      'No hubo foto final ni Nobel: el LRA se desintegró lentamente, empujado por la presión ' +
        'militar y por las puertas que la mediación de Bigombe abrió para las deserciones y ' +
        'el retorno de los secuestrados. Su historia enseña la cara menos glamorosa de la paz: ' +
        'la del esfuerzo que no culmina en ceremonia, pero salva vidas igual.',
    ],
    leccion:
      'La mediación es coraje físico más paciencia infinita — y a veces el éxito no es el ' +
      'acuerdo, sino cada persona que vuelve viva. La Resolución 1325 de la ONU reconoce lo ' +
      'que Bigombe encarnó: sin mujeres en las mesas, la paz pierde a sus mejores artesanas.',
    codex: ['mediacion', 'genero'],
    imagen: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Bigombe_Betty_Atuku.jpg/330px-Bigombe_Betty_Atuku.jpg',
      credito: 'Foto: Wikimedia Commons',
    },
    enlaces: [
      { titulo: 'Biografía — Wikipedia (EN)', url: 'https://en.wikipedia.org/wiki/Betty_Bigombe' },
      { titulo: 'Mujeres, Paz y Seguridad — ONU (Res. 1325)', url: 'https://www.un.org/securitycouncil/es/content/resolutions-0' },
    ],
  },
  {
    id: 'victimas-habana',
    nombre: 'Las víctimas que viajaron a La Habana',
    titulo: 'Sesenta personas frente a sus victimarios',
    proceso: 'Colombia · Proceso de paz Gobierno–FARC · 2014',
    parrafos: [
      'En agosto de 2014 ocurrió algo que ninguna mesa de paz había hecho antes a esa escala: ' +
        'sesenta víctimas del conflicto colombiano — campesinos, indígenas, militares ' +
        'secuestrados, familiares de desaparecidos, sobrevivientes de masacres de TODOS los ' +
        'bandos — viajaron a La Habana a sentarse frente a los negociadores del gobierno y de ' +
        'las FARC. No como decoración: a hablar, a exigir, a mirar a los ojos.',
      'Los negociadores, curtidos en años de guerra y de política, salieron de esas sesiones ' +
        'transformados. Guerrilleros que justificaban medio siglo de lucha escucharon a una ' +
        'mujer contar cómo perdió a toda su familia. Generales escucharon a víctimas del ' +
        'Estado. Varias víctimas, contra todo pronóstico, hablaron menos de castigo que de ' +
        'verdad, de tierra, de que nadie más viviera lo suyo. Pidieron más paz, no más guerra.',
      'De esos encuentros nació el corazón del acuerdo: el sistema de verdad, justicia, ' +
        'reparación y no repetición. Y quedó demostrada la paradoja que la investigación ' +
        'comparada confirma una y otra vez: las víctimas directas suelen estar más dispuestas ' +
        'a la reconciliación que quienes vivieron la guerra por televisión.',
    ],
    leccion:
      'Poner a las víctimas en el centro no es un gesto moral: cambia materialmente lo que ' +
      'se firma. Un acuerdo construido sobre su dolor sin su voz nace hueco; uno construido ' +
      'con su voz nace anclado. En el juego, esa decisión — abrirles la mesa o no — es de ' +
      'las que más mueve el destino del proceso.',
    codex: ['victimas', 'justicia-transicional'],
    enlaces: [
      { titulo: 'Los diálogos de La Habana — Wikipedia', url: 'https://es.wikipedia.org/wiki/Di%C3%A1logos_de_paz_entre_el_gobierno_de_Santos_y_las_FARC-EP' },
      { titulo: 'Comisión de la Verdad de Colombia', url: 'https://web.comisiondelaverdad.co/' },
      { titulo: 'Jurisdicción Especial para la Paz (JEP)', url: 'https://www.jep.gov.co/' },
    ],
  },
  {
    id: 'berry-magee',
    nombre: 'Jo Berry y Pat Magee',
    titulo: 'La hija y el hombre de la bomba',
    proceso: 'Reino Unido / Irlanda del Norte · después del atentado de Brighton · 1984–hoy',
    parrafos: [
      'En 1984, una bomba del IRA destruyó el hotel de Brighton donde se hospedaba el ' +
        'gobierno británico. Entre los muertos estaba Sir Anthony Berry, padre de Jo Berry. ' +
        'Ella tenía 27 años. En medio del duelo tomó una decisión que desconcertó a todos: ' +
        'en vez de dedicar su vida a odiar al hombre que puso la bomba, la dedicaría a ' +
        'entender cómo alguien llega a poner una bomba.',
      'Pat Magee cumplió catorce años de cárcel por el atentado y salió libre por el Acuerdo ' +
        'de Viernes Santo — una de esas liberaciones dolorosas que los procesos de paz exigen. ' +
        'En el año 2000, Jo pidió conocerlo. El primer encuentro duró tres horas: ella no fue ' +
        'a perdonar ni él a justificarse; fueron a escucharse. Magee dijo después que conocer ' +
        'a Jo le quitó lo que ninguna condena le había quitado: la posibilidad de seguir ' +
        'viendo a sus víctimas como abstracciones.',
      'Desde entonces han compartido cientos de conversaciones públicas en escuelas, cárceles ' +
        'y zonas de conflicto de todo el mundo, sentados lado a lado: la hija de la víctima y ' +
        'el hombre que puso la bomba, demostrando en vivo que la reconciliación no es un ' +
        'concepto — es una práctica incómoda, voluntaria y transformadora entre personas ' +
        'concretas.',
    ],
    leccion:
      'Los acuerdos se firman entre delegaciones, pero la reconciliación ocurre a escala ' +
      'humana: una conversación a la vez. Esta es la versión persona-a-persona de lo que el ' +
      'modo Territorio simula a escala de aldea: el tejido se repara hilo por hilo.',
    codex: ['memoria', 'victimas'],
    imagen: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Patrick_Magee_-_Brighton_Bomber_%26_Jo_Berry_whose_father_was_killed_in_the_bomb.jpg/330px-Patrick_Magee_-_Brighton_Bomber_%26_Jo_Berry_whose_father_was_killed_in_the_bomb.jpg',
      credito: 'Foto: Wikimedia Commons — Jo Berry y Pat Magee, juntos',
    },
    enlaces: [
      { titulo: 'Building Bridges for Peace (organización de Jo Berry)', url: 'https://www.buildingbridgesforpeace.org/' },
      { titulo: 'El atentado de Brighton — Wikipedia (EN)', url: 'https://en.wikipedia.org/wiki/Brighton_hotel_bombing' },
    ],
  },
];
