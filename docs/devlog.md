# Devlog — bitácora de construcción (solo + IA)

Bitácora fechada del desarrollo. Documenta **qué se hizo, por qué, y cómo**, incluyendo el
proceso de construcción asistido por IA. Es, además, material narrativo para el video y el
pitch: la historia de una persona joven levantando una plataforma educativa con IA.

> Formato: cada entrada = fecha · qué se construyó · decisiones · cómo se verificó.

---

## 2026-06-09 · Prototipo inicial del juego

- Motor de juego narrativo de decisiones en React + TypeScript + Vite (web estática, sin
  backend). Estructura: motor (`engine/`) separado del contenido (`data/`).
- Primer escenario completo: *El camino de Miravalle* — 17 nodos, 4 indicadores
  (Confianza, Seguridad, Justicia, Legitimidad), 4 finales, nodo de crisis condicional.
- Códex: 22 entradas educativas en 7 categorías (definición / práctica / caso real /
  pregunta de discusión).
- **Verificación:** `npm run build` sin errores; recorrido manual en navegador (inicio →
  decisión → retroalimentación → Códex).

## 2026-06-09 · Plan estratégico

- Replanteo: el objetivo no es "un buen juego" sino **ganar la convocatoria IFRC Limitless
  Peace** (prototipo + video → jueces internacionales → Davos). La narrativa manda sobre
  las features. Hoja de ruta por niveles de complejidad ligados al financiamiento
  (`docs/hoja-de-ruta.md`).

## 2026-06-09 · Internacionalización (i18n) ES/EN — Nivel 0

**Qué se construyó:** soporte bilingüe español/inglés en todo el juego (interfaz +
contenido profundo: nodos, opciones, retroalimentaciones, Códex, finales).

**Decisión de arquitectura (ver ADR-004):** separar *estructura* de *texto*. El español es
el idioma base y contiene la lógica del juego (efectos, ramificaciones, condiciones de los
finales) una sola vez. El inglés es una **capa de texto** (`data/en.ts`) que se superpone
por `id`. Si una entrada no está traducida, el sistema cae al español (fallback). Beneficios:
- La lógica del juego nunca se duplica → traducir no puede romper la mecánica.
- Un traductor (o una Sociedad Nacional) solo toca archivos de texto, sin programar.
- Agregar un idioma = un archivo de texto + un diccionario de interfaz. El motor no cambia.

**Piezas nuevas:**
- `i18n/lang.ts` — tipo de idioma, persistencia en `localStorage`, detección del navegador.
- `i18n/ui.ts` — diccionario de interfaz (botones, etiquetas) ES/EN.
- `i18n/LanguageContext.tsx` — provee idioma, diccionario y contenido a la app.
- `data/en.ts` — capa de traducción al inglés del escenario completo y el Códex.
- `data/content.ts` — combina estructura (es) + texto (idioma) y expone el contenido.

**Cómo se verificó:**
- `npm run build` (tsc + vite) sin errores.
- En navegador: al pulsar EN cambian título, subtítulo, rol, botones e indicadores;
  la preferencia persiste en `localStorage` y `<html lang>` se actualiza.
- Contenido profundo confirmado en inglés: nodo "The first contact", sus 3 opciones, la
  retroalimentación ("What real-world experience tells us…") y los chips del Códex
  ("Pre-negotiation and secret channels", "Mediation and good offices").
- Lógica intacta: indicadores y ramificaciones siguen operando igual en ambos idiomas.

**Pendiente / siguiente:** guardado de progreso de partida, "juice" visual, despliegue
público.

## 2026-06-10 · Documentación de ingeniería — Nivel 0

**Qué se construyó:** el marco de "proyecto de ingeniería documentado".

- `ARQUITECTURA.md` — documento de arquitectura completo: stack, principio motor/contenido
  (con diagramas), modelo de datos, flujo de estado, capa i18n, despliegue, extensibilidad.
- `decisiones/` — Registros de Decisiones de Arquitectura (ADRs), con índice y formato
  estándar (Estado · Contexto · Decisión · Consecuencias):
  - ADR-001 — Sin backend (aplicación 100% estática).
  - ADR-002 — Contenido como datos, separado del motor.
  - ADR-003 — Stack: React + TypeScript + Vite, CSS plano (con alternativas descartadas:
    Unity/Godot, Twine/Ink, vanilla JS).
  - ADR-004 — i18n: separar estructura (lógica) de texto (idioma).

**Por qué:** convierte "hice un juego" en "diseñé un sistema". Las decisiones quedan
trazables y revisables; un equipo nuevo (o un mentor del programa) puede continuar el
proyecto entendiendo el porqué de cada elección. Es, además, evidencia directa para la
candidatura.

**Pendiente / siguiente:** `guia-de-contenido.md` y `pruebas.md`; guardado de partida,
"juice" visual y despliegue público.

## 2026-06-10 · Modo Territorio — prototipo del builder (pivote "Terra Nil de la paz")

**La idea (de Diego):** un juego tipo Terra Nil donde restauras un territorio devastado por
la guerra construyendo tejido social — escuela, salud, espacio de culto, mercado, memorial —
con niveles inspirados en casos históricos.

**Decisiones de diseño tomadas:**
- **Híbrido builder + dilemas:** el sistema de decisiones del modo Mesa se convierte en el
  sistema de *eventos* del builder. Nada de lo construido se descarta.
- **Casos ficcionalizados + códex real:** niveles inspirados en procesos CERRADOS (Colombia,
  Irlanda del Norte, Sudáfrica, Guatemala) con nombres ficticios; el códex documenta el caso
  real. **Conflictos activos (p. ej. Palestina-Israel) NO son niveles jugables** — protege la
  neutralidad ante el Movimiento y a las víctimas. Decisión consciente y registrada.
- **El giro humanitario:** la victoria es el retiro — cuando el valle florece, tu equipo
  desmonta el campamento. "La señal del éxito humanitario es poder irse."

**Qué se construyó (prototipo, 1 nivel):**
- `builder/types.ts` + `catalogo.ts` — 7 edificios con costo, radio de aura y efectos sobre
  LOS MISMOS indicadores del modo Mesa (los dos modos comparten el motor de `engine/types.ts`).
- `builder/nivel-valle.ts` — nivel "El Valle de las Nieblas" (posconflicto rural, inspiración
  colombiana: PDET, desminado, retorno): mapa 10×7, 6 familias, 3 eventos-dilema.
- `builder/engine.ts` — lógica pura: auras (distancia Chebyshev), vitalidad por celda,
  retorno de familias (umbral 50), economía mensual, eventos, victoria.
- `components/Territorio.tsx` — grilla con tinte de vitalidad (CSS `color-mix`), paleta de
  construcción, HUD, modal de eventos con retro educativa, pantallas de intro y victoria.
- `components/MenuPrincipal.tsx` — menú de modos: "La Mesa" (narrativo) y "El Territorio"
  (estrategia, prototipo).

**Cómo se verificó (partida real en navegador):**
- Colocación de edificios descuenta fondos y propaga vitalidad (casa pasó de 0 → 10 → 37 → 50).
- Evento del mes 2 ("Los que dejaron las armas") se disparó, se resolvió, mostró retro
  educativa y desbloqueó la entrada DDR del códex (bilingüe automático: el chip salió en
  inglés porque el navegador estaba en EN — la integración códex ya es i18n).
