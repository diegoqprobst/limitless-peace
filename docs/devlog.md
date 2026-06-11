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
