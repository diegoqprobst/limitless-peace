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
      condicion: (ind, ctx) => ind.seguridad < ctx.umbralIncursion && ctx.mes >= 3,
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
      // Cadena lógica: aluvión (mes 5) + sin planta potabilizadora → brote.
      // Construir agua a tiempo PREVIENE este evento por completo.
      id: 'brote',
      condicion: (_ind, ctx) => ctx.vistos.includes('lluvias') && !ctx.hayAgua && ctx.mes >= 7,
      titulo: 'El agua que enferma',
      texto:
        'Era predecible y nadie lo previno: tras la creciente, los pozos quedaron contaminados ' +
        'y el valle no tiene planta potabilizadora. Primero fueron los niños — diarreas, ' +
        'fiebre — y ahora hay una fila frente al puesto de salud que le da la vuelta a la plaza.',
      opciones: [
        {
          texto: 'Respuesta de emergencia: agua segura en camiones + campaña de salud, mientras se instala la potabilizadora.',
          efectos: { seguridad: 2, confianza: 3 },
          fondos: -30,
          retro:
            'Caro, tarde — y correcto. La secuencia inundación → agua contaminada → brote es de las ' +
            'más documentadas en la respuesta humanitaria: por eso las ERU de agua y saneamiento se ' +
            'despliegan ANTES de que la gente enferme, no después. El estándar Esfera existe porque ' +
            'esta cadena mata más que muchas balas.',
          codex: ['respuesta-humanitaria'],
        },
        {
          texto: 'Tratar los casos en el puesto de salud y esperar que el brote ceda solo.',
          efectos: { seguridad: -8, confianza: -7, legitimidad: -5 },
          retro:
            'Tratar la enfermedad sin tocar el agua es achicar el bote sin tapar el hueco: el brote ' +
            'se realimenta cada día. En las crisis reales, el agua segura no es "infraestructura": ' +
            'es salud pública preventiva. La lección quedó cara: la potabilizadora ya no es opcional.',
          codex: ['respuesta-humanitaria'],
        },
      ],
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
    {
      // Cadena: familias retornadas + sin seguridad alimentaria → el retorno se vuelve frágil.
      id: 'retorno-fragil',
      condicion: (_ind, ctx) => ctx.familias >= 2 && !ctx.hayAlimentos && ctx.mes >= 8,
      titulo: 'La canasta vacía',
      texto:
        'Las familias volvieron — pero comer aquí cuesta el doble que en la ciudad: todo llega de ' +
        'lejos, cuando llega. Dos madres te lo dicen sin rodeos: "Volvimos por la tierra, pero si ' +
        'mis hijos pasan hambre, nos regresamos a los albergues".',
      opciones: [
        {
          texto: 'Montar distribución de alimentos de emergencia y acelerar el centro permanente.',
          efectos: { confianza: 4, legitimidad: 3 },
          fondos: -20,
          retro:
            'El retorno sin seguridad alimentaria es una visita, no un retorno. La doctrina ' +
            'humanitaria lo trata como condición de sostenibilidad: si la canasta básica no está ' +
            'al alcance, las familias votarán con los pies — y cada familia que se va desanda a ' +
            'todas las demás.',
          codex: ['respuesta-humanitaria'],
        },
        {
          texto: 'Confiar en que el mercado local lo resolverá con el tiempo.',
          efectos: { confianza: -7, legitimidad: -5 },
          retro:
            'El mercado resolverá — en años. Las familias deciden en semanas. La diferencia entre ' +
            'esas dos velocidades es exactamente el espacio que la asistencia alimentaria de ' +
            'transición existe para cubrir. Sin ella, el retorno que celebraste se convierte en ' +
            'una segunda partida.',
          codex: ['respuesta-humanitaria'],
        },
      ],
    },
    {
      // Cadena: sin escuela ni cancha → la juventud queda disponible para quien sí la busca.
      id: 'reclutamiento',
      condicion: (_ind, ctx) => !ctx.hayEducacion && ctx.mes >= 9,
      titulo: 'Los que rondan a los muchachos',
      texto:
        'Un campesino te lo cuenta en voz baja: motos desconocidas pasan por las tardes y hablan ' +
        'con los adolescentes. Ofrecen plata, teléfono, "respeto". En el valle no hay escuela ni ' +
        'cancha ni nada que dispute esas tardes — y las disidencias lo saben.',
      opciones: [
        {
          texto: 'Levantar de urgencia espacios para la juventud: aula provisional y cancha, con monitores de la comunidad.',
          efectos: { confianza: 4, seguridad: 3 },
          fondos: -25,
          retro:
            'El reclutamiento no empieza con ideología: empieza con una tarde vacía. La protección ' +
            'de la niñez en emergencias trata la escuela como lo que es — un escudo: cada hora de ' +
            'aula o de cancha es una hora que el reclutador no tiene. Llegaste tarde, pero llegaste ' +
            'antes que ellos.',
          codex: ['ddr'],
        },
        {
          texto: 'Hablar con las familias para que cuiden a sus hijos: no hay presupuesto para más.',
          efectos: { seguridad: -8, confianza: -6 },
          retro:
            'Las familias ya cuidan — contra una oferta organizada de dinero y pertenencia, cuidar ' +
            'no alcanza. Donde el posconflicto no construye futuro para los jóvenes, el conflicto ' +
            'siguiente ya tiene quién lo pelee. El valle acaba de aprender la lección más cara de ' +
            'todas las reconstrucciones.',
          codex: ['ddr', 'garantias-seguridad'],
        },
      ],
    },
    {
      // Doble filo: la emisora que une también puede incitar (Ruanda / RTLM).
      // Solo aparece si el valle TIENE emisora — el poder de los medios obliga.
      id: 'emisora-odio',
      condicion: (_ind, ctx) => ctx.hayEmisora && ctx.mes >= 4,
      titulo: 'La voz que puede envenenar',
      texto:
        'Un grupo presiona para usar la emisora del valle —la que tanto costó— y transmitir ' +
        'mensajes que señalan a una comunidad como "el enemigo de adentro". Prometen que "es solo ' +
        'para defendernos". La misma radio que cose el valle podría encender la mecha.',
      opciones: [
        {
          texto: 'Proteger las ondas neutrales: ni odio ni señalamientos; verificar el rumor y dar voz a todos.',
          efectos: { justicia: 4, legitimidad: 4, confianza: 2 },
          retro:
            'Una radio comunitaria es infraestructura de paz — o de guerra. Negarla a quien quiere ' +
            'usarla para deshumanizar a un grupo no es censura: es prevención de atrocidades. La voz ' +
            'del valle solo cose mientras no se convierte en arma de nadie.',
          codex: ['medios-y-violencia', 'pedagogia-paz'],
        },
        {
          texto: 'Cederla "solo esta vez": calmar al grupo fuerte para no tenerlo en contra.',
          efectos: { legitimidad: 3, seguridad: -10, justicia: -8, confianza: -6 },
          encadena: 'brote-violencia',
          retro:
            'La radio nombró a un grupo como enemigo y alguien escuchó. En Ruanda, la RTLM llamó ' +
            '"cucarachas" a los tutsis y leyó listas de personas a matar: los medios fueron parte del ' +
            'genocidio. "Solo esta vez" es como empieza siempre — el odio amplificado no vuelve a la ' +
            'botella.',
          codex: ['medios-y-violencia', 'spoilers'],
        },
      ],
    },
    {
      // Consecuencia encadenada de ceder la emisora al odio (no aparece sola).
      id: 'brote-violencia',
      condicion: () => false,
      titulo: 'La mecha encendida',
      texto:
        'Lo que se transmitió tuvo eco: hay ataques contra la comunidad señalada y familias que ' +
        'huyen de nuevo. El valle se mira con miedo y sospecha. Tu equipo tiene horas para evitar ' +
        'que esto se vuelva irreversible.',
      opciones: [
        {
          texto: 'Mediación de urgencia y protección de la comunidad señalada, con garantes y presencia constante.',
          efectos: { seguridad: 5, justicia: 4, confianza: 2 },
          fondos: -20,
          retro:
            'Cuando el odio ya prendió, solo la presencia decidida —proteger a los señalados, mediar, ' +
            'desmentir— evita que el rumor se vuelva masacre. Llegaste tarde, pero llegar a tiempo a la ' +
            'contención todavía salva vidas. La neutralidad activa también es protección.',
          codex: ['garantias-seguridad', 'medios-y-violencia'],
        },
        {
          texto: 'Esperar a que los ánimos se enfríen solos para no echar más leña.',
          efectos: { seguridad: -8, confianza: -6, justicia: -4 },
          efectoEspecial: 'destruir-edificio',
          retro:
            'Los ánimos no se enfriaron solos: el vacío lo llenó la violencia. Ante una incitación en ' +
            'marcha, "esperar" es permitir. Lo que el valle construyó con meses de trabajo se perdió en ' +
            'una noche que se pudo haber frenado.',
          codex: ['medios-y-violencia', 'garantias-seguridad'],
        },
      ],
    },
    {
      // Consecuencia encadenada de aceptar el "dinero que arma" (no aparece sola).
      id: 'dinero-incursion',
      condicion: () => false,
      titulo: 'El arma que pagaste sin saber',
      texto:
        'El dinero que entró "por la paz" tomó otro camino: el grupo que lo recibió aparece mejor ' +
        'armado y entra al valle a cobrar lo que cree suyo. La factura de aquella decisión llegó, ' +
        'y la paga el valle entero.',
      opciones: [
        {
          texto: 'Activar protección comunitaria con el Estado y los garantes, y cortar de raíz el flujo de fondos.',
          efectos: { seguridad: 6, legitimidad: 2 },
          fondos: -25,
          retro:
            'Cerraste el grifo y reforzaste la protección — tarde, pero al fin. El dinero sin ' +
            'trazabilidad financia al que sabotea la paz: por eso la independencia y el control de los ' +
            'fondos no son burocracia, son seguridad. Comprar la guerra creyendo pagar la paz se cobra así.',
          codex: ['financiacion-conflicto', 'garantias-seguridad'],
        },
        {
          texto: 'Negociar con ellos para que se retiren: total, ya tienen el dinero.',
          efectos: { seguridad: -8, legitimidad: -6, confianza: -4 },
          efectoEspecial: 'destruir-edificio',
          retro:
            'Negociar desde la debilidad con quien tú mismo armaste solo sube el precio. El grupo ' +
            'entendió que el valle paga, y volverá. La lección es cara y vieja: el origen y las ' +
            'condiciones del dinero deciden si construye o destruye.',
          codex: ['financiacion-conflicto', 'spoilers'],
        },
      ],
    },
  ],
  // ── Montón de eventos aleatorios (la vida real del posconflicto) ──
  // Inspirados en la experiencia humanitaria de la Cruz Roja / Media Luna Roja:
  // restablecimiento del contacto familiar, visita a personas privadas de libertad,
  // protección de la misión médica, principios (neutralidad, imparcialidad), acceso,
  // desaparecidos, medios de vida, reducción de riesgo de desastres, difusión del DIH.
  eventosAleatorios: [
    {
      id: 'secuestro',
      puede: (ctx) => ctx.mes >= 4,
      titulo: 'El secuestro',
      texto:
        'Un grupo armado retiene a un comerciante del valle y exige dinero. La familia, ' +
        'desesperada, te pide que negocies tú: eres el único a quien todos los bandos todavía ' +
        'le hablan. Pero entrar a negociar un rescate tiene su propio precio.',
      opciones: [
        {
          texto: 'Ofrecer tus buenos oficios como intermediario neutral, sin pagar ni avalar el rescate.',
          efectos: { confianza: 6, seguridad: 3 },
          retro:
            'El intermediario neutral abre un canal que nadie más puede abrir — pero no paga ' +
            'rescates ni toma partido: el día que lo hace, deja de ser neutral y se vuelve parte ' +
            'del negocio. Esa línea fina entre facilitar la liberación y no alimentar el secuestro ' +
            'es exactamente el oficio humanitario.',
          codex: ['principios-humanitarios', 'mediacion'],
        },
        {
          texto: 'Pagar el rescate con fondos del proyecto para resolverlo rápido.',
          efectos: { seguridad: -8, confianza: -4 },
          fondos: -30,
          retro:
            'Volvió a casa — y mañana habrá tres secuestros más. Pagar convierte a cada vecino en ' +
            'un cajero automático con patas: el rescate que salva a uno financia al grupo que ' +
            'cazará a los demás. La protección no se compra; se construye cerrando el negocio.',
          codex: ['principios-humanitarios', 'garantias-seguridad'],
        },
      ],
    },
    {
      id: 'detenidos',
      puede: (ctx) => ctx.mes >= 3,
      titulo: 'Los que están del otro lado del muro',
      texto:
        'Llegan noticias de que varios hombres del valle están detenidos por una de las partes, ' +
        'sin contacto con sus familias. Nadie sabe si están vivos. Pides acceso para visitarlos ' +
        'y el comandante duda: "¿Y si lo que ven lo cuentan afuera?".',
      opciones: [
        {
          texto: 'Pactar visitas confidenciales: verificar trato digno e informar solo a la autoridad que detiene.',
          efectos: { confianza: 5, justicia: 5 },
          retro:
            'La visita a personas privadas de libertad es de las herramientas más antiguas del ' +
            'humanitarismo: no busca denunciar en la prensa, sino ver con sus propios ojos y ' +
            'hablar a solas con cada detenido. La confidencialidad es la llave que abre la puerta ' +
            'de la celda — y devolverle un nombre y un mensaje a su familia ya cambia su suerte.',
          codex: ['dih', 'principios-humanitarios'],
        },
        {
          texto: 'Exigir públicamente su liberación y denunciar la detención en los medios.',
          efectos: { justicia: 3, seguridad: -6, confianza: -4 },
          retro:
            'La denuncia se siente justa y cierra la puerta: el que detiene se atrinchera, corta el ' +
            'acceso y los detenidos quedan más solos que antes. A veces el ruido protege menos que ' +
            'la visita callada que nadie ve pero que llega cada mes. Elegir el impacto sobre la ' +
            'persona, no sobre el titular, es la disciplina más difícil del oficio.',
          codex: ['principios-humanitarios', 'dih'],
        },
      ],
    },
    {
      id: 'deslave',
      puede: (ctx) => ctx.mes >= 4,
      visual: 'lluvia',
      titulo: 'El deslave',
      texto:
        'Tres días de lluvia sin parar reblandecen la ladera sobre el valle. Un ingeniero de la ' +
        'comunidad avisa: la tierra de arriba puede venirse abajo sobre las casas de la parte ' +
        'baja. Hay horas, no días, para decidir.',
      opciones: [
        {
          texto: 'Evacuar preventivamente la zona de riesgo y reforzar el talud con la comunidad.',
          efectos: { confianza: 6, seguridad: 2 },
          fondos: -20,
          retro:
            'Evacuar por una alerta que quizás no se cumpla parece exagerado — hasta que se cumple. ' +
            'La reducción del riesgo de desastres es barata comparada con el desastre: una alarma ' +
            'temprana y un simulacro salvan lo que ninguna ayuda posterior recupera. La comunidad ' +
            'que se prepara junta también se organiza junta.',
          codex: ['respuesta-humanitaria'],
        },
        {
          texto: 'Esperar a ver si de verdad cede: mover a todos cuesta y quizás no pase nada.',
          efectos: { confianza: -7, seguridad: -4 },
          efectoEspecial: 'destruir-edificio',
          retro:
            'La ladera no esperó. El desastre "natural" casi nunca es solo natural: es una amenaza ' +
            'conocida más una decisión de no actuar a tiempo. Lo que el deslave se llevó estaba en ' +
            'el mapa de riesgo desde el primer día — reconstruir es siempre más caro que prevenir.',
          codex: ['respuesta-humanitaria'],
        },
      ],
    },
    {
      id: 'desaparecidos',
      puede: (ctx) => ctx.mes >= 5,
      titulo: 'Las fosas sin nombre',
      texto:
        'Al limpiar un terreno aparecen restos: la guerra dejó aquí desaparecidos que nunca se ' +
        'buscaron. Varias familias del valle llevan años sin saber dónde quedaron los suyos. ' +
        'Removerlo abre una herida — pero no removerlo la deja abierta para siempre.',
      opciones: [
        {
          texto: 'Proteger el sitio y articular una búsqueda forense con acompañamiento a las familias.',
          efectos: { justicia: 7, confianza: 3 },
          fondos: -15,
          retro:
            'Saber dónde está su muerto es un derecho, no un lujo: las familias de desaparecidos no ' +
            'pueden hacer duelo de una ausencia. La búsqueda forense, hecha con dignidad y con las ' +
            'familias —no a sus espaldas—, devuelve nombres y permite cerrar lo que la guerra ' +
            'dejó abierto. El derecho a saber es de los más sagrados del posconflicto.',
          codex: ['victimas', 'comision-verdad'],
        },
        {
          texto: 'Cubrir el terreno y seguir: remover el pasado puede reavivar los odios.',
          efectos: { justicia: -8, confianza: -3 },
          retro:
            'Enterrar dos veces a los muertos no entierra el conflicto: lo prolonga. Cada familia ' +
            'que no sabe dónde está el suyo guarda una herida que el silencio infecta. "No remover" ' +
            'protege a los responsables, no a la comunidad — y deja una deuda que volverá.',
          codex: ['victimas', 'memoria'],
        },
      ],
      eco: {
        historiaId: 'victimas-habana',
        texto:
          'En La Habana, sesenta víctimas se sentaron frente a quienes les hicieron daño y pidieron ' +
          'sobre todo una cosa: la verdad, saber dónde quedaron los suyos. Pusieron a las víctimas ' +
          'en el centro del acuerdo. Buscar a los desaparecidos no reabre la guerra: cierra su duelo.',
      },
    },
    {
      id: 'contacto-familiar',
      titulo: 'La carta que cruza el frente',
      texto:
        'Una abuela del valle no sabe nada de su hija desde que el conflicto los separó: quedó del ' +
        'otro lado de una línea que ya nadie cruza. Te pregunta, con una carta temblando en la ' +
        'mano, si tu equipo puede hacerla llegar.',
      opciones: [
        {
          texto: 'Activar el restablecimiento del contacto familiar: mensajes y búsqueda entre los separados.',
          efectos: { confianza: 7, legitimidad: 2 },
          fondos: -10,
          retro:
            'Reconectar a las familias que la guerra separó es de lo primero —y lo más humano— que ' +
            'hace la acción humanitaria: un mensaje de Cruz Roja que cruza la línea, un nombre ' +
            'tachado de la lista de buscados. No cambia la geopolítica, pero le devuelve a una ' +
            'abuela la voz de su hija. La paz también se mide en reencuentros.',
          codex: ['principios-humanitarios'],
        },
        {
          texto: 'Explicarle que eso excede el proyecto: hay prioridades más urgentes que una carta.',
          efectos: { confianza: -6, legitimidad: -2 },
          retro:
            'Para ti era una carta; para ella, su hija. Cuando el humanitarismo decide que reunir ' +
            'familias "no es prioridad", olvida que el tejido social está hecho exactamente de esos ' +
            'lazos. Reconstruir casas sin reconstruir vínculos es levantar un decorado vacío.',
          codex: ['principios-humanitarios'],
        },
      ],
    },
    {
      id: 'mision-medica',
      puede: (ctx) => ctx.mes >= 4,
      titulo: 'Armas en el puesto de salud',
      texto:
        'Hombres armados entran al puesto de salud persiguiendo a un herido del bando contrario: ' +
        'quieren que la enfermera lo entregue o que lo deje morir. Ella te mira, sin saber qué ' +
        'hacer. La sala de curaciones se ha vuelto, de pronto, un campo de batalla.',
      opciones: [
        {
          texto: 'Defender la misión médica: el herido se atiende por su herida, no por su bando.',
          efectos: { justicia: 5, seguridad: 4 },
          retro:
            'La regla más vieja de la guerra civilizada: el herido deja de ser enemigo. Atender ' +
            'según la necesidad médica y no según el uniforme —y mantener el arma fuera de la ' +
            'sala— es lo que protege a TODOS los heridos, también a los del bando que hoy ' +
            'amenaza. Atacar la atención médica no es daño colateral: es de los peores crímenes.',
          codex: ['dih', 'principios-humanitarios'],
        },
        {
          texto: 'Entregar al herido para evitar que destruyan el puesto y pongan en riesgo al personal.',
          efectos: { confianza: -6, justicia: -6, seguridad: -2 },
          retro:
            'Cedió el puesto y perdió lo que lo hacía puesto de salud: el día que el herido depende ' +
            'de su bando, nadie vuelve a confiar la vida a esa sala. La protección de la misión ' +
            'médica no es heroísmo individual: es la condición para que exista atención en medio ' +
            'de la guerra. Sin ella, todos los heridos del valle quedan a la intemperie.',
          codex: ['dih'],
        },
      ],
    },
    {
      id: 'financiacion-condicionada',
      puede: (ctx) => ctx.mes >= 3,
      titulo: 'El donante con condiciones',
      texto:
        'Un financiador generoso aparece con una bolsa de fondos — y una condición: que el ' +
        'proyecto lleve su bandera y favorezca a las familias de su sector del valle. Con ese ' +
        'dinero terminarías el doble de rápido. Pero el valle es de todos.',
      opciones: [
        {
          texto: 'Aceptar solo ayuda sin condiciones: la asistencia se reparte por necesidad, no por bando.',
          efectos: { legitimidad: 7, confianza: 4 },
          retro:
            'Decir que no a dinero condicionado duele cuando faltan fondos — y es lo que mantiene ' +
            'viva la única ventaja del humanitario: que todos le creen porque no es de nadie. ' +
            'Imparcialidad (ayudar según la necesidad) e independencia (no deberle el favor a ' +
            'ningún bando) no son lujos morales: son la fuente de tu acceso a todo el valle.',
          codex: ['principios-humanitarios'],
        },
        {
          texto: 'Tomar el dinero: el valle necesita avanzar y los principios no pagan cemento.',
          efectos: { legitimidad: -8, confianza: -5 },
          fondos: 25,
          retro:
            'El cemento llegó con dueño. En cuanto el proyecto se vuelve "de un bando", el otro lado ' +
            'cierra sus puertas y la mitad del valle deja de creerte. Lo que ganaste en velocidad ' +
            'lo perdiste en acceso y en confianza — las dos cosas que ningún donante puede ' +
            'reponerte. La neutralidad es cara de sostener y carísima de recuperar.',
          codex: ['principios-humanitarios'],
        },
      ],
    },
    {
      id: 'reten-humanitario',
      puede: (ctx) => ctx.mes >= 3,
      titulo: 'El retén',
      texto:
        'Un grupo armado monta un retén en el único camino y detiene el convoy con materiales y ' +
        'medicinas. Piden una "cuota" para dejarlo pasar. Detrás de ti, el valle espera esa carga ' +
        'desde hace semanas.',
      opciones: [
        {
          texto: 'Negociar el paso explicando la misión humanitaria, sin pagar la cuota ni armar a nadie.',
          efectos: { seguridad: 3, legitimidad: 4 },
          retro:
            'El acceso humanitario se negocia todos los días, retén por retén, explicando una y ' +
            'otra vez que la carga no es de nadie y que es para todos —incluidas las familias del ' +
            'que controla el camino—. Pagar el peaje abre hoy y cierra mañana: financia al que ' +
            'cobra y le enseña que la ayuda se ordeña. La paciencia neutral es la que sostiene el ' +
            'corredor abierto.',
          codex: ['principios-humanitarios', 'dih'],
        },
        {
          texto: 'Pagar la cuota: la carga es urgente y discutir puede costar vidas.',
          efectos: { seguridad: -6, legitimidad: -3 },
          fondos: -20,
          retro:
            'Pasó el convoy — y el retén ya sabe cuánto vale dejarte pasar. Cada cuota pagada ' +
            'pone precio a la ayuda y convierte el corredor humanitario en una fuente de ingresos ' +
            'del grupo armado. La urgencia de hoy financió el retén de la próxima semana.',
          codex: ['principios-humanitarios'],
        },
      ],
    },
    {
      id: 'epidemia-sarampion',
      puede: (ctx) => ctx.mes >= 5,
      titulo: 'La fiebre que se contagia',
      texto:
        'Aparecen los primeros casos de una fiebre con erupción entre los niños: sin vacunación ' +
        'durante años de guerra, el valle es leña seca para un brote. Una madre llega corriendo ' +
        'con su hijo ardiendo en fiebre.',
      opciones: [
        {
          texto: 'Lanzar de inmediato una campaña de vacunación casa por casa antes de que se propague.',
          efectos: { seguridad: 4, confianza: 4 },
          fondos: -20,
          retro:
            'En salud pública, la velocidad lo es todo: una semana de ventaja en vacunar es la ' +
            'diferencia entre veinte casos y dos mil. Las campañas de inmunización son de las ' +
            'intervenciones más costo-efectivas que existen — y en zonas que la guerra dejó sin ' +
            'cobertura, son literalmente la frontera entre un caso y una epidemia.',
          codex: ['respuesta-humanitaria'],
        },
        {
          texto: 'Aislar a los enfermos y esperar: una campaña completa es cara y compleja.',
          efectos: { seguridad: -8, confianza: -6 },
          retro:
            'Aislar sin vacunar es perseguir al virus siempre un paso atrás: para cuando aíslas un ' +
            'caso, ya contagió a cinco. Lo que una campaña temprana habría cortado en seco, ahora ' +
            'recorre el valle entero. En epidemias, dudar es decidir — y se decidió tarde.',
          codex: ['respuesta-humanitaria'],
        },
      ],
    },
    {
      id: 'migrantes-transito',
      puede: (ctx) => ctx.mes >= 4,
      titulo: 'Los que solo pasan',
      texto:
        'Un grupo de familias desplazadas de otra región llega al valle, exhaustas, de paso hacia ' +
        'la frontera. Algunos vecinos se inquietan: "apenas tenemos para nosotros". Otros recuerdan ' +
        'que ellos también fueron, hace poco, los que llegaban sin nada.',
      opciones: [
        {
          texto: 'Darles agua, descanso y atención de paso, sin condicionarlo a quiénes son ni de dónde vienen.',
          efectos: { confianza: 5, legitimidad: 3 },
          fondos: -10,
          retro:
            'La asistencia se da por la necesidad, no por el origen: el desplazado en tránsito tiene ' +
            'derecho a auxilio aunque no sea "de aquí". Un valle que acaba de volver del exilio y ' +
            'aun así abre la puerta al que pasa demuestra la lección más honda del posconflicto: la ' +
            'humanidad no se raciona por fronteras.',
          codex: ['principios-humanitarios', 'respuesta-humanitaria'],
        },
        {
          texto: 'Pedirles seguir de largo: el proyecto es para las familias del valle.',
          efectos: { confianza: -5, legitimidad: -3 },
          retro:
            'Cerrar la puerta al que huye es olvidar de dónde vienes. La imparcialidad no distingue ' +
            '"nuestros pobres" de "los otros": el que necesita, necesita. Y un valle que aprende a ' +
            'mirar al forastero con miedo está sembrando, sin saberlo, el próximo conflicto.',
          codex: ['principios-humanitarios'],
        },
      ],
    },
    {
      id: 'violencia-genero',
      puede: (ctx) => ctx.mes >= 5,
      titulo: 'Lo que nadie se atreve a nombrar',
      texto:
        'Una promotora de salud te lo dice en voz muy baja: varias mujeres del valle sufrieron ' +
        'violencia durante el conflicto y la callan por vergüenza y miedo al señalamiento. No hay ' +
        'a dónde acudir sin que todo el mundo se entere.',
      opciones: [
        {
          texto: 'Crear una ruta de atención confidencial y con enfoque de género, sin exponer a las víctimas.',
          efectos: { justicia: 6, confianza: 4 },
          fondos: -15,
          retro:
            'La violencia sexual en conflicto es la herida más silenciada: el estigma castiga a la ' +
            'víctima en vez del agresor. Atenderla exige confidencialidad, salud, apoyo psicosocial ' +
            'y cero exposición pública — el enfoque de género no es un añadido, es lo que permite ' +
            'que alguien se atreva a pedir ayuda. Nombrar con cuidado es empezar a reparar.',
          codex: ['genero', 'victimas'],
        },
        {
          texto: 'Tratarlo como un tema privado de cada familia: el proyecto no debe entrometerse.',
          efectos: { justicia: -7, confianza: -3 },
          retro:
            '"Privado" es la palabra con que el silencio protege al agresor. Cuando la ayuda mira ' +
            'para otro lado, las víctimas entienden que tampoco aquí hay lugar para ellas — y la ' +
            'herida se hereda. Ignorar la violencia de género no la vuelve inexistente: la vuelve ' +
            'impune.',
          codex: ['genero'],
        },
      ],
    },
    {
      id: 'ninos-no-acompanados',
      puede: (ctx) => ctx.mes >= 4,
      titulo: 'Los niños que llegaron solos',
      texto:
        'Tres niños aparecen en el valle sin sus padres: se separaron en la huida y nadie sabe si ' +
        'sus familias viven. Mientras tanto, las mismas motos que rondan a los adolescentes ya ' +
        'preguntaron por ellos.',
      opciones: [
        {
          texto: 'Ponerlos a salvo, buscar a sus familias y darles cuidado provisional con la comunidad.',
          efectos: { confianza: 5, seguridad: 4 },
          fondos: -10,
          retro:
            'Un niño no acompañado es a la vez el más vulnerable y el más codiciado por quien ' +
            'recluta. Protegerlo y rastrear a su familia —el reencuentro antes que cualquier otra ' +
            'cosa— es prioridad absoluta de la protección de la niñez. Cada día que pasa solo es un ' +
            'día en que alguien más le ofrece la pertenencia que perdió.',
          codex: ['ddr', 'principios-humanitarios'],
        },
        {
          texto: 'Dejarlos al cuidado del primer vecino que se ofrezca y seguir con lo urgente.',
          efectos: { seguridad: -6, confianza: -3 },
          retro:
            'Sin registro, sin búsqueda y sin seguimiento, "el primer vecino" puede ser refugio — o ' +
            'puerta de salida hacia el reclutamiento o la explotación. El cuidado improvisado de un ' +
            'niño solo no es cuidado: es dejar abierta justo la puerta por la que la guerra vuelve a ' +
            'entrar.',
          codex: ['ddr'],
        },
      ],
    },
    {
      id: 'apoyo-psicosocial',
      puede: (ctx) => ctx.mes >= 5,
      titulo: 'Las heridas que no se ven',
      texto:
        'El maestro lo nota antes que nadie: los niños no duermen, dibujan lo que vieron, se ' +
        'sobresaltan con cualquier ruido. Los adultos cargan en silencio años de miedo. El valle ' +
        'está reconstruyendo casas, pero las personas siguen rotas por dentro.',
      opciones: [
        {
          texto: 'Montar apoyo psicosocial comunitario: grupos, juego para los niños, acompañamiento al duelo.',
          efectos: { confianza: 6, justicia: 2 },
          fondos: -15,
          retro:
            'La guerra no termina cuando callan las armas: sigue dentro de la gente. La salud mental ' +
            'y el apoyo psicosocial son tan reconstrucción como el cemento — un valle de casas ' +
            'nuevas habitadas por personas en trauma no es un valle en paz. Atender la herida ' +
            'invisible es lo que hace que el resto se sostenga.',
          codex: ['respuesta-humanitaria', 'victimas'],
        },
        {
          texto: 'Concentrarse en lo material: el tiempo, dicen, lo cura todo.',
          efectos: { confianza: -5 },
          retro:
            'El tiempo no cura solo: el trauma no tratado se transmite a los hijos y estalla años ' +
            'después en violencia, adicción o silencio. Reconstruir paredes mientras las personas ' +
            'se desmoronan por dentro es construir sobre arena. La paz también se sostiene en la ' +
            'mente de quien la vive.',
          codex: ['respuesta-humanitaria'],
        },
      ],
    },
    {
      id: 'ayuda-efectivo',
      puede: (ctx) => ctx.mes >= 4,
      titulo: '¿Costales o dignidad?',
      texto:
        'Llega el momento de decidir cómo entregar la ayuda. Tu equipo se divide: unos quieren ' +
        'repartir costales de comida igual para todos; otros, dar dinero en efectivo para que cada ' +
        'familia compre lo que necesita en el mercado del valle.',
      opciones: [
        {
          texto: 'Entregar asistencia en efectivo donde el mercado funciona: cada familia elige y la economía local se mueve.',
          efectos: { confianza: 5, legitimidad: 3 },
          retro:
            'El efectivo, donde hay mercado, suele ganarle al costal: respeta la dignidad de elegir, ' +
            'reactiva al tendero local y se adapta a cada necesidad. La ayuda más moderna no decide ' +
            'por la gente — le devuelve la capacidad de decidir. Dar pescado alimenta un día; dar ' +
            'con qué comprar reactiva el río entero.',
          codex: ['respuesta-humanitaria', 'implementacion'],
        },
        {
          texto: 'Repartir costales iguales para todos: es más controlable y se ve el resultado.',
          efectos: { confianza: -3, legitimidad: -2 },
          retro:
            'El costal igual para todos es cómodo para quien lo entrega y ciego a quien lo recibe: ' +
            'el que no come ese grano lo vende a pérdida, y el tendero local —que también ' +
            'reconstruye— se queda sin clientes. Tratar a las personas como bocas iguales, y no ' +
            'como decisores, es ayudar de espaldas a su dignidad.',
          codex: ['respuesta-humanitaria'],
        },
      ],
    },
    {
      id: 'entierro-digno',
      puede: (ctx) => ctx.mes >= 4,
      titulo: 'Devolverles el nombre',
      texto:
        'En el viejo cementerio hay tumbas sin nombre y cuerpos que la guerra dejó sin sepultura ' +
        'digna. Algunas familias no pudieron siquiera enterrar a los suyos. La comunidad pregunta ' +
        'si vale la pena gastar en los muertos cuando los vivos necesitan tanto.',
      opciones: [
        {
          texto: 'Apoyar la gestión digna de los restos y un registro, para que cada familia recupere a su muerto.',
          efectos: { justicia: 5, confianza: 3 },
          fondos: -10,
          retro:
            'Tratar a los muertos con dignidad —identificarlos, registrarlos, devolverlos a sus ' +
            'familias— no es un gasto en el pasado: es salud pública, es derecho y es duelo. Una ' +
            'comunidad que puede enterrar y nombrar a los suyos cierra un capítulo que, sin eso, ' +
            'queda abierto y supurando por generaciones.',
          codex: ['dih', 'victimas'],
        },
        {
          texto: 'Dejarlo para después: los recursos deben ir a los que están vivos.',
          efectos: { justicia: -5, confianza: -2 },
          retro:
            'Los vivos también necesitan enterrar bien a sus muertos: el duelo negado se vuelve una ' +
            'herida de los vivos. Posponer la dignidad de los caídos no ahorra recursos, aplaza un ' +
            'cierre que la comunidad necesita para poder, de verdad, seguir adelante.',
          codex: ['victimas', 'memoria'],
        },
      ],
    },
    {
      id: 'sequia',
      puede: (ctx) => ctx.mes >= 6,
      titulo: 'El año sin lluvia',
      texto:
        'Pasan los meses y el cielo no suelta una gota. Los cultivos recién sembrados se marchitan ' +
        'y el pozo comunitario baja a ojos vista. El clima, que ya no es el de antes, amenaza con ' +
        'deshacer en una temporada lo que tanto costó plantar.',
      opciones: [
        {
          texto: 'Apoyar cultivos resistentes, cosecha de agua y reservas: preparar al valle para el clima que viene.',
          efectos: { seguridad: 3, confianza: 4 },
          fondos: -15,
          retro:
            'Las crisis climáticas ya no son excepción: son el telón de fondo de toda reconstrucción. ' +
            'Adaptarse —semillas que aguantan la seca, agua almacenada, alerta temprana— es más ' +
            'barato que socorrer la hambruna después. El posconflicto que ignora el clima reconstruye ' +
            'sobre una falla que volverá a abrirse.',
          codex: ['respuesta-humanitaria'],
        },
        {
          texto: 'Esperar a que vuelvan las lluvias: siempre han vuelto.',
          efectos: { seguridad: -6, confianza: -4 },
          retro:
            '"Siempre han vuelto" es la frase con que el clima de antes nos engaña sobre el de ahora. ' +
            'Cuando la sequía rompe la seguridad alimentaria, las familias que volvieron se vuelven ' +
            'a ir y el conflicto por el agua escasa empieza. Prepararse no es pesimismo: es la nueva ' +
            'forma de proteger la paz.',
          codex: ['respuesta-humanitaria'],
        },
      ],
    },
    {
      id: 'difusion-dih',
      puede: (ctx) => ctx.mes >= 3,
      titulo: 'Las reglas de la guerra',
      texto:
        'Todavía hay grupos armados moviéndose por la región. Un comandante joven, casi un ' +
        'muchacho, acepta reunirse contigo. No quiere rendirse — pero está dispuesto a escuchar ' +
        'qué líneas no se cruzan ni en la peor de las guerras.',
      opciones: [
        {
          texto: 'Sentarte a explicarle el DIH: a quién nunca se ataca, qué es población protegida, dónde está la línea.',
          efectos: { seguridad: 5, justicia: 3 },
          retro:
            'Hablar de las reglas de la guerra con quien la hace no es legitimarlo: es salvar civiles ' +
            'concretos. La difusión del Derecho Internacional Humanitario parte de una idea incómoda ' +
            'y poderosa: incluso en la guerra hay límites, y enseñarlos a todos los que portan armas ' +
            '—sin excepción— protege a los que no las portan. Un civil que no muere es la medida del ' +
            'éxito.',
          codex: ['dih', 'pedagogia-paz'],
        },
        {
          texto: 'Negarte a hablar con un actor armado: dialogar con ellos es darles estatus.',
          efectos: { seguridad: -4, justicia: -2 },
          retro:
            'El que no escucha las reglas no las cumple — y los que pagan ese silencio son los ' +
            'civiles. Hablar de DIH con todos los que tienen un fusil, te gusten o no, no les da ' +
            'estatus: les quita excusas. Negarse a la conversación se siente íntegro y deja a la ' +
            'población más expuesta.',
          codex: ['dih', 'principios-humanitarios'],
        },
      ],
    },
    {
      id: 'rumor-desinformacion',
      puede: (ctx) => ctx.mes >= 4,
      titulo: 'El rumor que envenena',
      texto:
        'Corre un bulo por el valle: que las vacunas del proyecto "esterilizan a los niños", que tu ' +
        'equipo "trabaja para uno de los bandos". En cuestión de días, familias que confiaban ' +
        'empiezan a cerrarte la puerta.',
      opciones: [
        {
          texto: 'Enfrentar el rumor con transparencia: reuniones abiertas, líderes locales y respuestas claras.',
          efectos: { confianza: 5, legitimidad: 3 },
          fondos: -10,
          retro:
            'La desinformación mata: un rumor sobre las vacunas puede frenar una campaña entera y ' +
            'costar vidas. No se vence con desprecio sino con presencia — escuchando el miedo real ' +
            'que hay debajo, respondiendo con la verdad y apoyándote en las voces que la comunidad ' +
            'ya respeta. La confianza es infraestructura, y se repara conversando.',
          codex: ['pedagogia-paz', 'principios-humanitarios'],
        },
        {
          texto: 'Ignorar el rumor: es absurdo y se desinflará solo.',
          efectos: { confianza: -7, legitimidad: -4 },
          retro:
            'El rumor no se desinfló: se multiplicó en el vacío que dejó tu silencio. La ' +
            'desinformación crece justo donde nadie la enfrenta, y para cuando reaccionas, la ' +
            'desconfianza ya cerró las puertas que tardarás meses en reabrir. Contra el bulo, ' +
            'callar es perder.',
          codex: ['pedagogia-paz'],
        },
      ],
    },
    {
      id: 'voluntario-herido',
      puede: (ctx) => ctx.mes >= 4,
      titulo: 'El que ayudaba',
      texto:
        'Un voluntario del valle —de los que cargan agua, curan, registran familias— queda herido ' +
        'al cruzar una zona en disputa para atender a alguien. La comunidad está conmocionada: ' +
        'quien ayuda también es blanco.',
      opciones: [
        {
          texto: 'Reforzar la seguridad de los que ayudan: protocolos, señalización clara y exigir respeto a quien socorre.',
          efectos: { seguridad: 4, confianza: 4 },
          fondos: -10,
          retro:
            'Atacar a quien socorre es atacar a todos los que ese socorrista habría salvado. ' +
            'Proteger al personal humanitario y de salud no es cuidar a unos pocos: es mantener en ' +
            'pie la única red que llega donde nadie más llega. El respeto a quien ayuda —y al ' +
            'símbolo que lo identifica— es una regla que protege, al final, a toda la comunidad.',
          codex: ['dih', 'principios-humanitarios'],
        },
        {
          texto: 'Suspender las salidas del voluntariado para evitar más riesgos.',
          efectos: { confianza: -5, seguridad: -3 },
          retro:
            'Recogiste la red justo cuando más se necesitaba: sin voluntarios en terreno, el agua no ' +
            'llega, la familia no se registra, el herido no se atiende. Proteger no es replegarse — ' +
            'es hacer respetar el espacio de los que ayudan para que puedan seguir ayudando. El ' +
            'miedo, dejado solo, también desplaza.',
          codex: ['principios-humanitarios'],
        },
      ],
    },
    {
      id: 'disputa-tierra',
      puede: (ctx) => ctx.mes >= 5,
      titulo: 'La casa ocupada',
      texto:
        'Una familia que retorna encuentra su casa habitada por otra que se instaló durante la ' +
        'guerra — y que tampoco tiene a dónde ir. Dos derechos legítimos sobre el mismo techo. El ' +
        'valle entero observa cómo lo resuelves.',
      opciones: [
        {
          texto: 'Abrir una mediación de tierras con reglas claras y una salida digna para ambas familias.',
          efectos: { justicia: 6, confianza: 3 },
          fondos: -10,
          retro:
            'La tierra es la herida más común del retorno: sin reglas justas de restitución, cada ' +
            'casa se vuelve un pleito y cada pleito, una chispa. Resolverlo reconociendo el derecho ' +
            'del que vuelve sin dejar en la calle al que ocupó por necesidad es lento y difícil — y ' +
            'es exactamente la clase de justicia que evita el próximo conflicto.',
          codex: ['victimas', 'justicia-transicional'],
        },
        {
          texto: 'No meterte: que las familias lo arreglen entre ellas.',
          efectos: { justicia: -6, seguridad: -4 },
          retro:
            '"Que lo arreglen entre ellas" es como suenan los conflictos de tierra justo antes de ' +
            'volverse violentos. Sin un tercero justo y reglas claras, gana el más fuerte y pierde ' +
            'el derecho — y el rencor por la tierra robada es de los que cruzan generaciones. La ' +
            'restitución no es un trámite: es prevención de la guerra siguiente.',
          codex: ['justicia-transicional', 'victimas'],
        },
      ],
    },
    {
      id: 'cooptacion-politica',
      puede: (ctx) => ctx.mes >= 6,
      titulo: 'El político y la foto',
      texto:
        'Se acercan elecciones locales. Un candidato te propone un trato: él aporta recursos y, a ' +
        'cambio, la próxima entrega de ayuda se hace con su nombre y su foto. "Es por una buena ' +
        'causa", insiste, "y al valle le conviene tenerme de amigo".',
      opciones: [
        {
          texto: 'Rechazar el trato: la ayuda no se reparte con banderas de campaña.',
          efectos: { legitimidad: 6, confianza: 3 },
          retro:
            'Que la ayuda lleve la foto de un candidato la convierte en propaganda y la vuelve sospechosa ' +
            'para la mitad del valle. La independencia frente al poder político —no deberle el favor a ' +
            'ningún partido— es lo que permite que la asistencia llegue a todos, ganen quienes ganen. ' +
            'El humanitario que se deja usar pierde justo lo que lo hacía útil.',
          codex: ['principios-humanitarios'],
        },
        {
          texto: 'Aceptar: el aporte es real y el valle necesita esos recursos ya.',
          efectos: { legitimidad: -7, confianza: -4 },
          fondos: 20,
          retro:
            'El recurso entró con dueño y con fecha de cobro. En cuanto la ayuda se vuelve plataforma ' +
            'de un candidato, el resto del valle deja de verla como suya y empieza a sospechar de tu ' +
            'equipo. La independencia se gasta rápido y se recupera lentísimo — y sin ella, ya no ' +
            'eres de fiar para nadie.',
          codex: ['principios-humanitarios', 'participacion'],
        },
      ],
    },
    {
      id: 'artefacto-escuela',
      puede: (ctx) => ctx.mes >= 5,
      titulo: 'El artefacto junto a la escuela',
      texto:
        'Unos niños encuentran un objeto metálico extraño cerca de donde juegan: un resto explosivo ' +
        'de la guerra que nadie había detectado. Por suerte avisaron antes de tocarlo. Pero, ¿cuántos ' +
        'más habrá enterrados donde corren los niños?',
      opciones: [
        {
          texto: 'Acordonar, llamar al desminado y dar de inmediato educación en el riesgo de minas a la comunidad.',
          efectos: { seguridad: 5, confianza: 3 },
          retro:
            'Los restos explosivos de guerra no entienden de acuerdos de paz: matan al que juega, al ' +
            'que ara, al que pastorea. La educación en el riesgo —enseñar a reconocer, no tocar y ' +
            'avisar— salva vidas mientras llega el desminado, sobre todo entre los niños, sus ' +
            'principales víctimas. Señalizar y enseñar es la primera línea de defensa.',
          codex: ['dih'],
        },
        {
          texto: 'Retirarlo rápido con la gente del valle para no alarmar y seguir adelante.',
          efectos: { seguridad: -8, confianza: -4 },
          efectoEspecial: 'destruir-edificio',
          retro:
            'Manipular un artefacto sin personal especializado es jugar a la ruleta: esta vez costó. ' +
            'Los restos de guerra se neutralizan con técnicos y protocolos, nunca con buena voluntad ' +
            'y prisa. "No alarmar" no protege a nadie: lo que protege es señalizar, esperar al ' +
            'experto y enseñar a todos a mantenerse lejos.',
          codex: ['dih'],
        },
      ],
    },
    {
      id: 'medios-vida',
      puede: (ctx) => ctx.mes >= 4,
      titulo: 'Semillas, no limosna',
      texto:
        'Las familias agradecen la ayuda — pero un campesino mayor lo dice por todos: "No queremos ' +
        'vivir de que nos regalen. Queremos volver a producir". El valle está listo para dejar de ' +
        'recibir y empezar a sostenerse, si le dan con qué.',
      opciones: [
        {
          texto: 'Invertir en medios de vida: semillas, herramientas, animales y formación para reactivar la producción.',
          efectos: { confianza: 5, legitimidad: 4 },
          fondos: -20,
          retro:
            'El mejor final de la ayuda es el día en que sobra. Apostar por los medios de vida —que la ' +
            'gente vuelva a producir su comida y su ingreso— transforma al asistido en protagonista y ' +
            'acerca la meta de todo proyecto humanitario: volverse innecesario. La dignidad no es ' +
            'recibir bien; es no tener que recibir.',
          codex: ['respuesta-humanitaria', 'implementacion'],
        },
        {
          texto: 'Mantener la entrega de ayuda directa: es más seguro y predecible.',
          efectos: { confianza: -4, legitimidad: -3 },
          retro:
            'La ayuda eterna, sin querer, ata: vuelve dependiente a quien podría ser autónomo y ' +
            'prolonga la presencia que debería terminar. Un valle que solo recibe nunca se gradúa. ' +
            'Sostener la mano abierta es más cómodo que soltarla — pero soltarla a tiempo es el ' +
            'verdadero objetivo.',
          codex: ['respuesta-humanitaria'],
        },
      ],
    },
    {
      id: 'primeros-auxilios',
      puede: (ctx) => ctx.mes >= 3,
      titulo: 'Manos que salvan',
      texto:
        'El puesto de salud más cercano está a horas de camino. Un grupo de jóvenes del valle se ' +
        'ofrece para algo: aprender a salvar vidas mientras llega la ayuda — primeros auxilios, ' +
        'partos de emergencia, traslados. Solo necesitan que alguien les enseñe.',
      opciones: [
        {
          texto: 'Formar una brigada comunitaria de primeros auxilios con la propia gente del valle.',
          efectos: { seguridad: 4, confianza: 5 },
          fondos: -10,
          retro:
            'La ayuda que más perdura es la que se queda en las manos de la comunidad. Una brigada ' +
            'local de primeros auxilios responde en minutos donde el hospital tarda horas, y cada ' +
            'joven formado es capacidad que no se va cuando tu equipo se vaya. Enseñar a salvar ' +
            'multiplica la ayuda y siembra el día en que el valle se cuide solo.',
          codex: ['respuesta-humanitaria', 'pedagogia-paz'],
        },
        {
          texto: 'Dejarlo a los profesionales: mejor traer personal capacitado de fuera.',
          efectos: { confianza: -3 },
          retro:
            'El personal de fuera llega tarde y se va temprano. Apoyarse solo en expertos externos ' +
            'deja al valle tan dependiente como lo encontraste: cuando se marchan, la capacidad se ' +
            'marcha con ellos. La resiliencia no se importa — se cultiva en la propia gente, una ' +
            'brigada a la vez.',
          codex: ['respuesta-humanitaria'],
        },
      ],
    },
    {
      id: 'tregua-vacunacion',
      puede: (ctx) => ctx.mes >= 5,
      titulo: 'Una tregua para los niños',
      texto:
        'Para vacunar a los niños de las dos orillas hace falta algo casi imposible: que los grupos ' +
        'enfrentados callen las armas unos días y dejen pasar a los equipos de salud. Te toca a ti ' +
        'tocar todas las puertas y pedir lo impensable.',
      opciones: [
        {
          texto: 'Gestionar días de tranquilidad: una tregua humanitaria para inmunizar a todos los niños.',
          efectos: { confianza: 6, seguridad: 4 },
          fondos: -10,
          retro:
            'Los "días de tranquilidad" —pausas en el combate para vacunar— son una de las ideas más ' +
            'hermosas del humanitarismo: hasta los enemigos suelen aceptar callar las armas por los ' +
            'niños de todos. Esa pausa no solo salva de la enfermedad: demuestra que el acuerdo es ' +
            'posible, y a veces es la primera piedra de una paz más grande.',
          codex: ['cese-fuego', 'respuesta-humanitaria'],
        },
        {
          texto: 'Vacunar solo en la zona segura: pedir una tregua es ingenuo y arriesgado.',
          efectos: { seguridad: -4, confianza: -3 },
          retro:
            'Medio valle vacunado es un valle no vacunado: el virus cruza la línea que tus equipos no ' +
            'cruzaron. Renunciar de antemano a la tregua deja sin protección justo a los niños del ' +
            'lado más difícil — y desperdicia una de las pocas cosas en las que hasta los enemigos ' +
            'pueden, por una vez, estar de acuerdo.',
          codex: ['respuesta-humanitaria', 'cese-fuego'],
        },
      ],
    },
    {
      id: 'primavera',
      puede: (ctx) => ctx.mes >= 5,
      titulo: 'La plaza se llena',
      texto:
        'La juventud del valle sale a la plaza: están cansados de promesas y exigen que los cambios ' +
        'lleguen YA. La energía es enorme y puede ir hacia cualquier lado. Tu equipo puede abrirle ' +
        'cauce o intentar que se disuelva.',
      opciones: [
        {
          texto: 'Abrir cauces reales de participación: consejo juvenil, veeduría, presupuesto que deciden ellos.',
          efectos: { legitimidad: 6, confianza: 4 },
          fondos: -10,
          retro:
            'La movilización canalizada se vuelve cogobierno: la frustración se transforma en ' +
            'pertenencia y la calle, en columna del proceso. La Primavera Árabe mostró que donde la ' +
            'transición abrió diálogo (Túnez) la energía sostuvo la paz; donde se cerró, recayó en ' +
            'autoritarismo o guerra. Escuchar a tiempo es barato; ignorar, carísimo.',
          codex: ['movilizacion-social', 'participacion'],
        },
        {
          texto: 'Contener la protesta y prometer que "todo llegará a su tiempo".',
          efectos: { legitimidad: -7, confianza: -5 },
          retro:
            'La plaza se vació hoy y se llenará mañana, más dura. Reprimir o prometer sin cumplir ' +
            'compra una calma corta y siembra la próxima ola. La energía de una transición no se ' +
            'apaga ignorándola: se radicaliza. La paz que no escucha a su juventud la pierde.',
          codex: ['movilizacion-social'],
        },
      ],
    },
    {
      id: 'dinero-que-arma',
      puede: (ctx) => ctx.mes >= 4,
      titulo: 'El mecenas generoso',
      texto:
        'Un patrón externo ofrece una montaña de fondos "por la paz del valle". Pero todo indica que ' +
        'parte de ese dinero terminaría en manos de un grupo armado de la zona. Con esa plata ' +
        'avanzarías al doble. El origen, sin embargo, pesa.',
      opciones: [
        {
          texto: 'Rechazar o condicionar con transparencia total: ni un peso que pueda fortalecer a un actor armado.',
          efectos: { legitimidad: 6, confianza: 3 },
          retro:
            'Decir que no a dinero turbio duele cuando faltan fondos — y es lo que evita comprar la ' +
            'guerra creyendo pagar la paz. La independencia y la trazabilidad no son burocracia: son ' +
            'lo que impide que tu propio presupuesto arme al que sabotea el proceso.',
          codex: ['financiacion-conflicto', 'principios-humanitarios'],
        },
        {
          texto: 'Tomar el dinero: el valle necesita avanzar y el resto es problema de otros.',
          efectos: { legitimidad: -4, confianza: -2 },
          fondos: 35,
          encadena: 'dinero-incursion',
          retro:
            'El cemento llegó — y también las armas que financiaste sin querer. El dinero sin control ' +
            'no es neutro: sostiene a quien lo recibe, y aquí fortaleció justo al que vive de la guerra. ' +
            'La factura de esa decisión no tarda en llegar al valle.',
          codex: ['financiacion-conflicto', 'spoilers'],
        },
      ],
    },
    {
      id: 'pozo-roto',
      puede: (ctx) => ctx.mes >= 4,
      titulo: 'El agua que sabe raro',
      texto:
        'El pozo del que bebe media comunidad amanece turbio: algo lo contaminó. Los primeros ' +
        'malestares ya aparecen. Hay una ventana corta para actuar antes de que se vuelva un brote ' +
        'en serio.',
      opciones: [
        {
          texto: 'Cloración y reparación de urgencia + agua segura mientras tanto.',
          efectos: { confianza: 3 },
          salud: 6,
          fondos: -15,
          retro:
            'Actuar en la ventana corta —cloro, reparación, agua segura de transición— corta la cadena ' +
            'antes de que enferme medio valle. En agua y saneamiento, las horas valen vidas: por eso el ' +
            'estándar es prevenir el brote, no tratarlo cuando ya estalló.',
          codex: ['respuesta-humanitaria'],
        },
        {
          texto: 'Hervir el agua y esperar: una intervención completa es cara.',
          efectos: { confianza: -5 },
          efectoEspecial: 'brote-salud',
          retro:
            'Hervir ayuda, pero no alcanza contra un pozo contaminado del que sigue bebiendo la ' +
            'comunidad: el brote se descontroló. La salud del valle se desplomó por ahorrarse una ' +
            'reparación. En saneamiento, lo barato sale carísimo.',
          codex: ['respuesta-humanitaria'],
        },
      ],
    },
  ],
};