- Tras 7 meses simulados: 2/6 familias retornadas, 3 entradas de códex, economía correcta.

**Límites conocidos del prototipo (deliberados):** textos del builder solo en ES (la
arquitectura i18n los soportará después); balance sin playtesting; sin arte (emoji + CSS);
victoria comprobada por lógica pero no jugada de punta a punta.

## 2026-06-10 · El Territorio pasa a 3D (Three.js / react-three-fiber)

**Pedido de Diego:** "falta una mejor animación, algo más 3D, interactivo".

**Qué se construyó:**
- `components/Tablero3D.tsx` — escena isométrica low-poly estilo Terra Nil hecha SOLO con
  primitivas de Three.js (cero assets externos, costo 0): casitas con techo a cuatro aguas
  y ventanas que laten al repoblarse, 7 edificios en miniatura (la escuela con bandera, el
  domo del espacio de encuentro, el obelisco del memorial con velas emisivas, la antena de
  la emisora…), escombros y señales de minas, río animado, niebla ambiental (el Valle de
  las Nieblas), sombras.
- **La restauración se VE:** las celdas interpolan de gris-muerto a verde-vivo según su
  vitalidad, y brotan árboles cuando supera 25/50/75 — la metáfora Terra Nil en pantalla.
- **Interactivo:** cámara orbitable (drag) y zoom (rueda), hover que ilumina la celda,
  previsualización del aura del edificio seleccionado antes de colocarlo, y animación de
  "brote" (ease-out-back) al construir o al retornar una familia.
- **Ingeniería:** el tablero 3D es un chunk separado (lazy import): la app principal queda
  en ~95 KB gzip y los ~240 KB de Three.js solo se descargan al entrar al Territorio.
  La lógica del juego (`builder/engine.ts`) no se tocó: solo cambió la capa de pintura.

**Verificación (en navegador):** colocación por raycast confirmada (fondos 120→95→60),
evento del mes 2 disparado sobre la escena 3D, rechazo correcto de construir sobre
escombros, vitalidad verde visible alrededor de los edificios.

**Deuda conocida:** los clics sintéticos de prueba requieren offsetX (r3f); el balanceo
de cámara inicial podría encuadrarse mejor en móvil; sin partículas aún (post-premio o
Fase A si sobra tiempo).

## 2026-06-10 · El Jardín de la Memoria — modo de historias reales

**Pedido de Diego:** "quiero algo que también les dé historia" (inspirado en su lectura de
*Enigma Israel* y la figura de Yitzhak Rabin: el general que hizo pacto tras pacto y fue
asesinado por un extremista de su propio pueblo).

**Qué se construyó:**
- `data/historias.ts` — 6 historias reales de artesanos de la paz, escritas con tono
  literario y datos verificados (citas textuales solo cuando están bien documentadas):
  Rabin, Mandela, John Hume, Betty Bigombe, las víctimas que viajaron a La Habana,
  y Jo Berry & Pat Magee. Cada una con proceso/años, lección y conceptos del códex.
- `components/Historias.tsx` — jardín 3D nocturno: 6 estelas de piedra con llamas que
  titilan (luz puntual animada), placas con nombres (texturas canvas, sin fuentes
  externas), árboles, sendero, 14 luciérnagas flotantes, cámara orbitable. Clic en una
  llama → modal con la historia.
- Tercera tarjeta en el menú ("La Memoria" / "The Memory"), carga diferida: Vite comparte
  el chunk de Three.js entre Territorio y Jardín (la app base sigue en ~95 KB gzip).
- `docs/fuentes.md` ampliado con las fuentes de cada historia.

**Decisión editorial:** las historias son REALES con nombre propio (a diferencia de los
niveles jugables, que son ficción). Contar la historia verdadera de Rabin no gamifica un
conflicto activo: honra a un constructor de paz documentado. La regla se mantiene: se
juega la ficción, se lee la historia.

**Verificación (navegador):** menú con 3 tarjetas; jardín renderiza (estelas, llamas,
nombres, luciérnagas) en EN y ES; clic en la estela de Rabin abre "El general que eligió
la paz" con sus 3 párrafos y la cita. Lo que el jugador aprende por sistemas en La Mesa
(saboteadores) aquí lo siente como biografía.

**Pendiente:** historias en inglés (estructura lista, falta la capa EN); 2-3 historias
más (Mo Mowlam, Pastora Mira, Desmond Tutu) si el playtest pide variedad.

## 2026-06-10 · Tensión + ecos históricos dentro de la partida

**Feedback de Diego:** "al principio me entusiasmó, luego se volvió aburrido" — nada malo
podía pasar. Y "la idea de las historias es meterlas EN la historia", no en una galería.

**Sistemas de tensión añadidos (motor + nivel):**
- **Mantenimiento:** cada edificio cuesta 2 fondos/mes. Construir de más sin mercados
  lleva a ingreso negativo (alerta visible). Malas decisiones de recursos ahora duelen.
- **Eventos condicionales** (el estado del valle los provoca, no el calendario):
  - *La incursión* (seguridad < 40 desde el mes 3): grupo armado disidente; si no pagas
    protección, **destruye el edificio más valioso** (la celda vuelve a escombros, la
    vitalidad cae y pueden huir familias retornadas — consecuencia visible en el mapa 3D).
  - *El campo que nadie limpió* (minas sin desminar al mes 6): un niño herido. El
    desminado ya no es opcional-para-después.
