# ADR-002 — Contenido como datos, separado del motor

**Estado:** Aceptado · 2026-06-09

## Contexto

El valor del juego está en su **contenido**: la historia, los dilemas, las retroalimentaciones
con casos reales, el Códex. Ese contenido lo escriben y revisan personas que no necesariamente
programan (especialistas en construcción de paz, educadores, voluntariado). Además, la
escalabilidad del proyecto depende de poder crear **nuevos escenarios** (otros conflictos,
mediación comunitaria, casos locales de cada Sociedad Nacional) sin rehacer el software.

La pregunta: ¿el contenido vive incrustado en el código de la interfaz, o separado?

## Decisión

Separar el **motor** del **contenido**:
- El **motor** (`engine/`) es genérico. Solo conoce conceptos abstractos: nodos, opciones,
  efectos sobre indicadores, ramificación, finales. No sabe nada de Miravalle.
- El **contenido** (`data/`) es un conjunto de **datos tipados**: un escenario es un arreglo de
  nodos; el Códex, un arreglo de entradas; los finales, una lista con sus condiciones.

Crear un escenario nuevo = escribir otro archivo de datos. El motor no se toca.

## Consecuencias

**Positivas:**
- **No-programadores pueden crear y editar contenido** siguiendo el patrón existente
  (ver [`guia-de-contenido.md`](../guia-de-contenido.md), pendiente de Nivel 0).
- **Escalabilidad demostrable:** "una filial escribe su propio caso editando texto" es un
  argumento concreto, no una promesa.
- **Tipado estático como red de seguridad:** un escenario mal formado no compila. El contenido
  no puede desincronizarse del motor sin que el build lo avise.
- **Pruebas más simples:** el motor se puede probar con escenarios mínimos de ejemplo.

**Negativas / límites aceptados:**
- Quien escriba contenido trabaja sobre archivos `.ts` con una sintaxis (comillas, comas,
  llaves). No es un editor visual. → Mitigación de **Nivel 2**: un editor de escenarios web.
- La alineación entre estructura y traducción se hace por `id` y por posición de las opciones;
  exige disciplina al editar (documentada en la guía de contenido).

## Relación con otras decisiones

Esta separación es la que hace posible [ADR-004](ADR-004-i18n-estructura-texto.md): como el
contenido ya está estructurado como datos, superponer una capa de traducción por `id` es
natural.
