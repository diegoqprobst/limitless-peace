/**
 * CAPA DE TRADUCCIÓN AL INGLÉS (overlay).
 *
 * Solo TEXTO, indexado por el mismo id que el contenido español base. La lógica
 * del juego (efectos, ramificaciones, condiciones de los finales) NO se duplica
 * aquí: vive una sola vez en src/data/escenario.ts y finales.ts. content.ts
 * combina estructura (español) + texto (este archivo) para el idioma elegido.
 *
 * Si una entrada falta aquí, el juego muestra el español (fallback). Por eso
 * este archivo se puede completar de forma incremental sin romper nada.
 *
 * Las opciones de cada nodo se alinean POR POSICIÓN con las del español.
 */

export interface NodoTextoEN {
  titulo: string;
  texto: string;
  opciones: { texto: string; retro: string }[];
}

export interface CodexTextoEN {
  titulo: string;
  categoria: string;
  definicion: string;
  enLaPractica: string;
  casoReal: string;
  paraReflexionar: string;
}

export interface OverlayEN {
  contexto: { titulo: string; resumen: string };
  fases: Record<number, { nombre: string; descripcion: string }>;
  nodos: Record<string, NodoTextoEN>;
  codex: Record<string, CodexTextoEN>;
  finales: Record<string, { titulo: string; descripcion: string; leccion: string }>;
}