- **Nuevo evento fijo:** *Las lluvias se llevan el vado* (mes 5) — crisis de recursos pura.
- **Derrota:** si un indicador cae a ≤10, el valle colapsa (pantalla "El valle vuelve a
  romperse" con lección sobre cómo fracasan las reconstrucciones reales: por acumulación).
- **Alertas en HUD:** seguridad baja / minas activas / gastos > ingresos — la amenaza se
  ve venir, que es lo que genera tensión real.

**Ecos históricos (integración historias↔juego):** cada evento puede llevar un `eco` —
tarjeta "🕯️ Eco histórico" en la retroalimentación que conecta el momento jugado con la
historia real y abre su modal completo: excombatientes→Mandela, memorial→Jo Berry & Pat
Magee, amenaza a lideresa→Rabin, lluvias→Bigombe, incursión→Hume. `HistoriaModal` se
extrajo como componente compartido entre el Jardín y el Territorio.

**Decisión sobre "nivel con palestinos y judíos" (propuesta de Diego):** se mantiene la
regla (conflictos activos no jugables). Alternativa aprobada para nivel 2: "La ciudad del
puente", inspirada en Mostar (Bosnia) — ciudad dividida entre dos comunidades, puente
destruido y reconstruido. Misma tensión intercomunitaria, proceso cerrado.

**Verificación:** test del motor con vite-node (`scripts/test-tension.ts`): 14/14 ✓
(colocación, mantenimiento, incursión condicional, destrucción con mensaje, accidente de
mina, derrota, ecos). En navegador: alerta de seguridad visible, evento mes 2 con eco de
Mandela, incursión en mes 3, eco→historia completa de Hume. Nota: los clics sintéticos
sobre el canvas 3D se volvieron inestables tras una pérdida de contexto WebGL en HMR —
por eso el motor ahora tiene test propio (mejor ingeniería, de todos modos).

**También:** `docs/prompt-diseno-ui.md` — prompt listo para que Diego genere la identidad
visual con Claude (3 direcciones de arte → tokens CSS → tipografía → componentes → logo),
con restricción explícita de no parecerse al emblema protegido del Movimiento.

## 2026-06-11 · Identidad visual "Vela y Tinta" (handoff de Claude Design)

**Flujo:** Diego generó el design system en claude.ai/design a partir del repo público
(usando `docs/prompt-diseno-ui.md`), eligió la dirección **"A · Vela y Tinta"** entre las
tres exploradas (B "Amanecer en el Valle", C "Archivo de la Paz") y exportó el handoff.
Se implementó aquí lo que la dirección define:

- **Paleta refinada:** fondo más profundo (`#11141d`), superficies `#1b1f2a`/`#252a38`,
  tinta más cálida (`#ece7d8`), ámbar más luminoso (`#ecb24f`, hover `#d9a13f`),
  borde `#363c4d`. Tintes translúcidos actualizados al nuevo ámbar.
- **Tipografía editorial (Google Fonts):** Newsreader 500 para los momentos display
  (títulos de juego, nodos, finales, historias) + Source Serif 4 para toda la lectura.
  Georgia queda como fallback.
- **Halos de vela:** glow ámbar en el botón principal, hover de opciones, título del
  juego, jardín y barra de legitimidad (tokens `--halo-*`). "Todo lo importante ocurre
  alrededor de la vela."
- **Grano de papel:** textura sutil (SVG feTurbulence, opacidad 0.045) sobre la escena.
- **Fondo:** brillo radial reposicionado (50% -10%) con `--fondo-brillo: #1c2030`;
  el tablero 3D ajustado al nuevo fondo.
- Tokens de referencia del design system guardados en `docs/design-system/` (colores,
  tipografía, espaciado, base + la exploración de direcciones).

**Verificación:** build limpio; en navegador, menú y pantalla de inicio muestran
Newsreader con halo, Source Serif 4 en lectura, nueva paleta y grano.

## 2026-06-11 · Despliegue público en Vercel — el juego ve la luz 🚀

- **Producción:** https://limitless-peace.vercel.app (proyecto `limitless-peace`,
  hosting gratuito, HTTPS, CDN global).
- **CI/CD:** el proyecto quedó conectado al repo de GitHub — cada push a `main`
  despliega producción automáticamente; cada rama genera URL de preview.
- **Dominio propio:** `peace.diegoquinde.com` agregado al proyecto; pendiente solo
  el registro DNS en Cloudflare (A `peace` → `76.76.21.21`, DNS only).
- **Costo: 0.** No hay "hosting que contratar": la app es estática y Vercel la sirve
  gratis. El presupuesto de dominio puede reservarse para un dominio de marca
  (p. ej. limitlesspeace.org) si la candidatura lo amerita.
- Hito del Nivel 0 de la hoja de ruta: **URL pública jugable** ✓

## 2026-06-12 · peace.diegoquinde.com en vivo

Registro A creado en Cloudflare (DNS only), certificado emitido con `vercel certs issue`.
**https://peace.diegoquinde.com** responde 200 con el juego. URL definitiva hasta que la
candidatura amerite dominio propio de marca.

## 2026-06-12 · Doctrina humanitaria real + animaciones de eventos + diario

**Pedidos de Diego:** edificios según lo que la Cruz Roja realmente despliega en crisis;
la base del jugador como puesto humanitario; animaciones cuando pasan cosas (las lluvias);
tipografía Poppins/Roboto; aprovechar la pantalla en desktop.

- **Catálogo anclado a doctrina IFRC (ERU):** nueva planta potabilizadora 💧 (ERU WatSan;
  descripción cita el estándar Esfera de 15 L/persona/día) y centro de distribución de
  alimentos 📦 (ERU Relief: imparcialidad). Nueva entrada del códex: "La caja de
  herramientas humanitaria (ERU)" (23 entradas). Fuentes: catálogo ERU de IFRC + Manual
  Esfera, documentadas en fuentes.md.
- **Base humanitaria ⛺ (ERU Base Camp):** pre-instalada al iniciar (carpa neutra SIN
  emblema — protegido por los Convenios de Ginebra), irradia la primera vitalidad del
  valle, no paga mantenimiento, la incursión nunca la ataca. La victoria-retiro ahora es
  literal: el campamento que se desmonta existe en el mapa desde el mes 1.
- **Animaciones de eventos en el 3D:** lluvia (90 gotas) cae sobre el valle durante "Las
  lluvias se llevan el vado"; humo y brasas se elevan del edificio destruido tras la
  incursión. Motor: nuevo estado `efectoVisual` (lluvia/ataque) que el tablero consume.
- **Diario del valle (desktop ≥1180px):** registro cronológico autogenerado — base
  instalada, construcciones, escombros/desminado, familias que retornan, eventos y la
  decisión tomada, destrucciones. El Territorio usa layout ancho (1280px) con tres
  columnas: tablero · diario · paleta.
- **Tipografía:** Poppins (display, 600) + Roboto (lectura) reemplazan a las serif del
  design system por pedido directo de Diego.

**Verificación:** build limpio; 14/14 tests del motor (la base queda excluida de
mantenimiento y de ataques); en navegador a 1400px: carpa con vitalidad inicial, 9
edificios + 2 acciones en paleta, diario con su primera entrada, Roboto activo.

## 2026-06-12 · Fotos y enlaces en la Memoria, salida de La Mesa, dificultades y primera cadena causal

**Pedidos de Diego:** fotos/enlaces en las historias; botón para salir de La Mesa; modos
principiante/libre/difícil; y que las cosas "tengan lógica" (aluvión → potabilizadora o
enfermedades) — con análisis de gamificación sistémica.

- **Jardín de la Memoria:** cada historia ahora tiene foto real (Wikimedia Commons,
  licencias libres, URLs estables vía API REST de Wikipedia) y sección "🔗 Para
  profundizar" (Wikipedia, Nobel, Building Bridges for Peace, JEP/Comisión de la Verdad).
- **Bugfix descubierto y resuelto:** el jardín 3D quedó en negro (regresión silenciosa) —
  los `<sprite>` con CanvasTexture dejaron de renderizar la escena en three r184.
  Bisección empírica (escena mínima → jardín sin placas → culpable: PlacaNombre);
  reescrito como plano con billboard manual (`quaternion.copy(camera)`) + SRGBColorSpace.
  Lección de ingeniería: verificar visualmente TODAS las escenas tras cada refactor.
- **La Mesa:** botón "← Menú" visible en la cabecera (antes solo el logo, indescubrible).
- **Dificultades** (`builder/dificultad.ts`): 🌱 Principiante (170 fondos, +26/mes,
  mantenimiento 1, incursión <28) · 🕊️ Libre (diseñada) · 🔥 Difícil (95, +16/mes,
  mantenimiento 3, incursión <48). Selector en la intro del Territorio; verificado en
  navegador (Difícil arranca con 95 y +16/mes).
