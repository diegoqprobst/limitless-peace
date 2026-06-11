# ADR-004 — i18n: separar estructura (lógica) de texto (idioma)

**Estado:** Aceptado · 2026-06-09

## Contexto

El jurado del premio es internacional y el Movimiento opera en 17 idiomas; el juego debe ser,
al menos, bilingüe español/inglés, y abierto a más idiomas después. Pero el contenido es
extenso (17 nodos con sus opciones y retroalimentaciones, 22 entradas de Códex, 4 finales) y,
sobre todo, **la lógica del juego está entrelazada con el texto**: cada opción tiene un texto
*y* unos efectos sobre los indicadores; cada nodo tiene una ramificación; cada final, una
condición.

El riesgo: si se duplica todo por idioma, una traducción podría alterar por error los efectos o
la ramificación, rompiendo la mecánica de forma silenciosa. Y mantener dos copias completas
invita a que se desincronicen.

La pregunta: ¿cómo traducir sin duplicar la lógica ni arriesgar la mecánica?

## Decisión

Separar **estructura** de **texto**:
- El **español es el idioma base** y contiene la estructura completa: ids, efectos,
  ramificación (`siguiente`), condiciones de los finales (`aplica`) y el texto en español.
- Cada idioma adicional es una **capa de solo texto** (`data/en.ts`), indexada por el mismo
  `id`, que se **superpone** a la estructura base.
- `data/content.ts` (`getContent(lang)`) combina estructura + texto del idioma elegido. Si una
  entrada no está traducida, usa el texto base español (**fallback**).

La lógica del juego existe **una sola vez**. Las traducciones solo aportan cadenas de texto.

## Consecuencias

**Positivas:**
- **Traducir no puede romper la mecánica:** las traducciones no contienen efectos ni
  ramificación, solo texto.
- **Una sola fuente de verdad** para la lógica → imposible que los idiomas se desincronicen en
  cómo funciona el juego.
- **Traducir no requiere programar la lógica:** un traductor (o una Sociedad Nacional) solo
  edita cadenas. Refuerza la escalabilidad del proyecto.
- **Fallback seguro:** se puede publicar una traducción parcial sin romper nada; las piezas
  faltantes aparecen en español hasta completarse. Permite traducir de forma incremental.
- **Agregar un idioma = un archivo** `data/<lang>.ts` + un diccionario de interfaz en `ui.ts`.
  El motor y la estructura no cambian.

**Negativas / límites aceptados:**
- Las opciones de cada nodo se alinean **por posición** entre estructura y traducción. Si
  alguien reordena las opciones en español, debe reordenarlas igual en las traducciones. →
  Mitigación: documentado en la guía de contenido; a futuro podría reforzarse alineando por
  un `id` de opción en vez de por posición.
- El idioma base (español) queda como "privilegiado": es donde vive la lógica. Es una
  asimetría deliberada y aceptada.

## Notas de implementación

- Diccionario de **interfaz** (botones, etiquetas) en `i18n/ui.ts`, separado del **contenido**.
- Preferencia de idioma persistida en `localStorage`; idioma inicial deducido del navegador.
- Esta decisión se apoya en [ADR-002](ADR-002-contenido-como-datos.md): solo es posible porque
  el contenido ya estaba estructurado como datos.
