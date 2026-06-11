# 🕊️ Limitless Peace

**Un juego indie de pedagogía de paz.** El jugador asume el rol de asesor/a de un equipo
internacional de mediación humanitaria y acompaña un proceso de paz completo — desde los
contactos secretos hasta la implementación — tomando decisiones inspiradas en dilemas reales
de procesos como los de Colombia, Sudáfrica, Irlanda del Norte y Guatemala.

Proyecto voluntario desarrollado en el marco de una iniciativa de la IFRC para la promoción
de una cultura de paz.

## ¿Por qué un juego?

Los procesos de paz son complejos: justicia transicional, DDR, refrendación, spoilers… Leer
sobre ellos informa; **decidir** sobre ellos transforma. El juego pone al jugador frente a los
mismos dilemas que enfrentan los negociadores reales (¿amnistía o tribunal? ¿plebiscito o
congreso?) y le muestra las consecuencias con evidencia de casos históricos. No hay opciones
"trampa": hay dilemas, como en la realidad.

## Cómo se juega

- **16–17 decisiones** (una es un nodo de crisis condicional) a lo largo de 5 fases:
  pre-negociación, cese al fuego, negociación sustantiva, refrendación e implementación.
- Cada decisión mueve 4 indicadores: **Confianza, Seguridad, Justicia y Legitimidad**.
- Tras cada elección, una retroalimentación explica **qué dice la experiencia real** sobre
  esa decisión, citando casos históricos.
- Las decisiones desbloquean el **Códex**: 22 entradas documentadas sobre conceptos de
  construcción de paz, cada una con definición, práctica, caso real y pregunta de discusión.
- **4 finales** posibles según el estado de los indicadores, de la paz sostenible a la
  recaída en la guerra.
- Una partida dura **20–35 minutos**: ideal para talleres.

## Ejecutar el juego

```bash
npm install
npm run dev        # desarrollo en http://localhost:5173
npm run build      # build de producción en dist/
```

Es una aplicación web estática (React + TypeScript + Vite, sin backend): funciona en
cualquier hosting gratuito (Vercel, Netlify, GitHub Pages, itch.io) y en cualquier
dispositivo con navegador, incluidos celulares.

## Estructura del proyecto

```
src/
  engine/types.ts        # Motor: tipos, indicadores, lógica de efectos
  data/escenario.ts      # ESCENARIO: nodos, decisiones, retroalimentaciones (ES base)
  data/codex.ts          # CÓDEX: las 22 entradas educativas (ES base)
  data/finales.ts        # Los 4 finales y sus condiciones (lógica)
  data/en.ts             # Capa de traducción al inglés (solo texto)
  data/content.ts        # Combina estructura + texto del idioma elegido
  i18n/                  # Idioma: contexto, diccionario de interfaz, persistencia
  components/            # Pantallas (inicio, juego, final, códex)
docs/
  ARQUITECTURA.md        # Documento de arquitectura del sistema
  decisiones/            # ADRs — registros de decisiones de arquitectura
  hoja-de-ruta.md        # Niveles de complejidad ligados al financiamiento
  plan.md                # Estrategia de la candidatura (prototipo → Davos)
  devlog.md              # Bitácora de construcción (solo + IA)
  diseno-del-juego.md    # Documento de diseño (GDD)
  guia-pedagogica.md     # Cómo usarlo en talleres con jóvenes/voluntariado
  presupuesto.md         # Plan de uso de los 250 francos
  fuentes.md             # Bibliografía y fuentes de los contenidos
```

**Para agregar contenido no hace falta saber programar el motor**: los escenarios, el códex
y los finales son archivos de datos. Duplicar `escenario.ts` y editar los textos basta para
crear un nuevo caso (otro conflicto, otra escala — incluso conflictos comunitarios).

## Principios del contenido

1. **Ficción anclada en evidencia.** El país (Miravalle) y los actores son ficticios; cada
   dilema y cada retroalimentación provienen de procesos reales documentados.
2. **Sin moralina.** Las opciones "malas" son las que la evidencia muestra que fracasan, no
   las que suenan feas. Varias decisiones no tienen opción perfecta — esa es la lección.
3. **Coherencia humanitaria.** El rol del jugador y los contenidos respetan los Principios
   Fundamentales del Movimiento (humanidad, imparcialidad, neutralidad…) y el DIH.
4. **Hecho para conversar.** Cada entrada del códex termina en una pregunta de discusión:
   el juego está diseñado como detonante de talleres, no como experiencia solitaria.

## Licencia y uso

Contenido pensado para uso educativo y humanitario. Los casos históricos citados son de
conocimiento público y se documentan en [docs/fuentes.md](docs/fuentes.md).