- **Primera cadena causal implementada:** aluvión (mes 5) sin planta potabilizadora →
  evento "El agua que enferma" (mes 7+). Construir agua a tiempo lo PREVIENE por completo.
  `ContextoEvento` ahora expone `vistos`/`hayAgua`: cada cadena nueva es un campo + un
  evento condicional. Retro doctrinal: la secuencia inundación→agua contaminada→brote y
  por qué WatSan se despliega antes del brote.
- **`docs/analisis-sistemas.md`:** análisis pedido por Diego — cadenas causales propuestas
  (retorno frágil, reclutamiento juvenil), terreno con elevaciones y ubicación segura del
  centro de distribución (nivel 2), y el "modo Expediente" para gamificar procesos reales:
  Irlanda del Norte como primer candidato y ETA como caso especial (final sin acuerdo;
  requiere revisión experta y la lectura pendiente de Diego). Prioridades impacto÷esfuerzo.

## 2026-06-12 · Expediente Irlanda del Norte + cadenas causales completas

**Contexto:** Diego compró *No digas nada* (Keefe) — el libro de los Troubles y la memoria.
Sincronía perfecta para ejecutar las prioridades 2 y 3 del análisis sistémico.

- **Cadenas causales 2 y 3 (modo Territorio):**
  - *La canasta vacía* (familias ≥2 + sin centro de alimentos, mes 8+): el retorno sin
    seguridad alimentaria es una visita, no un retorno.
  - *Los que rondan a los muchachos* (sin escuela ni cancha, mes 9+): la tarde vacía es
    el primer reclutador. Ambas PREVENIBLES construyendo a tiempo — igual que el brote.
  - Tests del motor: 17/20 → ahora 20 verificaciones, incluida la prevención (potabilizadora
    construida → el brote NO ocurre).
- **Nuevo modo: 📂 El Expediente — "Irlanda del Norte: el camino al Viernes Santo".**
  Historia real, decisión por decisión: 7 escenas fechadas (Hume–Adams 1988, el canal
  secreto 1990-93, la precondición del desarme 1995, Sinn Féin a la mesa 1997, los presos
  1998, los referendos, Omagh). El jugador decide ANTES de saber qué ocurrió; luego el
  expediente "se abre": qué se decidió, qué pasó, y la lección — **incluida la escena 3,
  donde la decisión histórica fue un error** (la precondición congeló el proceso y costó
  Canary Wharf). Cierre con coincidencias X/7, recomendación de *No digas nada* y enlaces
  (Acuerdo de Belfast, CAIN). Cuarta tarjeta en el menú. Arquitectura: datos puros
  (`data/expediente-irlanda.ts`) + componente liviano; un expediente nuevo = un archivo.
- **Verificación:** build limpio; 20/20 tests; en navegador: 4 tarjetas, escena 1 jugada,
  veredicto "✓ Coincidiste", revelación y chips del códex funcionando.
- **Pendiente música:** Diego compondrá el fondo (Logic/Audition/AI). Integración lista
  para recibir un loop (toggle 🔊, apagado por defecto para talleres).

## 2026-06-12 · Rediseño del Territorio (tablero protagonista) + onboarding + consultoría UX

**Pregunta de Diego:** "a mí me entusiasma como voluntario — ¿pero a otra persona?"
Respuesta honesta y plan completo en `docs/consultoria-ux.md`. Implementado hoy:

- **Tablero protagonista:** el valle pasa de 480px fijos a hasta 60% de la pantalla
  (máx. 720px); app a 1380px en desktop. La construcción dejó de ser columna lateral:
  ahora es **barra horizontal de chips** bajo el tablero (patrón RTS) con nombres cortos
  (`corto` en el catálogo) y tooltips con la descripción completa. Diario a la derecha.
- **Tutorial contextual de primera vez** (3 pasos que reaccionan al estado real del juego:
  elegir herramienta → colocar cerca de casas → avanzar mes). Saltable; no reaparece
  (localStorage `lp-tutorial-territorio`).
- **Meta siempre visible:** chip 🎯 en HUD (familias X/meta · indicador mínimo /55, verde
  al cumplirse) — la condición de victoria ya no vive solo en la intro.
- **Herramienta activa explicada** en la línea de estado al seleccionarla.

**Hallazgo de verificación importante:** los lienzos 3D aparecían "en blanco" en las
verificaciones — tras bisección (escena mínima ✓) y diagnóstico final, la causa es
ambiental: **las pestañas en segundo plano congelan requestAnimationFrame** (el panel de
preview y las pestañas MCP de Chrome reportan `visibilityState: hidden`), así que Three.js
nunca dibuja un frame ahí. El juego renderiza correctamente en pestañas visibles. (Esto
también reinterpreta el "bug del sprite" del jardín: el billboard nuevo se queda — es
robusto — pero el sprite probablemente era inocente.) Verificación funcional de hoy por
DOM: tutorial paso 1 visible, 11 chips, HUD con meta, layout correcto en captura.

## 2026-06-12 · Listo para playtest público: gancho inmediato + reporte de bugs

Las tres piezas para que Diego invite a sus seguidores:

- **Intros de ~40 palabras**: Mesa y Territorio abren con un gancho de dos líneas y botón
  de acción inmediato; la historia completa, el rol y las reglas viven en un plegable
  "¿Cómo se juega?". El jugador frío ya no lee 150 palabras antes de tocar nada.
- **La primera familia vuelve en <2 minutos**: nueva regla del motor — la PRIMERA familia
  del valle retorna con vitalidad 35 ("la esperanza no espera") y, una vez retornada,
  cualquier familia solo se va si cae bajo 35 (histéresis: volver cuesta más que quedarse).
  Con 2 edificios bien puestos el primer 🏠 ocurre en el mes 1. Tests: 22/22 ✓ (incluida
  la regla de la primera y que las celdas de escombros rechazan colocación).
- **🐞 Botón "Reportar"** flotante en todos los modos: textarea en lenguaje natural +
  contexto técnico automático (modo, URL, pantalla, navegador) → "Enviar por correo"
  (mailto prellenado) o "Copiar para WhatsApp". Cero registro, cero backend — pensado
  para playtesters que no saben qué es GitHub.

**Verificación:** build limpio; 22/22 tests del motor; DOM verificado (ganchos, plegables,
modal de reporte con ambos botones, 3 dificultades intactas).

## 2026-06-12 · Sistema de música listo (a la espera de la guitarra de Diego)

Decisión: la música será **guitarra grabada por Diego** (pulida en Logic) — coherencia con
"la paz es artesanía", sonido humano que encaja con Vela y Tinta, y licencia 100% propia
ante el jurado. Implementado el sistema receptor:

- `components/BotonMusica.tsx`: botón flotante 🎵 que SOLO aparece si existe
  `/audio/tema.m4a`; apagado por defecto (talleres), fade in/out suave, volumen 35%,
  preferencia en localStorage.
- `public/audio/LEEME.txt` con las specs del loop (60–120 s sin costura, 70–85 bpm,
  M4A ~128 kbps, ~-18 LUFS). Integrar la música = soltar un archivo, cero código.

Verificado: el botón permanece oculto sin archivo; build limpio.

## 2026-06-12 · Tocar para construir (con OK), espacio en el footer y bono del mercado

Tres pedidos de Diego del feedback de uso:

- **Espacio inferior:** los botones flotantes 🎵/🐞 ya no tapan contenido — `.app` con
  padding-bottom 5rem y footer con margen. Ahora se puede interactuar con lo de abajo.