export const EN: OverlayEN = {
  contexto: {
    titulo: 'The Road to Miravalle',
    resumen:
      'The Republic of Miravalle has endured 32 years of internal armed conflict between the ' +
      'Government and the Mountain Insurgent Front (MIF). The toll: more than 60,000 victims, ' +
      '400,000 displaced people, and a deeply divided country. After a decade of military ' +
      'stalemate, both sides have secretly agreed to explore a negotiated way out. You are part ' +
      'of the international humanitarian mediation team that will accompany the process. Every ' +
      'decision you make is inspired by real dilemmas from peace processes.',
  },

  fases: {
    0: {
      nombre: 'Pre-negotiation',
      descripcion: 'The secret contacts that decide whether there will be talks at all.',
    },
    1: {
      nombre: 'Humanitarian measures and ceasefire',
      descripcion: 'Reducing suffering while negotiations go on.',
    },
    2: {
      nombre: 'Substantive negotiation',
      descripcion: 'Victims, justice, weapons: the issues that shape the agreement.',
    },
    3: {
      nombre: 'Signing and ratification',
      descripcion: 'Turning a text into a social pact.',
    },
    4: {
      nombre: 'Implementation',
      descripcion: 'Where agreements are fulfilled… or wither away.',
    },
  },

  nodos: {
    'canal-secreto': {
      titulo: 'The first contact',
      texto:
        'An envoy from the MIF delivers a letter: they are willing to talk, but they fear the ' +
        'Government will use the announcement to humiliate them publicly. The Government, in turn, ' +
        'fears that sitting down at the table will be read as weakness. Your team must recommend ' +
        'how to begin the contacts.',
      opciones: [
        {
          texto: 'Set up a secret exploratory channel in a third country, with no press.',
          retro:
            'A discreet exploratory phase lets the parties talk without the political cost of doing ' +
            'so in public. That is how the Colombian process began (secret meetings in Havana, ' +
            '2011-2012) and the Northern Ireland one (a secret British Government–IRA channel). The ' +
            'risk: when it leaks, part of society will feel the deal was made "behind their backs".',
        },
        {
          texto: 'Publicly announce the start of talks to build citizen support.',
          retro:
            'Announcing before agreeing on basic rules exposes the process to early sabotage: every ' +
            'statement becomes political ammunition and the parties harden their positions for their ' +
            'audience. Processes announced prematurely (Caguán, Colombia 1999-2002) collapsed partly ' +
            'because they negotiated under the spotlight with no clear agenda.',
        },
        {
          texto: 'Demand a unilateral halt to MIF attacks as a precondition for talking.',
          retro:
            'Hard preconditions tend to kill talks before they are born: the weaker party reads them ' +
            'as disguised surrender. Comparative evidence suggests negotiating "in the midst of the ' +
            'conflict" with clear rules, and leaving the ceasefire as an early result of the table, ' +
            'not as a condition of entry.',
        },
      ],
    },
    garantes: {
      titulo: 'Venue and guarantors',
      texto:
        'The parties agree to explore talks. Now they must decide where they will negotiate and ' +
        'who will accompany the table. Every logistical detail is also a political message.',
      opciones: [
        {
          texto: 'A venue in a neutral country, with two guarantor States accepted by both parties.',
          retro:
            'Guarantors bear witness, unblock crises, and raise the cost of walking away from the ' +
            'table. In Colombia, Cuba and Norway as guarantors (with Chile and Venezuela as ' +
            'accompanying countries) were key to sustaining four years of negotiation. A neutral ' +
            'venue protects the negotiators’ safety and lowers media pressure.',
        },
        {
          texto: 'Negotiate inside Miravalle so the process "feels like our own".',
          retro:
            'Negotiating on home soil has symbolic value, but in an active conflict it exposes the ' +
            'table to attacks, espionage, and daily media pressure. The Caguán demilitarized zone ' +
            'showed the cost: the territory itself became an object of dispute and mistrust.',
        },
        {
          texto: 'Do without international guarantors: "we’ll solve this conflict on our own".',
          retro:
            'Without third parties, every crisis depends solely on the goodwill of two historic ' +
            'enemies. International companions do not decide for the parties: they create conditions ' +
            'for the parties to decide. Almost no successful contemporary peace process has done ' +
            'without them.',
        },
      ],
    },
    agenda: {
      titulo: 'The agenda: everything or the essentials?',
      texto:
        'Before installing the public table, they must agree on WHAT will be negotiated. The MIF ' +
        'wants to discuss "the whole model of the country". The Government wants to talk only about ' +
        'disarmament. Your team facilitates the drafting of the framework agreement.',
      opciones: [
        {
          texto: 'A narrow agenda: the issues that caused and sustain the conflict, nothing more.',
          retro:
            'The General Agreement of Havana (2012) defined 6 concrete points and a golden rule: ' +
            '"nothing is agreed until everything is agreed". A narrow agenda makes the process ' +
            'manageable and verifiable. Total agendas ("refound the country at the table") tend to ' +
            'drag negotiations on until they collapse.',
        },
        {
          texto: 'A broad, open agenda: let the parties discuss all the country’s problems.',
          retro:
            'In Caguán a 12-point agenda with dozens of sub-issues was agreed — practically a State’s ' +
            'whole program. Three years later nothing substantive had been agreed. A peace table does ' +
            'not replace democracy: it ends the armed conflict so the other disputes can be handled ' +
            'without weapons.',
        },
        {
          texto: 'Disarmament and reintegration only: the causes of the conflict come later.',
          retro:
            'For an armed group, handing over weapons without addressing any of its grievances amounts ' +
            'to surrender, not negotiation. Agreements that ignore the causes (land, political ' +
            'exclusion, rights) have high rates of relapse into violence in the following decade.',
        },
      ],
    },
    'acuerdo-humanitario': {
      titulo: 'While they negotiate, the war goes on',
      texto:
        'The table is installed, but fighting continues on the ground. An army offensive leaves a ' +
        'community without access to food or medical care; the MIF is holding 14 people. Public ' +
        'opinion asks: what is the table for if people keep suffering?',
      opciones: [
        {
          texto:
            'Propose immediate humanitarian measures: release of captives, humanitarian access, and a ' +
            'pilot demining effort.',
          retro:
            'Partial humanitarian agreements produce "early wins" that prove the table works, without ' +
            'waiting for the final deal. In Colombia, joint demining in El Orejón (2015) and the release ' +
            'of kidnapped people built verifiable trust. They also apply International Humanitarian Law: ' +
            'war, too, has limits.',
        },
        {
          texto: 'Keep the table focused on the political agenda and not "get distracted" by humanitarian issues.',
          retro:
            'A table that negotiates for years without easing suffering loses the public. People judge ' +
            'the process by what changes in their lives, not by the communiqués. IHL requires protecting ' +
            'the civilian population at all times — it is not a concession of the table, it is an ' +
            'obligation of the parties.',
        },
        {
          texto: 'Condition every humanitarian gesture on political concessions from the other side.',
          retro:
            'Using the population’s suffering as a bargaining chip violates the principle of humanity ' +
            'and poisons the table. Humanitarian access, medical care, and dignified treatment of people ' +
            'are non-negotiable under IHL and the Fundamental Principles of the Red Cross and Red Crescent ' +
            'Movement.',
        },
      ],
    },
    'cese-fuego': {
      titulo: 'Designing the ceasefire',
      texto:
        'With the first humanitarian measures under way, the parties ask your team for technical ' +
        'options to silence the guns. A poorly designed ceasefire can destroy the process: every ' +
        'shot will become an accusation.',
      opciones: [
        {
          texto:
            'A bilateral ceasefire with detailed protocols, defined zones, and third-party verification (UN).',
          retro:
            'A ceasefire without verification is an accusation waiting to happen. The tripartite ' +
            'Monitoring and Verification Mechanism in Colombia (Government–FARC–UN, 2016) processed each ' +
            'incident technically before it escalated politically. Protocols turn "they violated the ' +
            'ceasefire!" into a verifiable case file.',
        },
        {
          texto: 'Ask only for a unilateral MIF ceasefire as a sign of good faith.',
          retro:
            'Unilateral ceasefires are fragile: without reciprocity or verification, any military ' +
            'operation by the other side breaks them and leaves the one who declared it looking naive ' +
            'before its own base. They can work as an initial gesture, but they do not sustain a long ' +
            'process.',
        },
        {
          texto: 'Informal de-escalation with no written agreement, so as not to "tie down" the Government militarily.',
          retro:
            'Without written rules, each side interprets the de-escalation in its own favor and incidents ' +
            'have no referee. The ambiguity that makes signing easier is the same ambiguity that later ' +
            'blows it up. What is not written cannot be verified; what cannot be verified builds no trust.',
        },
      ],
    },
    'violacion-cese': {
      titulo: 'The first crisis',
      texto:
        'An MIF unit ambushes a military patrol: 3 soldiers killed. The MIF claims the patrol entered ' +
        'a zone excluded by the protocols. The media demand breaking off the table. The president calls ' +
        'you: "What do we do?"',
      opciones: [
        {
          texto:
            'Activate the verification mechanism: investigate the incident technically and respond by protocol.',
          retro:
            'Peace processes do not fail because they have crises — they all do — but because they lack ' +
            'mechanisms to process them. Treating the incident as a technical case (what happened? who ' +
            'breached which protocol? what consequence applies?) keeps it from becoming a political trial ' +
            'of the whole process. That is how the Colombian ceasefire survived multiple incidents.',
        },
        {
          texto: 'Suspend the table indefinitely until the MIF "shows real will for peace".',
          retro:
            'Suspending the table at every crisis hands control of the process to whoever wants to ' +
            'sabotage it: one attack is enough to halt everything. Spoilers on both sides learn that ' +
            'lesson fast. The table must be more resilient than its worst days.',
        },
        {
          texto: 'Publicly downplay the incident to protect the table.',
          retro:
            'Hiding or downplaying acts of violence destroys the process’s credibility and ' +
            're-victimizes the families. Transparency hurts less than a lie once discovered. A peace ' +
            'process stands on the uncomfortable truth, not on manufactured calm.',
        },
      ],
    },
    'crisis-confianza': {
      titulo: 'The process hangs by a thread',
      texto:
        'Accumulated mistrust takes its toll: the MIF freezes its participation and the Government ' +
        'weighs withdrawing. The guarantors convene an emergency meeting. A gesture is needed to save ' +
        'the process.',
      opciones: [
        {
          texto:
            'Propose a package of reciprocal, simultaneous confidence measures, verified by the guarantors.',
          retro:
            'Confidence-building measures (releases, suspension of offensive operations, simultaneous ' +
            'gestures) work when they are reciprocal and verifiable: no one "gives in first", both give ' +
            'in at once before a witness. Simultaneity solves the prisoner’s dilemma that paralyzes ' +
            'historic enemies.',
        },
        {
          texto: 'Press with an ultimatum: return to the table this week, or the mediation team withdraws.',
          retro:
            'A mediator who threatens loses their main asset: being the safe space both parties can ' +
            'return to without humiliation. Ultimatums force the parties to choose between the table and ' +
            'their pride — and pride usually wins. Strategic patience is part of the craft.',
        },
      ],
    },
    victimas: {
      titulo: 'The victims ask to speak',
      texto:
        'Victims’ organizations demand to take part: "They negotiate over our pain without us". Some ' +
        'negotiators fear their presence will "emotionalize" the table and paralyze it. Your team must ' +
        'propose a mechanism.',
      opciones: [
        {
          texto:
            'Bring plural delegations of victims to the table, to speak face to face with those who harmed them.',
          retro:
            'In 2014, sixty victims traveled to Havana and sat across from the FARC and the Government. ' +
            'It was a turning point: it humanized the table, forced the negotiators to face the real cost ' +
            'of the war, and gave rise to the Comprehensive System of Truth, Justice, Reparation and ' +
            'Non-Repetition. Centering victims does not weaken a process: it anchors it morally.',
        },
        {
          texto: 'Receive their proposals in writing, but keep the table only between the armed parties.',
          retro:
            'Victims as "documentary input" perpetuate their exclusion. Comparative evidence (studies of ' +
            'agreements 1989-2011) shows that processes with meaningful social participation produce more ' +
            'durable agreements. A deal among armed elites, without society, is born an orphan.',
        },
        {
          texto: 'Postpone the victims’ issue until the end, when "the hard part is already settled".',
          retro:
            'Leaving victims for the end betrays how they are conceived: a formality, not the center. It ' +
            'is also a tactical error: truth and justice issues condition disarmament and political ' +
            'participation, so they will have to be opened anyway — but by then with no time or trust left.',
        },
      ],
    },
    justicia: {
      titulo: 'The dilemma of justice',
      texto:
        'The hardest knot of the process: what happens to the crimes committed over 32 years of war? ' +
        'The MIF says: "we are not negotiating to go to prison". The victims say: "there is no peace ' +
        'without justice". International law forbids amnestying war crimes and crimes against humanity.',
      opciones: [
        {
          texto:
            'A special tribunal: amnesty only for political offenses; grave crimes judged with restorative ' +
            'sentences in exchange for full truth.',
          retro:
            'This is the model of Colombia’s Special Jurisdiction for Peace: those who provide full ' +
            'truth and make reparations receive restorative sanctions (5-8 years of restricted liberty and ' +
            'reparative work); those who do not, up to 20 years in prison. It seeks the balance the Rome ' +
            'Statute demands: maximum justice compatible with peace. No one is fully satisfied — that is the ' +
            'mark of a real compromise. Part of the public will call it impunity: be ready to defend it.',
        },
        {
          texto: 'A general, unconditional amnesty: "clean slate" to end the war quickly.',
          retro:
            'General amnesties were the norm until the 1990s (Spain 1977, self-amnesties in the Southern ' +
            'Cone). Today they violate international law for grave crimes and carry a documented cost: ' +
            'without truth or sanction, the wounds pass between generations and international courts can ' +
            'reopen the cases, destroying the legal certainty the amnesty promised.',
        },
        {
          texto: 'Full ordinary justice: common prison for all those responsible, with no special treatment.',
          retro:
            'No armed group negotiates its own imprisonment: that demand amounts to asking for surrender, ' +
            'which after 32 years of war with no military victor will not happen. Transitional justice ' +
            'exists precisely because ordinary justice, designed for common crime, can neither process ' +
            'thousands of conflict crimes nor incentivize its end.',
        },
      ],
    },
    verdad: {
      titulo: 'Truth and memory',
      texto:
        'Alongside the tribunal, the parties discuss how to clarify what happened: why the war began, ' +
        'who financed it, what became of the disappeared. There are powerful sectors that the truth ' +
        'makes uncomfortable.',
      opciones: [
        {
          texto:
            'A non-judicial truth commission + a unit to search for the disappeared, with a territorial focus.',
          retro:
            'Truth commissions (South Africa 1996, Guatemala 1997, Peru 2001, Colombia 2017) do not ' +
            'replace judges: they build the shared account a society needs in order not to repeat. ' +
            'Separating it from the judicial sphere (what is said before the commission is not used in ' +
            'trials) encourages perpetrators to tell the whole truth. Searching for the disappeared is, ' +
            'moreover, a humanitarian obligation to the families.',
        },
        {
          texto: 'Leave the truth solely in the hands of the judicial processes, case by case.',
          retro:
            'Trials produce procedural truth about individual cases, not explanations of patterns, ' +
            'collective responsibilities, and causes. At their pace, clarifying 60,000 crimes would take ' +
            'centuries. Without a shared account, each sector will keep telling "its" war — the fuel of ' +
            'the next one.',
        },
        {
          texto: '"Look to the future": no commission, no emphasis on the past, so as not to reopen wounds.',
          retro:
            'Silence does not close wounds: it privatizes them. The Spanish experience (the "pact of ' +
            'forgetting") shows that repressed memory returns decades later, still inflamed. Societies do ' +
            'not choose between remembering and forgetting, but between processing the past or being ' +
            'governed by it.',
        },
      ],
    },
    ddr: {
      titulo: 'The weapons and the life after',
      texto:
        'The disarmament point arrives: 8,000 MIF combatants must lay down their weapons and return to ' +
        'civilian life. Many have spent 20 years at war; they know no other trade. The design of this ' +
        'point decides whether peace consolidates or whether new armed groups are born.',
      opciones: [
        {
          texto:
            'Comprehensive DDR: UN-verified laying down of arms + reintegration with productive projects, ' +
            'health, education, and community support.',
          retro:
            'DDR means Disarmament, Demobilization and Reintegration — and the R is the hardest and the ' +
            'most important. An ex-combatant with a life project does not return to the bush; an abandoned ' +
            'one is recruitable by the next group. The evidence (United Nations, cases from Central America ' +
            'and Africa) is clear: skimping on reintegration is very expensive in security terms.',
        },
        {
          texto: 'Fast disarmament in exchange for a one-time payment per combatant, with no long-term program.',
          retro:
            'One-off payments ("cash for guns") produce headlines and photos of melted weapons, but the ' +
            'money runs out in months and the war skills remain. In several Central American processes, ' +
            'ex-combatants without real reintegration ended up in organized crime. Disarmament is an event; ' +
            'reintegration is a decade.',
        },
        {
          texto:
            'Demand immediate, public surrender of weapons before implementing any other point.',
          retro:
            'Weapons are the only guarantee an insurgent group believes it has that what was agreed will be ' +
            'fulfilled. That is why successful disarmaments are gradual and simultaneous with ' +
            'implementation: in Northern Ireland, IRA decommissioning took 7 years after the Good Friday ' +
            'Agreement. Sequencing disarmament wrong can reverse the entire process.',
        },
      ],
    },
    genero: {
      titulo: 'Peace — for whom?',
      texto:
        'Women’s organizations point out that the war hit them in differentiated ways — sexual ' +
        'violence, displacement, heading households — and that there are almost no women at the table. ' +
        'They propose creating a gender body to review every agreement.',
      opciones: [
        {
          texto:
            'Create the Gender Sub-commission and increase women’s participation in both delegations.',
          retro:
            'The Gender Sub-commission of Havana (2014) was a world first: it reviewed every point of the ' +
            'agreement with a gender lens and included more than 100 specific measures. Quantitative ' +
            'evidence (studies of 40+ processes) indicates that meaningful women’s participation is ' +
            'associated with agreements more likely to be signed and to last more than 15 years. It is not ' +
            'a gesture: it is quality design.',
        },
        {
          texto: 'Include a general mention of equality in the agreement’s preamble.',
          retro:
            'Preamble mentions assign no one responsible, no budget, no targets: they are dead letter from ' +
            'day one. The difference between "taking gender into account" and a mechanism with a mandate is ' +
            'the difference between an intention and a policy. What is not institutionalized is not ' +
            'implemented.',
        },
        {
          texto: 'Reject the proposal: "peace benefits everyone equally, there is no need to segment it".',
          retro:
            'War does not hit everyone equally, and a peace blind to those differences reproduces the ' +
            'exclusions that fueled the conflict. UN Security Council Resolution 1325 (2000) recognizes ' +
            'exactly this: without women there is no sustainable peace.',
        },
      ],
    },
    'spoilers-nodo': {
      titulo: 'The enemies of peace',
      texto:
        'The agreement is close and the saboteurs activate: a political sector launches a fierce ' +
        'campaign ("they’re handing the country to terrorism"), and one MIF faction announces it ' +
        'will not abide by the deal. Both extremes need each other.',
      opciones: [
        {
          texto:
            'A dual strategy: dialogue with good-faith critics to adjust the text, and political isolation ' +
            'of the violent ones.',
          retro:
            'The literature on "spoilers" (Stedman) distinguishes legitimate critics — who want a different ' +
            'agreement — from total saboteurs — who want no agreement at all. The former are heard and ' +
            'brought in; the latter are isolated by depriving them of an audience. Confusing them is fatal: ' +
            'treating every critic as an enemy manufactures more enemies.',
        },
        {
          texto: 'Ignore the critics and speed up the signing before they gain strength.',
          retro:
            'Rushing to dodge criticism leaves the discontent intact and without a channel — and discontent ' +
            'without a channel votes, marches, or shoots. Colombia’s 2016 plebiscite (50.2% for No) ' +
            'showed the cost of underestimating the opposition: the agreement had to be renegotiated from a ' +
            'weakened position.',
        },
        {
          texto: 'Respond to the opposition campaign with equally harsh insults.',
          retro:
            'Polarizing in defense of peace is an oxymoron the public detects immediately. Every insult ' +
            'confirms the adversary’s narrative ("they despise us") and shrinks the political center ' +
            'every agreement needs to survive electoral cycles.',
        },
      ],
    },
    'refrendacion-nodo': {
      titulo: 'Sealing the pact',
      texto:
        'The final text is ready: 280 pages touching justice, weapons, victims, and participation. Now ' +
        'they must decide how it is approved. The Government wants a plebiscite to "armor it with the ' +
        'people’s voice". The polls are volatile and the campaign will be brutal.',
      opciones: [
        {
          texto:
            'Ratification by Congress, with broad public pedagogy of the agreement before and after.',
          retro:
            'Legislative ratification is constitutionally solid and less vulnerable to disinformation ' +
            'campaigns than a binary referendum on 280 pages. Its deficit: it can be perceived as ' +
            '"elite peace" — which is why mass pedagogy is not optional. After the 2016 No, Colombia ' +
            'renegotiated the text and ratified it via Congress.',
        },
        {
          texto: 'A national plebiscite: let the citizenry approve or reject the agreement at the ballot box.',
          retro:
            'Submitting a complex agreement to a Yes/No turns it into a plebiscite on the government of the ' +
            'day, accumulated hatreds, and fake news. Colombia 2016 and Brexit are twin warnings: the ' +
            'question being voted on is never the question on the ballot. If this path is chosen, demand ' +
            'months of pedagogy and an explicit plan B for a No — no one had one in 2016.',
        },
        {
          texto: 'Direct signing between the parties, with no ratification mechanism.',
          retro:
            'An agreement without ratification is left legally and politically naked: the next government ' +
            'can disown it claiming "nobody voted for it". Ratification is not a formality — it is the ' +
            'mechanism that turns a pact between enemies into a State policy that survives elections.',
        },
      ],
    },
    'pedagogia-nodo': {
      titulo: 'Explaining peace',
      texto:
        'Opinion studies reveal that 70% of citizens do not know what the agreement contains, and false ' +
        'versions circulate ("they’ll expropriate homes", "there will be total impunity"). Little ' +
        'communications budget is left.',
      opciones: [
        {
          texto:
            'Territorial pedagogy: simple versions of the agreement, trained community leaders, local radio, ' +
            'and face-to-face spaces.',
          retro:
            'Disinformation is fought with closeness, not only with data: people believe those they know. ' +
            'The winning formats are plain-language summaries, community radio stations, and in-person ' +
            'conversations where people ask what they are afraid to ask. Peace pedagogy is to the agreement ' +
            'what vaccination is to the epidemic: slow, massive, and vital. (This game is, in fact, an ' +
            'exercise in peace pedagogy.)',
        },
        {
          texto: 'A mass campaign in national media with celebrities and emotional advertising pieces.',
          retro:
            'Advertising reaches far but convinces little on issues ruled by fear: an ad does not answer a ' +
            'farmer’s concrete question about their land. In 2016, the No campaign openly admitted it had ' +
            'bet on audience-segmented outrage — and defeated the Yes’s institutional advertising. ' +
            'Emotion is contested face to face.',
        },
        {
          texto: 'Trust the text to "speak for itself": publish it in full and wait.',
          retro:
            'No one reads 280 pages, but everyone hears a rumor. The vacuum of explanation does not stay ' +
            'empty: the adversary fills it. Every peace agreement competes against its caricature, and the ' +
            'caricature wins in a landslide if no one contests it.',
        },
      ],
    },
    'implementacion-nodo': {
      titulo: 'The day after',
      texto:
        'The agreement was signed. The cameras are gone. Now come 15 years of implementation: reforms, ' +
        'reincorporation, transitional justice under way. History is ungrateful: about half of peace ' +
        'agreements relapse into violence within the first decade. The monitoring must be designed.',
      opciones: [
        {
          texto:
            'A monitoring commission with the parties + international verification + a multi-year budget ' +
            'protected by law.',
          retro:
            'Agreements do not fulfill themselves: they need institutions that measure, money that does not ' +
            'depend on each year’s fiscal mood, and external verifiers who attest (in Colombia: the UN ' +
            'Verification Mission and the Kroc Institute measuring every provision). Implementation is the ' +
            'longest and least glamorous phase — and where peace is really won or lost.',
        },
        {
          texto:
            'Leave implementation to the existing ministries, with no new structures: "that’s what the ' +
            'State is for".',
          retro:
            'Ordinary bureaucracies have ordinary priorities: without specific institutional owners, the ' +
            'agreement’s commitments compete — and lose — against the agenda of the day. Comparative ' +
            'implementation studies show agreements with dedicated monitoring mechanisms are fulfilled ' +
            'significantly more.',
        },
        {
          texto: 'Concentrate all resources in the first 2 years to show fast results.',
          retro:
            '"Frontloading" produces ribbon-cuttings, but peace plays out in year 8, when another ' +
            'government, with no photos to win, decides whether to keep paying the bills of the agreement ' +
            'its predecessor signed. That is why good agreements armor implementation by law and plan it ' +
            'over 10-15 years.',
        },
      ],
    },
    proteccion: {
      titulo: 'Protecting those who signed',
      texto:
        'First year of implementation: hitmen murder 2 ex-combatants in the reincorporation process and ' +
        'a community leader who was promoting the agreement in her territory. Panic spreads among the ' +
        'demobilized: "we signed our death sentence".',
      opciones: [
        {
          texto:
            'A robust security guarantees program: individual and collective protection, and dismantling ' +
            'of the criminal networks that kill.',
          retro:
            'Every murdered ex-combatant tells a thousand others that the State cannot protect them — the ' +
            'perfect argument to rearm. The atrocious precedent is the extermination of the Patriotic Union ' +
            'in Colombia (1980s: thousands of demobilized ex-guerrillas and members murdered), a wound that ' +
            'delayed peace by a generation. Security guarantees are not one more point of the agreement: ' +
            'they are its condition of possibility.',
        },
        {
          texto:
            'Treat the murders as common crime and let the local police investigate them case by case.',
          retro:
            'Treating systematic violence as isolated cases guarantees it continues: no one investigates the ' +
            'pattern, no one dismantles the structure. Violence against signatories and social leaders is ' +
            'political violence against the agreement itself, and requires a State response of the same level.',
        },
      ],
    },
  },

  codex: {
    'pre-negociacion': {
      titulo: 'Pre-negotiation and secret channels',
      categoria: 'How a process begins',
      definicion:
        'The exploratory — usually secret — phase in which the parties decide whether to negotiate, ' +
        'about what, where, and under what rules. It is often more decisive than the public negotiation.',
      enLaPractica:
        'Trusted envoys, discreet third parties, meetings abroad. The typical product is a "framework ' +
        'agreement" setting the agenda and rules. Without this phase, public tables are born without ' +
        'footing and collapse at the first crisis.',
      casoReal:
        'The Colombian process had ~20 months of secret meetings in Havana (2011-2012) before the public ' +
        'announcement. In Northern Ireland, the British Government kept a secret channel with the IRA for ' +
        'years while publicly saying "we don’t negotiate with terrorists".',
      paraReflexionar:
        'Is it legitimate for a democracy to negotiate in secret matters that affect all of society? What ' +
        'is gained and what is lost?',
    },
    mediacion: {
      titulo: 'Mediation and good offices',
      categoria: 'How a process begins',
      definicion:
        'Intervention by a third party accepted by the parties to facilitate communication, propose ' +
        'formulas, and accompany the process. The mediator does not decide: they create conditions for ' +
        'the parties to decide.',
      enLaPractica:
        'Mediators carry messages the parties cannot say to each other directly, draft "nobody’s" ' +
        'texts both can criticize without conceding, and absorb crises. Their capital is the trust of both ' +
        'parties: that is why impartiality is not decorative, it is operational.',
      casoReal:
        'Norway has facilitated processes in Colombia, Sri Lanka, the Philippines, and the Middle East ' +
        '(Oslo Accords). The Henry Dunant Centre and Swiss diplomacy facilitate discreet dialogues in ' +
        'dozens of conflicts.',
      paraReflexionar:
        'If a mediator threatens or pressures one of the parties, what do they lose? How is mediation ' +
        'between States like mediating a conflict between people?',
    },
    garantes: {
      titulo: 'Guarantor and accompanying countries',
      categoria: 'How a process begins',
      definicion:
        'States or organizations that attest to the process, safeguard partial agreements, and raise the ' +
        'diplomatic cost of breaching or abandoning the table.',
      enLaPractica:
        'They lend secure venues, fund the logistics, witness each agreement, and mediate in crises. Their ' +
        'mere presence changes the calculation: walking away from the table is no longer a bilateral snub ' +
        'but a slight to the international community.',
      casoReal:
        'In Havana: Cuba and Norway as guarantors, Chile and Venezuela as accompanying countries. In the ' +
        'Esquipulas accords (Central America, 1987), the Contadora Group played a similar role.',
      paraReflexionar:
        'Why would an enemy trust what its adversary signs? What mechanisms replace trust when it does not ' +
        'exist?',
    },
    agenda: {
      titulo: 'Designing the agenda',
      categoria: 'How a process begins',
      definicion:
        'The closed list of issues to be negotiated and the rules of the game (confidentiality, mechanics ' +
        'of agreements, spokespersons). It defines the size of the process: neither surrender nor ' +
        'refounding the country.',
      enLaPractica:
        'The rule "nothing is agreed until everything is agreed" allows progress point by point without ' +
        'what is conceded in one being held hostage in another. A good agenda addresses the causes of the ' +
        'conflict without trying to solve every national problem at the table.',
      casoReal:
        'Colombian contrast: Caguán (1999) agreed on 12 points with ~100 sub-issues and never agreed on ' +
        'anything; Havana (2012) agreed on 6 points and produced a final agreement in 4 years.',
      paraReflexionar:
        'What issues would you put on the peace agenda of a conflict you know? Which would you leave out, ' +
        'and why?',
    },
    dih: {
      titulo: 'International Humanitarian Law (IHL)',
      categoria: 'Humanitarian framework',
      definicion:
        'The body of rules that limits the means and methods of war and protects those who do not take ' +
        'part (civilians) or have stopped taking part (the wounded, detainees) in hostilities. Its core: ' +
        'the 1949 Geneva Conventions and their Protocols.',
      enLaPractica:
        'It applies to ALL parties to a conflict, whether they negotiate or not: it forbids attacking ' +
        'civilians, taking hostages, using anti-personnel mines, denying humanitarian access. In a peace ' +
        'process, early humanitarian agreements are often simply IHL put into practice.',
      casoReal:
        'The humanitarian agreements of the Colombian process (joint demining, releases, search for the ' +
        'disappeared) were built on pre-existing IHL obligations, with the ICRC as a neutral intermediary ' +
        'in many operations.',
      paraReflexionar:
        'If war causes suffering anyway, why does it matter that it has rules? What would happen without ' +
        'them?',
    },
    'principios-humanitarios': {
      titulo: 'The Fundamental Principles of the Movement',
      categoria: 'Humanitarian framework',
      definicion:
        'The 7 principles of the International Red Cross and Red Crescent Movement: humanity, ' +
        'impartiality, neutrality, independence, voluntary service, unity, and universality.',
      enLaPractica:
        'Neutrality (not taking sides in hostilities) and impartiality (assisting according to need, ' +
        'without discrimination) are not abstract moral stances: they are what allows crossing front ' +
        'lines, talking to all parties, and being accepted by all. A humanitarian actor who takes sides ' +
        'loses access — and with it, the ability to protect.',
      casoReal:
        'The ICRC has acted as a neutral intermediary in releases of people held by armed groups in ' +
        'Colombia, the Philippines, and dozens of conflicts, precisely because all parties trust its ' +
        'neutrality.',
      paraReflexionar:
        'Is neutrality the same as indifference? How is neutrality maintained in the face of atrocious ' +
        'acts without becoming complicit in silence?',
    },
    'medidas-confianza': {
      titulo: 'Confidence-building measures',
      categoria: 'Sustaining the table',
      definicion:
        'Reciprocal, verifiable, and usually simultaneous gestures that demonstrate willingness without ' +
        'requiring anyone to "give in first": releases, de-escalation, partial humanitarian agreements.',
      enLaPractica:
        'They resolve the central dilemma between enemies: both want peace but neither can risk the other ' +
        'deceiving them. Simultaneity and third-party verification replace the trust that does not yet ' +
        'exist. Each fulfilled gesture makes the next, larger one possible.',
      casoReal:
        'The joint humanitarian demining of El Orejón (2015): soldiers and FARC guerrillas demining the ' +
        'same field, years before the signing. Small in scale, enormous as a signal.',
      paraReflexionar:
        'Think of a personal or community conflict: what small, reciprocal "confidence measure" could ' +
        'unlock it?',
    },
    'cese-fuego': {
      titulo: 'Ceasefire and cessation of hostilities',
      categoria: 'Sustaining the table',
      definicion:
        'An agreement to suspend offensive actions (ceasefire) or all hostilities, including acts against ' +
        'the civilian population (cessation of hostilities). It can be unilateral, bilateral, temporary, ' +
        'or permanent.',
      enLaPractica:
        'Its success depends less on willingness than on design: zones and conduct defined with military ' +
        'precision, mechanisms to process incidents, and third-party verification. An ambiguous ceasefire ' +
        'generates more crises than open war, because every incident looks like betrayal.',
      casoReal:
        'The Colombian bilateral ceasefire (2016) had a tripartite Monitoring and Verification Mechanism ' +
        '(Government-FARC-UN) and protocols dozens of pages long. It survived incidents that would have ' +
        'destroyed an informal ceasefire.',
      paraReflexionar:
        'Why do you think many processes negotiate "in the midst of the conflict" instead of demanding ' +
        'the guns fall silent first?',
    },
    verificacion: {
      titulo: 'Monitoring and verification',
      categoria: 'Sustaining the table',
      definicion:
        'Mechanisms — usually with impartial third parties — that check compliance with what was agreed ' +
        'and process breaches technically, not politically.',
      enLaPractica:
        'They turn accusations ("they violated the agreement!") into case files (what happened, who, which ' +
        'protocol applies). This strips each incident of the power to destroy the whole process. Verifying ' +
        'long-term implementation too, with public data, keeps the pressure on those responsible.',
      casoReal:
        'The UN Verification Mission in Colombia and the Kroc Institute’s Barometer (which measures ' +
        'compliance with each of the agreement’s 578 provisions) are a world reference.',
      paraReflexionar:
        '"What is not measured is not fulfilled." Does this also apply to everyday agreements between ' +
        'people?',
    },
    spoilers: {
      titulo: 'Spoilers',
      categoria: 'Sustaining the table',
      definicion:
        'Actors who perceive peace as a threat to their power, ideology, or economy, and act to derail it ' +
        '— from inside or outside the table, with violence or with politics.',
      enLaPractica:
        'The theory (Stedman, 1997) distinguishes limited spoilers (who want a different agreement), ' +
        'greedy ones (who want more), and total ones (who want no agreement). Each type demands a ' +
        'different strategy: incorporate, negotiate, or isolate. The fatal error is treating every critic ' +
        'as a total spoiler — or a total spoiler as a good-faith critic.',
      casoReal:
        'The assassination of Yitzhak Rabin (1995) by an Israeli extremist opposed to Oslo, and the "Real ' +
        'IRA" bombings after the Good Friday Agreement, show that the extremes of both sides objectively ' +
        'ally against the center.',
      paraReflexionar:
        'Who loses from peace? Identifying that in any conflict explains much of its persistence.',
    },
    victimas: {
      titulo: 'Centrality of victims',
      categoria: 'The heart of the agreement',
      definicion:
        'The principle that victims’ rights — truth, justice, reparation, and non-repetition — are ' +
        'the axis of the agreement, not an accessory chapter.',
      enLaPractica:
        'It takes shape in direct participation (hearings, delegations to the table), in the design of the ' +
        'transitional justice mechanisms, and in reparation programs. Victims tend to be, against every ' +
        'stereotype, the sector MOST willing to reconcile — more than the political elites who speak in ' +
        'their name.',
      casoReal:
        'The 5 delegations of victims who traveled to Havana (2014) changed the tone of the negotiation. ' +
        'The resulting agreement created a comprehensive system (Special Jurisdiction, Truth Commission, ' +
        'Search Unit) built around their rights.',
      paraReflexionar:
        'Why do you think direct victims tend to support peace processes more than those who lived the war ' +
        'through television?',
    },
    'justicia-transicional': {
      titulo: 'Transitional justice',
      categoria: 'The heart of the agreement',
      definicion:
        'The set of judicial and non-judicial mechanisms with which a society processes mass crimes as it ' +
        'emerges from a war or dictatorship: special tribunals, truth commissions, reparations, and ' +
        'non-repetition reforms.',
      enLaPractica:
        'Its founding dilemma: full ordinary justice would make peace impossible (no one negotiates their ' +
        'own prison), and total impunity would make peace unworthy (and violates international law). ' +
        'Restorative formulas — reduced sanction in exchange for full truth and reparation — inhabit that ' +
        'narrow middle ground.',
      casoReal:
        'The Special Jurisdiction for Peace (Colombia): amnesty for political offenses, restorative ' +
        'sanctions of 5-8 years for confessed grave crimes, up to 20 years in prison for those who deny ' +
        'and are convicted at trial. Imperfect and attacked by both extremes — like almost any viable ' +
        'formula.',
      paraReflexionar:
        'How much justice are you willing to trade for how much peace? Who has the right to decide that ' +
        'trade: the victims, society, the judges?',
    },
    amnistias: {
      titulo: 'Amnesties: uses and limits',
      categoria: 'The heart of the agreement',
      definicion:
        'Legal pardon of certain offenses. Historically the standard tool for ending wars; today ' +
        'international law forbids it for war crimes, crimes against humanity, and genocide.',
      enLaPractica:
        'It remains legitimate (and necessary) for the political offense and related ones — rebellion ' +
        'itself — since without it no insurgent could reincorporate. The contemporary red line: atrocious ' +
        'crimes must have truth and sanction, even if restorative.',
      casoReal:
        'The self-amnesties of the Southern Cone (Argentina 1983, Chile 1978) were annulled decades later ' +
        'by national and international courts: the pacted impunity did not deliver the legal certainty it ' +
        'promised. The South African amnesty was conditional: full truth in exchange for pardon, case by ' +
        'case.',
      paraReflexionar:
        'Can a society "forgive" on behalf of the victims? What distinguishes an amnesty that builds peace ' +
        'from one that buys silence?',
    },
    'comision-verdad': {
      titulo: 'Truth commissions',
      categoria: 'The heart of the agreement',
      definicion:
        'Temporary, usually non-judicial bodies that investigate patterns of violence, listen to victims, ' +
        'and produce a documented account of what happened, with recommendations for non-repetition.',
      enLaPractica:
        'They do not replace judges: they complement them. Their product is not a sentence but a mirror — ' +
        'the public acknowledgment of what happened. Separating them from the judicial sphere (what is ' +
        'confessed before the commission is not used as evidence in trial) elicits truths no court would ' +
        'obtain.',
      casoReal:
        'South Africa (1996-1998, chaired by Desmond Tutu, with televised public hearings), Guatemala ' +
        '(CEH, 1999, which documented acts of genocide), Peru (CVR, 2003), Colombia (2018-2022, final ' +
        'report "There is a future if there is truth").',
      paraReflexionar:
        'What good is truth without prison? And prison without truth? Which of the two repairs more for a ' +
        'family searching for a disappeared relative?',
    },
    memoria: {
      titulo: 'Historical memory',
      categoria: 'The heart of the agreement',
      definicion:
        'The social and institutional work of remembering the conflict: museums, archives, ' +
        'commemorations, school pedagogy. The opposite of the "pact of forgetting".',
      enLaPractica:
        'Memory is neither revenge nor nostalgia: it is the narrative vaccine against repetition. Societies ' +
        'that do not process their past inherit it intact to the next generation, ready to be reused as ' +
        'fuel.',
      casoReal:
        'Colombia’s National Center for Historical Memory and its report "Basta Ya!" (2013); the ' +
        'memorials of Rwanda; the German contrast (active memory of Nazism) versus the long Spanish silence ' +
        'about the Civil War.',
      paraReflexionar:
        '"Remember so as not to repeat" — do you know cases where memory has been used, conversely, to keep ' +
        'hatred alive? What distinguishes a memory that heals from one that inflames?',
    },
    ddr: {
      titulo: 'DDR: Disarmament, Demobilization and Reintegration',
      categoria: 'From the rifle to civilian life',
      definicion:
        'The process by which combatants hand over weapons (disarmament), leave the military structure ' +
        '(demobilization), and build a sustainable civilian life (reintegration).',
      enLaPractica:
        'Disarmament is a logistical event; reintegration is a years-long transformation: income, mental ' +
        'health, education, community acceptance. Programs that neglect it produce recidivism and new armed ' +
        'groups. Sequence matters: gradual, verified disarmaments work better than spectacle surrenders.',
      casoReal:
        'In Northern Ireland, IRA disarmament took 7 years after the agreement. In Colombia, the UN ' +
        'verified the laying down of ~9,000 weapons in 2017; delays in the R (land, productive projects, ' +
        'security) remain the weak flank.',
      paraReflexionar:
        'If you were a 35-year-old combatant who entered the war at 15, what would you need in order not to ' +
        'return? What would you ask of the State and what of your community?',
    },
    'garantias-seguridad': {
      titulo: 'Security guarantees',
      categoria: 'From the rifle to civilian life',
      definicion:
        'The commitments and arrangements that protect the lives of those who lay down their weapons, of ' +
        'social leaders, and of communities, including dismantling the organizations that attack them.',
      enLaPractica:
        'They are the answer to an insurgent’s most rational fear: being exterminated after ' +
        'disarming. They include protection schemes, comprehensive State presence in the territories, and ' +
        'special investigation units. Their breach is the most direct predictor of rearmament.',
      casoReal:
        'The extermination of the Patriotic Union (Colombia, 1980s-90s: thousands of amnestied ' +
        'ex-guerrillas and members murdered after demobilizing) turned mistrust structural: it explains ' +
        'why the FARC negotiated 30 years later with such emphasis on guarantees.',
      paraReflexionar:
        'What happens to a peace process when those who signed are killed? Who benefits from each of those ' +
        'murders?',
    },
    genero: {
      titulo: 'A gender lens in agreements',
      categoria: 'A peace for all of society',
      definicion:
        'The analysis and measures that recognize that conflict affects women, men, and LGBTIQ+ people in ' +
        'differentiated ways, and that peace must respond to those differences to be complete.',
      enLaPractica:
        'It ranges from participation (women in delegations and mechanisms) to content (measures on sexual ' +
        'violence, access to land, the care economy). International framework: UN Security Council ' +
        'Resolution 1325 (2000) and the Women, Peace and Security agenda.',
      casoReal:
        'The Gender Sub-commission of Havana (2014-2016) reviewed the entire agreement: ~130 measures with ' +
        'a gender lens. Quantitative studies associate meaningful women’s participation with more ' +
        'durable agreements.',
      paraReflexionar:
        'If war hits differently, can peace be identical for everyone? Which groups in your own community ' +
        'would live "the same" crisis in very different ways?',
    },
    participacion: {
      titulo: 'Civil society participation',
      categoria: 'A peace for all of society',
      definicion:
        'The mechanisms through which the citizenry — victims, communities, churches, academia, business ' +
        'people, youth — influences the negotiation and the implementation.',
      enLaPractica:
        'Thematic forums, regional tables, hearings, thousands of written proposals. Participation does ' +
        'not reduce the table’s effectiveness: it gives it roots. "Elite" agreements, without social ' +
        'ownership, depend on the electoral luck of their signatories.',
      casoReal:
        'The thematic forums that fed each agenda point in Colombia; the South African constitutional ' +
        'process, with millions of citizen inputs, remains the gold standard.',
      paraReflexionar:
        'Is peace signed or built? What concrete role can a young volunteer play in a peace process?',
    },
    refrendacion: {
      titulo: 'Ratification of agreements',
      categoria: 'From paper to social pact',
      definicion:
        'The mechanism by which an agreement negotiated between the parties acquires broader political and ' +
        'legal backing: plebiscite, legislative approval, constituent assembly, or combinations.',
      enLaPractica:
        'It is a trade-off: the plebiscite gives the strongest legitimacy but risks everything on a Yes/No ' +
        'vulnerable to disinformation and the political climate of the moment. The legislative route is ' +
        'safer but can read as elitist. In both cases, without mass pedagogy there is no healthy ' +
        'ratification.',
      casoReal:
        'Colombia 2016: the plebiscite lost 50.2% to 49.8% with 63% abstention; the agreement was ' +
        'renegotiated and ratified via Congress. Northern Ireland 1998: simultaneous referendums in the ' +
        'two Irelands approved the Good Friday Agreement with 71% and 94% — preceded by intense pedagogy.',
      paraReflexionar:
        'Should a peace agreement be submitted to a popular vote? What happens if the majority votes No to ' +
        'the negotiated peace — and what does that say about how it was communicated?',
    },
    'pedagogia-paz': {
      titulo: 'Peace pedagogy',
      categoria: 'From paper to social pact',
      definicion:
        'The deliberate, massive effort to explain what an agreement contains, what it does not contain, ' +
        'and how it affects daily life — contesting the ground with disinformation.',
      enLaPractica:
        'Plain-language versions of the agreement, training of community multipliers, local radio, ' +
        'face-to-face conversations, games and simulations (like this one). The rule: the vacuum of ' +
        'explanation is always filled by the adversary, and every agreement competes against its ' +
        'caricature.',
      casoReal:
        'After the 2016 No, Colombia multiplied the territorial pedagogy of the renegotiated agreement. In ' +
        'Northern Ireland, the full text of the agreement was sent to every household before the ' +
        'referendum.',
      paraReflexionar:
        'This game is an exercise in peace pedagogy. Which concept changed the way you think? How would you ' +
        'explain it to someone in 2 minutes?',
    },
    implementacion: {
      titulo: 'Implementation: the decisive decade',
      categoria: 'From paper to social pact',
      definicion:
        'The phase — 10 to 15 years — in which what was signed becomes (or not) reforms, institutions, and ' +
        'real change. About half of peace agreements relapse into violence within the first decade.',
      enLaPractica:
        'It demands dedicated institutions, a multi-year budget protected by law, external verification ' +
        'with public data, and above all continuity across governments that did not sign the agreement and ' +
        'may want to bury it. Peace is won in year 8, not in the photo of the signing.',
      casoReal:
        'The Kroc Institute’s Barometer has measured every provision of the Colombian agreement since ' +
        '2016: implementation advances unevenly — high in disarmament, lagging in rural reform and security ' +
        'guarantees. Guatemala shows the counterexample: ambitious agreements (1996) widely unfulfilled.',
      paraReflexionar:
        'Why is it easier to sign peace than to fulfill it? What can the citizenry do during the 15 years ' +
        'of implementation?',
    },
  },

  finales: {
    'paz-sostenible': {
      titulo: 'A peace that takes root',
      descripcion:
        'Ten years later, Miravalle is no paradise — no country is — but the guns fell silent and remain ' +
        'silent. Ex-combatants have life projects, victims learned the truth, and the agreement survived ' +
        'two changes of government. The new generations argue their conflicts at the ballot box and in the ' +
        'streets, not in the mountains.',
      leccion:
        'You achieved the hardest balance: trust between enemies, verifiable security, justice for the ' +
        'victims, and social backing. No real process achieves everything — but those that come close ' +
        'share what you did: victims at the center, mechanisms instead of goodwill, and tireless pedagogy.',
    },
    'paz-fragil': {
      titulo: 'A fragile but living peace',
      descripcion:
        'The agreement was signed and, barely, it is being fulfilled. There are areas where peace is real ' +
        'and areas where it is still a promise. Every national election puts the process back in play. Even ' +
        'so: deaths fell sharply, and thousands of children grow up without knowing the war that marked ' +
        'their parents.',
      leccion:
        'Welcome to the most common outcome of real peace processes: imperfect, contested, reversible — and ' +
        'still, immensely better than war. Fragile peace is tended over decades; identify your lowest ' +
        'indicators to see which flanks were left open.',
    },
    'acuerdo-en-riesgo': {
      titulo: 'An agreement in intensive care',
      descripcion:
        'An agreement was signed, but it was born weak: entire sectors reject it, breaches pile up, and ' +
        'dissident groups already occupy the territories the MIF left behind. The international community ' +
        'tries to keep alive, with artificial respiration, what national politics lets die.',
      leccion:
        'A paper agreement without enough trust, security, or legitimacy enters the risk zone where half of ' +
        'all processes relapse. Review your decisions: where did you sacrifice the important for the urgent? ' +
        'Play again and try another path — in this, the game is kinder than history.',
    },
    recaida: {
      titulo: 'The war returns',
      descripcion:
        'The process collapsed. Each side blames the other; both prepare for the next offensive. One more ' +
        'generation will inherit the conflict, and the next negotiators — ten or twenty years from now — ' +
        'will have to start from an even deeper mistrust. The victims of the coming decade do not know it ' +
        'yet.',
      leccion:
        'This is how many real attempts end: Caguán, Sri Lanka, so many others. The causes almost always ' +
        'look alike: impossible preconditions, crises with no mechanisms to process them, victims sidelined, ' +
        'spoilers with no strategy. The good news: in this game you can try again. Countries can too, but ' +
        'they pay for each attempt in lives.',
    },
  },
};
