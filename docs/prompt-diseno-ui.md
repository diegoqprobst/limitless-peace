# Prompt para Claude — Diseño de interfaz de Limitless Peace

> Copia todo el bloque de abajo y pégalo en una conversación nueva con Claude
> (idealmente adjuntando 3-4 capturas actuales del juego: menú, La Mesa, El
> Territorio 3D y El Jardín de la Memoria). Donde dice [ADJUNTA CAPTURAS],
> súbelas. El prompt le pide entregar tokens CSS listos para pegar en nuestro
> `styles.css`, así el resultado se aplica sin retrabajo.

---

Eres un director/a de arte y diseñador/a de producto senior, especializado en juegos
indie con propósito social (referencias: Terra Nil, Monument Valley, Florence, Gris,
A Short Hike). Vas a crear la identidad visual y el sistema de diseño de **Limitless
Peace**, un juego web de pedagogía de paz que competirá en la convocatoria IFRC
Limitless (Cruz Roja / Media Luna Roja) — la primera fase se gana con un prototipo y
un video, así que **cómo se ve en cámara importa tanto como cómo se usa**.

## El juego (contexto)

Tres modos sobre un mismo universo (país ficticio: Miravalle), todos con tono serio,
cálido y esperanzador — nunca infantil, nunca militarista, nunca lúgubre:

1. **La Mesa** — juego narrativo de decisiones: eres mediador humanitario en un
   proceso de paz (17 decisiones, 4 indicadores: Confianza, Seguridad, Justicia,
   Legitimidad; retroalimentación con casos reales).
2. **El Territorio** — builder 3D isométrico low-poly estilo Terra Nil: reconstruyes
   un valle de posguerra; las celdas pasan de gris-muerto a verde-vivo, brotan
   árboles, las familias retornan y sus ventanas se encienden. Hay tensión:
   incursiones, minas, mantenimiento.
3. **El Jardín de la Memoria** — jardín 3D nocturno con estelas y llamas; cada llama
   abre la historia real de un constructor de paz (Rabin, Mandela, Hume…).

Stack: React + CSS plano con variables (sin Tailwind), Three.js para el 3D.
Tipografía actual: Georgia del sistema. Tema único oscuro.

[ADJUNTA CAPTURAS]

## Tokens actuales (puedes proponer reemplazarlos, pero entrega el mismo formato)

```css
:root {
  --fondo: #14161d;          /* fondo general (noche) */
  --fondo-tarjeta: #1d2029;  /* tarjetas/paneles */
  --fondo-elevado: #262a36;  /* botones/opciones */
  --tinta: #e8e4d9;          /* texto principal (papel cálido) */
  --tinta-suave: #a8a496;    /* texto secundario */
  --acento: #e8b04b;         /* ámbar: la vela del negociador */
  --paz: #7fb585;            /* verde: vida/restauración */
  --peligro: #d4756b;        /* crisis/derrota */
  --confianza: #6ba3c7; --seguridad: #7fb585;
  --justicia: #b48ec9; --legitimidad: #e8b04b;
  --borde: #353a49; --radio: 10px;
}
```

## Lo que necesito de ti (en este orden)

1. **Tres direcciones de arte** con nombre, 5 líneas de concepto cada una y a qué
   emoción apuntan. Una debe conservar la base "noche y vela" actual evolucionada;
   las otras dos pueden ser más arriesgadas. Recomienda una y justifica pensando en:
   jurado internacional, video de 3 minutos, jóvenes 18-30, y que el 3D low-poly ya
   existe (paleta del 3D: tierras #46413a→#5d9c64, río #2b4f6e, ámbar #e8b04b).
2. **Sistema de color completo** de la dirección ganadora, como bloque `:root` CSS
   listo para pegar (mismos nombres de variables + las nuevas que necesites).
   Verifica contraste WCAG AA para texto sobre cada fondo.
3. **Tipografía**: pareja de fuentes de Google Fonts (gratis) — una display con
   carácter editorial/humanista para títulos, una de lectura larga para el contenido
   (hay párrafos de 4-5 líneas). Incluye la escala tipográfica (rem) y el `@import`.
4. **Componentes clave** (especificación + CSS de ejemplo): tarjeta de decisión con
   sus 2-3 opciones, panel de indicadores (4 barras que deben leerse de un vistazo y
   verse bien en video), tarjeta de "eco histórico" (cita la historia real — debe
   sentirse como una vela encendida dentro de la interfaz), alerta de tensión
   (amenaza activa sin parecer videojuego de guerra), modal de historia (lectura
   larga, debe invitar a leer 3 párrafos).
5. **El logo**: concepto + SVG simple (paloma, llama, o ambas — evita clichés; NO
   puede parecerse al emblema de la Cruz Roja ni usar cruces rojas: restricción
   legal del Movimiento).
6. **Microinteracciones** (descripción, no código): qué debe pasar al elegir una
   decisión, al subir/bajar un indicador, al retornar una familia, al encender una
   llama. Presupuesto de animación: sobrio, 200-400ms, nada que maree en cámara.

## Restricciones duras

- Tema oscuro primero (el juego vive de noche y velas); debe verse bien proyectado
  en un taller con luz ambiente.
- Funciona en móvil 360px de ancho (mucho voluntariado juvenil solo tiene celular).
- Nada de rojo institucional + cruz (emblema protegido por los Convenios de Ginebra).
- El contenido es sensible (guerra, víctimas): la estética puede ser bella, nunca
  decorar el sufrimiento. Sobriedad > espectáculo.
- Entrega todo el CSS con las MISMAS variables (`--fondo`, `--tinta`, etc.) para que
  se aplique sin refactor.

Empieza por el punto 1 y espera mi elección antes de desarrollar el resto.

---

> **Tip:** cuando Claude entregue el bloque `:root` final, pégamelo a mí (Claude
> Code) y yo lo aplico a `src/styles.css` y ajusto el 3D para que combine.