- **Menú al tocar la celda (con OK):** además de la barra inferior, ahora **tocas una
  celda del valle y se abre un menú** "¿Qué construir aquí?" con todos los edificios; al
  elegir uno se resalta, muestra su descripción y el botón OK pasa a "✓ Nombre (costo)"
  (deshabilitado si no alcanza). En **escombros** y **minas**, el menú ofrece quitarlas
  (Limpiar / Desminar) con su OK. Mucho más descubrible en móvil/touch que el flujo
  "elige herramienta → toca celda" (que se conserva). Verificado en Chrome real:
  construir Encuentro desde el menú descuenta fondos, sube confianza y registra en el diario.
- **Bono comunitario del mercado:** si hay al menos un mercado, los recursos se recuperan
  **1.5× más rápido** (la economía local reactivada). Aplicado al ingreso neto positivo;
  descripción del mercado actualizada. Test: ingreso 28 → 42 con mercado.

**Verificación:** build limpio; 24/24 tests del motor (incluido el bono del mercado);
flujo del menú de celda confirmado end-to-end en navegador real.

## 2026-06-13 · Rediseño "cockpit": el Territorio cabe en una sola pantalla (sin scroll)

**Pedido de Diego:** en la Mac el modo Territorio hacía scroll — quería todo en una pantalla
fija "como un footer siempre presente", y un rediseño más gamificado de indicadores y
acciones (el mapa lo ama, se queda).

- **Layout cockpit (sin scroll):** la fase de juego del Territorio ahora es un contenedor
  `position: fixed; height: 100dvh` con `display:flex` en columna y `overflow:hidden`.
  Filas: barra superior compacta · stat pods · **mapa (flex:1, protagonista)** · footer de
  construcción. Verificado: `scrollHeight === clientHeight` (cero scroll) en escritorio.
- **Indicadores gamificados (stat pods):** de barras horizontales planas a 4 "pods" estilo
  HUD de videojuego — icono (🤝🛡️⚖️🏛️), nombre, valor grande en Poppins, barra inferior
  de color y borde lateral del color del indicador; pulso rojo cuando cae bajo 30.
- **Recursos como píldoras** en la barra superior (📅 mes · 💰 fondos+ingreso · 🎯 meta),
  y la barra de construcción convertida en **chips con scroll horizontal** + botón
  "Avanzar mes" fijo a la derecha (siempre visible, nunca se va con el scroll).
- **Overlays sobre el mapa:** tutorial, alertas y la pista de ayuda flotan sobre el valle
  (no ocupan filas propias) para dar el máximo espacio al mapa.
- **Móvil:** stat pods a 2 columnas, nombres ocultos, diario oculto — el mapa manda.
- Los botones flotantes 🎵/🐞 suben por encima del footer del cockpit (`:has(.cockpit)`).

**Verificación (Chrome real):** cockpit sin scroll; construir vía menú de celda dentro del
cockpit (Encuentro: confianza 30→40, fondos 120→95, diario actualizado, verde creciendo);
24/24 tests del motor siguen en verde.

## 2026-06-13 · Terreno con relieve, tooltips "qué cambia" y fuera el Encuentro

Tres pedidos de Diego:

- **Espacio de culto y encuentro retirado** del nivel del valle (queda en el catálogo de
  tipos para niveles futuros). La barra pasa de 9 a 8 edificios construibles; tutorial,
  tests y textos actualizados.
- **Terreno con elevaciones y valles:** cada celda tiene ahora una `elevacion` (0–3)
  calculada de forma determinista con dos ondas suaves; el río corre por el fondo del
  valle (siempre 0). El tablero 3D terracea los pilares (escalón 0.34) y eleva edificios,
  casas, vegetación y la previsualización del aura a la altura de su celda. Es visual por
  ahora —da carácter al mapa— y deja montada la futura mecánica de "ubicación segura"
  por elevación (ver `docs/analisis-sistemas.md`).
- **Tooltips "qué cambia":** al pasar el cursor por un edificio aparece un panel con su
  nombre, costo, los efectos como chips de color (+5 Seguridad, +3 Legitimidad…) y una
  frase en lenguaje claro (campo `porque` en el catálogo): p. ej. agua = "previene los
  brotes de enfermedad tras una inundación". El mismo texto `porque` se muestra en el
  menú de celda (touch/móvil, donde no hay hover).

**Verificación (Chrome real):** terreno con colinas/vaguadas y río hundido visible;
tooltip de Agua (+5 Seguridad, +3 Legitimidad, frase de prevención) y de Mercado
(+4 Legitimidad, +10 fondos/mes, bono 1.5×); Encuentro ausente de la barra. 24/24 tests
del motor en verde; build limpio.

## 2026-06-13 · La Mesa cinematográfica (handoff 2 de Claude Design)

**Flujo:** Diego pidió a Claude Design mejorar la interfaz; el diseñador exploró un
rediseño de "Vela y Tinta" y, al abrir el repo real, descubrió que el Territorio ya era
el builder 3D y **advirtió explícitamente que portar su mapa 2D sería un error**. Lo
genuinamente aplicable era el rediseño de **La Mesa**. Implementado aquí (visual, fiel al
contenido real, scopeado a `.mesa-escenario` para no tocar Territorio/Expediente/Memoria):

- **Camino de fases:** la fila de chips pasa a un sendero de faros (puntos 0–4 + líneas);
  el activo brilla en ámbar, los completados encendidos. La fase se nombra en el eyebrow
  de la escena, así que el camino solo lleva números (sin solapamientos de etiquetas largas).
- **Signos vitales:** indicadores restilizados — valor grande en Poppins, barra fina con
  glow del color del indicador, delta animado (+10 verde / −3 rojo). Aplica también a las
  pantallas de final.
- **Escena de decisión:** eyebrow + título display con halo + texto centrado; opciones
  como **tarjetas con badge de letra A/B/C**, borde-acento e elevación al hover.
- **Retro cinematográfica:** brasa ámbar, "TU DECISIÓN" + cita en cursiva display,
  divisor, chips del Códex con 🕊, botón principal con glow.
- Halo ámbar que respira + viñeta detrás de la escena (`respira` keyframe).

**No portado (a propósito):** el mapa 2D de regiones del prototipo (el Territorio real es
el builder 3D) y el elemento de "dos voces enfrentadas" por nodo — requiere autoría de
`vozA`/`vozB` por nodo en ES+EN; queda como mejora opcional con visto bueno de contenido.

**Verificación (Chrome real):** menú → La Mesa → escena con faros, vitales, título display
y 3 tarjetas A/B/C; al elegir, indicadores con deltas y retro cinematográfica con chips de
Códex. Build limpio.

## 2026-06-13 · Intro con vela y final cinematográfico (resto del handoff "Vela y Tinta")

Diego re-compartió el design system; del prototipo quedaban por portar la intro y el final
(La Mesa ya se hizo). Implementado (contenido real intacto):

- **Intro de La Mesa:** vela encendida que respira (`.vela-grande`, keyframe `flamea`) sobre
  el título, con el halo ámbar de `.mesa-escenario` y el título en fuente display con glow.
  Se conserva el gancho de 2 líneas y el plegable "¿Cómo se juega?".
- **Pantalla final:** hereda el halo respirante de `.mesa-escenario` y el título pasa a
  display más grande, manteniendo descripción, lección, indicadores y estadísticas reales.

**No portado (a propósito):** el panel flotante "✦ Dirección de arte" (herramienta del
diseñador, no de producción) y el mapa 2D de regiones (el Territorio real es el builder 3D,
como advirtió el propio diseñador).

**Nota:** el zip "adjunto" no llegó al sistema de archivos; es el mismo design system del
handoff anterior (hash Mp1dQ7…), del que esta entrega completa las pantallas faltantes.

**Verificación (Chrome real):** intro de La Mesa con vela respirando, título display y halo;
build limpio.

## 2026-06-15 · El valle se vuelve un diorama en su mundo (handoff 3 de Claude Design)

**Lo que traía el paquete:** el diseñador (a) reconstruyó módulos del handoff con contenido
PLACEHOLDER para que compilara (5 historias Gbowee/Hume/Bigombe/Menchú/Santos, 4 nodos, 9
conceptos) — **NO portado: nuestro contenido real es más rico (6 historias, 17 nodos, 23
conceptos)**; y (b) un nuevo prototipo "Territorio 3D" que rodea el tablero de un mundo.
Esa escenografía SÍ se portó al `Tablero3D` real (la mecánica no cambia):

- **Diorama sobre pedestal:** la base fina pasa a un pedestal grueso (0.5 de alto) que
  sostiene el valle como una maqueta.
- **Entorno (`Entorno`):** terreno desplazado que se hunde bajo el tablero y sube hacia el
  horizonte; **montañas en 3 anillos** (#39434f/#2f3845/#28303c) que se pierden en la
  niebla; colinas cercanas (domos) con pinos; bosque lejano; y un **lago al que desemboca
  el río**. Todo determinista (rng con semilla), estático y sin clics.
- **Cámara y niebla:** `maxDistance` 18→40 (puedes alejarte a ver el mundo, oro para el
  video), niebla 17–32 → 24–88 para que las montañas se desvanezcan en vez de cortarse, y
  damping en la órbita.

**Verificación (Chrome real):** el valle se ve sobre su pedestal con agua alrededor; sin
errores de consola; build limpio. Imagen de referencia en `docs/design-system/`.

## 2026-06-15 · Vida humana en el valle + contraste tierra muerta→viva (handoff 4)

El diseñador construyó un prototipo "Territorio Principiante" enorme (territorio-principiante.js)
con muchas mejoras que Diego aprobó. Varias YA estaban en el juego real (panel permanente de
indicadores = stat pods del cockpit; barra de meta = chip 🎯; tooltip de hover; base
integrada/diorama). Se portaron las dos que el diseñador marcó como de mayor impacto y que
faltaban — sin tocar la mecánica:

- **Contraste tierra muerta → viva mucho más fuerte:** la celda pasa de un lerp lineal
  gris→verde a una curva de 3 paradas con realce no lineal (`tierraColor`): tierra quemada
  #6b4a30 → ocre #9a8a44 → verde vivo #4ea857, exponente 0.8. El arco "Terra Nil" ahora se
  SIENTE (verificado: la tierra muerta se lee como ocre quemado, no gris).
- **Vida humana:** figuras low-poly (`Persona`/`Gente`, cuerpo + cabeza con paletas de ropa
  y piel variadas, balanceo de reposo) alrededor de los edificios cívicos (salud, escuela,
  alimentos, mercado, cancha) y una familia frente a cada casa repoblada; **humo de
  chimenea** (`HumoChimenea`) sobre las casas con familia. El valle ya no se ve deshabitado.

**No portado (a propósito):** reloj/ciclo día-noche a 3 min/día (mi juego es por meses, no
tiempo real — sería reinterpretar la mecánica); pops flotantes de +indicador al construir
(el diario + el delta de los stat pods ya dan ese feedback); puente sobre el río y partículas
extra (menor prioridad). El contenido placeholder del paquete (5 historias/4 nodos/9
conceptos) NO se tocó: el real es más rico.

**Verificación (Chrome real):** mercado construido con figura de persona al lado; tierra
muerta en ocre quemado; sin errores de consola; build limpio; 24/24 tests del motor.

## 2026-06-15 · Atmósfera que se entibia + pops "+N indicador" al construir

Diego pidió activar las dos opcionales que en el handoff 4 dejé fuera, ahora
reinterpretadas para encajar en la mecánica por meses (no tiempo real):

- **El valle se entibia según el progreso:** `progreso = (confianza+seguridad+justicia+
  legitimidad)/400` (0–1) se pasa a `Tablero3D`, que interpola fondo, niebla, luz ambiente,
  hemisférica y sol de un crepúsculo frío (#11141d / #9aa6c0 / #dfe6f2) a una luz dorada
  cálida (#1e1722 / #ffe0ad / #ffd29a). NO es un reloj día-noche real (eso chocaría con el
  loop por meses): es un premio visual — el valle literalmente se ilumina a medida que sana.
  Helper `lerpHex` con `THREE.Color.lerp`.
- **Pop flotante al construir:** al colocar un edificio se dispara un `<Html>` de drei anclado
  a la celda 3D que muestra "+N Confianza / +N Seguridad…" con el color de cada indicador,
  subiendo y desvaneciéndose (`.pop-efecto`, animación `pop-sube` 1.7s). Feedback inmediato
  de por qué ese edificio importa. Se dispara en ambos caminos (herramienta directa y menú de
  celda), sólo cuando de verdad aparece un edificio nuevo y tiene efectos (guarda contra
  limpiar/desminar y `efectos:{}`). Auto-limpieza por `setTimeout`/`useEffect`.

**Verificación:** build limpio; 24/24 tests del motor; sin errores de consola al cargar ni al
entrar al Territorio; `progreso` se calcula de indicadores vivos (0.275 en partida nueva) y se
pasa como prop. La animación del pop y el calentamiento del valle son render WebGL — sólo se
ven en Chrome real (el compositor del preview pinta el canvas en negro y no propaga el raycast
3D de los clicks sintéticos), como todos los visuales 3D de este proyecto.

## 2026-06-16 · 25 eventos aleatorios estilo Cruz Roja (azar reproducible)

Diego pidió más eventos como el del deslave/secuestros — al menos 25 — que aparezcan al azar,
basados en la experiencia humanitaria de la Cruz Roja / Media Luna Roja.

**Motor (engine + types):** nuevo tipo `EventoAleatorio` y campo `eventosAleatorios` en el nivel.
En `avanzarMes`, si un mes queda "libre" (sin evento fijo ni condicional pendiente), se tira un
azar: con `PROB_EVENTO_ALEATORIO = 70%` cae uno del montón, elegido entre los elegibles no vistos.
Los aleatorios van SIEMPRE al final de la prioridad (fijo → condicional → aleatorio) para no pisar
la tensión guionizada — por eso los 24 tests previos siguen pasando intactos. El azar usa una
semilla LCG (`siguienteSemilla`, `Math.imul`) guardada en el estado: determinista para los tests
(semilla por defecto 1) y variable en partida real (la UI siembra con `Date.now()` al pulsar
"Comenzar"). Cada evento aleatorio puede tener un filtro `puede(ctx)` (p. ej. mes mínimo).

**Contenido (nivel-valle):** 25 eventos inspirados en el mandato humanitario real, cada uno con
dos opciones (la decisión con principios vs. el atajo) y su retro pedagógica enlazada al códex:
secuestro (intermediación neutral), visita a detenidos, deslave (visual lluvia + destruye edificio
si no evacúas), desaparecidos/forense (eco La Habana), restablecimiento del contacto familiar,
misión médica protegida, financiación condicionada, retén/acceso humanitario, epidemia y campaña
de vacunación, desplazados en tránsito, violencia de género, niños no acompañados, apoyo
psicosocial, ayuda en efectivo vs. especie, entierro digno, sequía/clima, difusión del DIH,
desinformación, voluntario herido, disputa de tierras, cooptación política, restos explosivos
junto a la escuela, medios de vida, brigada de primeros auxilios y "días de tranquilidad" (tregua
para vacunar). Reusan IDs de códex e historias ya existentes (sin inventar dependencias).

**Verificación:** build limpio; 27/27 tests (3 nuevos: pool ≥25, caen ≥5 por partida, sin
repetición). Simulación de 4 semillas distintas: 10–13 aleatorios por partida de 24 meses, mezcla
y orden distintos en cada una, ninguno repetido dentro de la misma partida.

## 2026-06-16 · Modelo sistémico vivo: salud + tick mensual + decisiones causales

Diego pidió complejizar el Territorio: que el valle sea un organismo ("si hago X pasa Y y
además Z"), no una lista de compras. Su intuición: justicia/legitimidad son indicadores
abstractos (se ganan con decisiones), mientras salud/confianza se construyen con infraestructura
y cuidado sostenido. Decisiones acordadas: salud = motor concreto que alimenta a los 4 (vive
solo en el Territorio, NO toca el tipo `Indicadores` compartido con el modo Mesa); hechos reales
ficcionalizados + caso real en el Códex (sin nombrar Estados; nada de Qatar).

**Dos capas acopladas:**
- **Inversión (efecto único al construir):** se mantiene (memorial sigue siendo el gran motor de
  justicia, +12).
- **Sostén (efecto MENSUAL nuevo, `DefEdificio.mensual`):** cada mes, en `aplicarTickMensual`, los
  edificios producen bienestar (salud: +4 puesto / +3 agua / +2 alimentos; emisora +2 confianza;
  memorial +1 confianza; cancha +1 legitimidad/+1 salud; escuela +1 legitimidad/+1 seguridad;
  mercado +1 legitimidad). Y si hay población retornada, las necesidades sin cubrir erosionan:
  sin agua −3 salud/−2 confianza; sin alimentos −2/−2; salud<30 −2 confianza/−1 legitimidad.
  Deltas pequeños, acotados [0,100]: se acumulan en ~24 meses sin espiral de muerte.

**Salud (concreta, solo Territorio):** `EstadoTerritorio.salud` (inicia 25), 5.º pod en el HUD
(🩺, color `--salud`), incluida en el `progreso` (calor del valle, /500). No es meta de victoria
(siguen los 4), pero descuidarla hunde confianza y legitimidad.

**Decisiones causales:** `OpcionEvento.salud` (delta inmediato), `OpcionEvento.encadena` (id de un
evento que se fuerza el próximo mes, prioridad máxima en `avanzarMes` vía `eventosForzados`), y
`efectoEspecial: 'brote-salud'` (desploma la salud). Generaliza el `destruir-edificio` que ya
existía.

**Barajar opciones:** en `Territorio.tsx`, las opciones se barajan en el render (Fisher-Yates
sembrado con semilla+mes+hash del id) — la primera ya no es siempre la ganadora. Solo
presentación: el motor recibe el objeto opción, no su índice; los tests (orden de datos) intactos.

**Eventos nuevos (ficcionalizados + Códex):** `emisora-odio` (condicional, requiere emisora —
rompe el "emisora=bueno"; ceder encadena `brote-violencia`; caso real RTLM/Ruanda 1994),
`primavera` (Primavera Árabe), `dinero-que-arma` (tomarlo encadena `dinero-incursion`),
`pozo-roto` (ejercita brote-salud). Las consecuencias `brote-violencia`/`dinero-incursion` son
condicionales con `condicion:()=>false` (solo alcanzables por encadena). Códex nuevo:
`medios-y-violencia`, `movilizacion-social`, `financiacion-conflicto`.

**Verificación:** build limpio; 33/33 tests del motor (incl. nuevos: salud sube con
salud+agua+alimentos 25→34, erosiona a 20 sin necesidades cubiertas, carencias reportadas,
encadena fuerza brote-violencia, brote-salud desploma 50→25). Simulación de balance (4 semillas):
cuidando el valle, salud→100 e indicadores cerca del máximo (justicia el cuello de botella, como
se diseñó); descuidando, se estanca sin colapsar. Preview en vivo: el 5.º pod Salud renderiza
junto a los 4, sin errores de consola.

## 2026-06-16 · La dificultad ahora escala el sistema de salud/necesidades

A pedido de Diego: más exigente en libre y difícil, más indulgente en principiante. El tick
mensual (producción + erosión por necesidades) ahora escala por dificultad, además de los fondos
y umbrales que ya variaban:

- `ConfigDificultad` gana `saludInicial`, `multProduccion` y `multErosion`.
  - principiante: salud inicial 40, producción ×1.25, erosión ×0.5 (el valle perdona).
  - libre: salud 25, producción ×1.0, erosión ×1.3 (cobra el descuido).
  - difícil: salud 18, producción ×0.85, erosión ×1.7 (frágil y sin margen).
- `crearEstado` usa `saludInicial` de la dificultad; `aplicarTickMensual` escala producción y
  erosión con `escalarEfecto(ef, mult)` (redondeo, deltas pequeños).

**Verificación:** build limpio; 33/33 tests. Simulación del gradiente — mismo descuido (1 familia,
sin agua ni alimentos, 6 meses): principiante salud 40→28 / confianza 30→23; libre 25→0 / 30→5;
difícil 18→0 / 30→5. Cuidando el valle (agua+alimentos+salud, 8 meses): salud final 100 / 97 / 50.
Preview en vivo: principiante arranca con salud 40 y 170 fondos (correcto), sin errores de consola.

## 2026-06-16 · Reloj + ciclo día/noche en el Territorio (handoff de diseño)

Diego pidió implementar el handoff del diseñador (escena principiante de referencia), cuya
pieza central es un **reloj con ciclo día/noche a 3 min/día**. El diseñador lo construyó como
escena ejecutable aparte (`territorio-principiante.js`) pero nunca lo portó al juego real; varias
de las "otras mejoras" del handoff ya estaban implementadas de handoffs previos (pop al construir,
tooltip de hover, contraste tierra muerta→viva, humo de chimenea, figuras, base integrada, agua
animada, ventanas que laten).

**Lo portado a `Tablero3D.tsx`:**
- `AtmosferaDiaNoche` (componente con `useFrame`): un día del valle dura `DIA_SEGUNDOS = 180`
  (3 min, como pidió Diego). Paleta `CIELO` de 10 keyframes por hora → interpola cielo/niebla,
  intensidad de sol/ambiente/hemisférica y opacidad de estrellas. El sol orbita según la hora;
  las estrellas asoman de noche. Reemplaza la atmósfera estática anterior.
- **Reconciliación con el `progreso`:** las dos capas conviven — la HORA da la luz (amanecer→
  mediodía→atardecer→noche) y el PROGRESO (guerra→paz) tiñe el cielo hacia el ámbar y sube el
  piso de luz. Así el arco de sanación se lee a cualquier hora. La noche conserva un piso de luz
  para no perder el tablero (jugabilidad).
- **Luces del pueblo gratis:** los materiales emisivos que ya existían (bandera de la escuela,
  orbe del encuentro, esfera del agua, ventanas que laten) resaltan solos al oscurecer la escena
  → el valle se enciende al anochecer sin geometría nueva.
- `RelojValle` (DOM, hermano del Canvas): lee la hora ambiental vía rAF y pinta HH:MM + glifo
  sol/luna, refrescando cada ~5 min simulados. CSS `.reloj-valle` (píldora arriba a la derecha).

**Decisión de diseño:** el reloj es **ambiente**, no toca la mecánica. El juego sigue siendo por
MESES (botón "Avanzar mes"); el reloj corre en tiempo real como atmósfera viva (el propio
diseñador lo hizo decorativo). Conectarlo a consecuencias habría chocado con el bucle por turnos.

**Verificación:** build limpio. Preview en vivo: la escena renderiza bien iluminada (sin negro
tras el refactor de luces), el reloj aparece (☀️ 08:30) y bien posicionado, sin errores de
consola. El avance continuo del ciclo no se puede ver en el preview headless (un probe confirmó
que `requestAnimationFrame` está pausado con la pestaña oculta — mismo límite WebGL de todo el
proyecto); corre en Chrome real.

## 2026-06-16 · Ilustraciones por escena en La Mesa (plomería + muestra)

Diego quiere imágenes en las escenas de decisión (modo La Mesa). Firefly texto→imagen no está
disponible en mi entorno; él las generará en su propio Firefly (tiene Pro) y yo las integro.
Plomería lista para que sea enchufar y listo:
- `Nodo.imagen?: string` (ruta bajo /public). El overlay EN ya lo preserva (solo sobrescribe
  título/texto/opciones).
- `PantallaJuego`: `<figure className="escena-imagen">` entre el título y el texto, solo si el
  nodo trae `imagen`.
- CSS `.escena-imagen`: viñeta editorial (borde, halo de vela, fundido inferior con mask para
  integrarse a la noche del papel), `aspect-ratio: 16/9`, object-fit cover.
- `public/escenas/` (Vite la sirve en la raíz). Convención: un archivo por nodo, nombrado por su
  id (canal-secreto, garantes, agenda, acuerdo-humanitario, cese-fuego, violacion-cese,
  crisis-confianza, victimas, justicia, verdad, ddr, genero, spoilers-nodo, refrendacion-nodo,
  pedagogia-nodo, implementacion-nodo, proteccion).
- Muestra SVG "Vela y Tinta" para `canal-secreto` (carta lacrada + vela) como referencia de
  estilo y para verificar el render.

**Verificación:** build limpio; preview en vivo: la ilustración aparece en "El primer contacto",
bien posicionada y estilizada (carta + vela, glow ámbar, fundido). Pendiente: las 16 imágenes
restantes que generará Diego en su Firefly.

## 2026-06-16 · 16 ilustraciones Firefly integradas en La Mesa

Diego generó las imágenes en su propio Firefly (Pro) siguiendo los 17 prompts "Vela y Tinta".
Integradas 16 de 17 (falta `refrendacion-nodo`, "Sellar el pacto"):
- Renombradas de los nombres largos de Firefly a `<id>.jpg` por convención.
- Campo `imagen` seteado en los 16 nodos de `escenario.ts`. El `Firefly.jpg` suelto (campo de
  velas, algunas apagadas) se mapeó a `genero` ("La paz, ¿para quiénes?" — inclusión).
- Optimizadas para web: máx 1280px + JPG q82 (las fotográficas en PNG → JPG). 18 MB → 2.5 MB sin
  pérdida visible (se muestran a ~560px). Originales quedan en el Firefly de Diego.
- Muestra SVG `canal-secreto` reemplazada por la imagen real.

**Verificación:** build limpio; preview en vivo: las 16 decodifican (16/16 ok, 0 errores), la
ilustración aparece bien posicionada en la escena (carta lacrada + vela en "El primer contacto").
Pendiente: `refrendacion-nodo` (Diego la genera) y, opcional, revisar `canal-secreto` (Firefly le
añadió un abrecartas + lacre rojo que podría leerse algo duro).

## 2026-06-16 · Última ilustración: refrendacion-nodo (17/17 completas)

Diego generó y subió la imagen que faltaba ("Sellar el pacto": documento con pluma, sello de
lacre y vela). Optimizada a 1280px/q82 (172K), renombrada a refrendacion-nodo.jpg y campo imagen
seteado. Las 17 escenas de La Mesa ya tienen ilustración. Total carpeta: 2.7 MB. Build limpio.

## 2026-06-21 · Pulido móvil (de cara al pitch / futura app iOS)

Revisión completa en viewport de teléfono (390×844). Todos los modos corren bien; arreglos:
- **Barra de construcción del Territorio**: era scrollable pero sin pista → en móvil nadie
  descubría los 11 edificios. Añadido degradado de máscara en el borde derecho ("hay más →
  desliza"), `scroll-snap-type: x proximity` + momentum táctil, y botón "Avanzar mes" más
  compacto en móvil para dar ancho a los chips. Verificado: scroll llega hasta Limpiar/Desminar.
- **Hint del tablero**: "rueda para acercar" → "pellizca o rueda para acercar" (táctil).
- **Cabecera compacta < 480px**: el wordmark "Limitless Peace" se partía en 2 líneas y el toggle
  "EN" se cortaba; ahora `white-space: nowrap` + tamaños/gaps reducidos → todo en una línea.

**Verificado en preview móvil:** Menú, La Mesa (ilustraciones a todo ancho, opciones A/B/C con
buen tap target), El Territorio (3D renderiza el valle con día/noche; barra con scroll y pista),
La Memoria y El Expediente — sin roturas de layout. El canvas WebGL a veces sale negro en el
compositor del preview pero renderiza en navegador real (confirmado en varias capturas).

## 2026-06-21 · PWA: el juego es instalable como app (pitch / camino a iOS)

Soporte PWA con vite-plugin-pwa para que en el pitch se pueda decir "instálala en tu teléfono":
- `vite.config.ts`: VitePWA (registerType autoUpdate) con manifest (name, standalone, portrait,
  theme/bg #11141d, íconos 192/512 any + 512 maskable) y workbox precache de js/css/html/svg/png/
  jpg/woff2 (34 entradas, ~4.3MB → app completa offline) + runtime caching de Google Fonts.
- Íconos "Vela y Tinta": `public/icon.svg` (paloma cream + glow ámbar sobre noche), rasterizado con
  qlmanage a `icon-512/192.png` y `apple-touch-icon.png` (180).
- `index.html`: meta theme-color, apple-touch-icon, apple-mobile-web-app-capable/status-bar/title.

Verificado: build genera manifest.webmanifest + sw.js + registerSW.js; el `<head>` inyecta manifest
y registro del SW; dev sigue corriendo sin errores (el SW solo se activa en producción).
