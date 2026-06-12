# Consultoría — ¿Este juego entusiasma a alguien que NO es voluntario?

*Respuesta pedida por Diego (jun 2026): "a mí como voluntario de la Cruz Roja me
entusiasma, ¿pero tú crees que a otra persona también?"*

## La respuesta honesta

**Hoy: parcialmente.** El juego entusiasma a tres públicos casi garantizados:
voluntarios/humanitarios (tu caso), educadores y facilitadores (es una mina de oro de
taller), y jurados/expertos que lo evalúan como pedagogía. A esos tres les sobra contexto
y motivación — perdonan la densidad porque el contenido les habla.

El público que TODAVÍA no retiene es el que más importa para la escala: **una persona
joven de 19 años sin conexión previa con el tema, sola, con el celular, sin facilitador.**
Esa persona hoy probablemente abandona en los primeros 90 segundos. No porque el juego sea
malo — porque le pedimos leer antes de sentir.

La buena noticia: la brecha no es de concepto (el concepto es excelente y único), es de
**onboarding y ritmo**. Eso se arregla con diseño, no con reescritura.

## Diagnóstico: dónde pierde al jugador frío

| # | Problema | Evidencia | Gravedad |
|---|----------|-----------|----------|
| 1 | **Muros de texto antes del juego.** Intro de La Mesa y del Territorio: 150+ palabras antes de la primera interacción. Los jugadores leen DESPUÉS de engancharse, no antes. | Toda pantalla de inicio | Alta |
| 2 | **El primer "wow" tarda.** La magia (familia retorna, ventanas se encienden) llega al minuto 4-6. El estándar indie es <60 segundos. | Flujo del Territorio | Alta |
| 3 | **Meta invisible durante el juego.** La condición de victoria vivía solo en el texto de intro. | ✅ Resuelto hoy (chip 🎯 en HUD) | — |
| 4 | **Nadie te enseña a jugar.** Aura, vitalidad, umbral 50: aprendibles pero no enseñados en flujo. | ✅ Resuelto hoy (tutorial 3 pasos, primera vez) | — |
| 5 | **El tablero era tímido.** 480px de alto compitiendo con dos columnas de UI. | ✅ Resuelto hoy (tablero protagonista, 60vh, barra inferior) | — |
| 6 | **Jerga sin red.** "Legitimidad", "DDR", "refrendación" — un voluntario las conoce; un chico de colegio no. | Mesa + códex | Media |
| 7 | **La Mesa es larga para público frío.** 17 decisiones ≈ 25 min sin checkpoint. Perfecta para taller; dura para celular. | Modo Mesa | Media |
| 8 | **Sin sonido.** El silencio hace que todo se sienta menos vivo. | Global | Media (música de Diego en camino) |
| 9 | **Nada que mostrar al terminar.** No hay resultado compartible ("mi valle", "mi final") — cero viralidad orgánica. | Finales | Media |

## Lo que SÍ funciona para cualquiera (no tocar)

- **La metáfora visual**: gris-muerto → verde-vivo se entiende sin palabras, en cualquier
  idioma y edad. Es el activo #1 del juego.
- **Las ventanas que se encienden** cuando una familia vuelve: emoción inmediata y universal.
- **Los ecos históricos**: dan peso real sin ser tarea escolar.
- **Cuatro modos**: variedad de formas de entrar (jugar, leer, decidir historia real).
- **La victoria-retiro** ("ganar es poder irse"): es memorable y diferencia al juego de
  todo lo demás del género.

## Qué se implementó HOY (de este diagnóstico)

1. **Tablero protagonista**: el valle ocupa hasta 60% de la altura de pantalla (máx.
   720px), app a 1380px en desktop; construcción como barra horizontal de chips abajo
   (patrón RTS) con nombres cortos y tooltips; diario a la derecha.
2. **Tutorial contextual de primera vez** (3 pasos que reaccionan a lo que haces, no un
   manual): elegir → colocar cerca de casas → avanzar mes. Saltable, no vuelve a aparecer
   (localStorage).
3. **Meta siempre visible**: chip 🎯 en el HUD con familias y el indicador mínimo vs. 55,
   en verde cuando se cumple.
4. **Herramienta activa explicada**: al seleccionar un edificio, la línea de estado dice
   qué es y qué hace antes de colocarlo.

## Plan recomendado (orden por impacto ÷ esfuerzo)

1. **Recortar intros a 40 palabras + "aprender jugando"** (la intro actual puede vivir en
   un "¿Cómo se juega?" plegable). Esfuerzo: bajo. *Antes del playtest.*
2. **Acelerar el primer retorno de familia**: bajar el umbral de la PRIMERA familia (o una
   casa semi-viva cerca de la base) para que el primer 🏠 ocurra en <2 minutos. Esfuerzo:
   bajo. *Antes del playtest.*
3. **Glosario al toque**: términos del juego (legitimidad, DDR…) como palabras subrayadas
   que abren su entrada del códex. Esfuerzo: medio.
4. **Checkpoint en La Mesa**: guardar progreso por fase (localStorage) + "continuar
   partida". Esfuerzo: medio.
5. **Resultado compartible**: tarjeta-resumen al final (tu valle, tus indicadores, tu
   final) descargable como imagen. Es la semilla de viralidad y la foto del taller.
   Esfuerzo: medio.
6. **Música y sonido** (de Diego) + 3-4 efectos puntuales (colocar, retorno, evento).
   Esfuerzo: bajo cuando exista el audio.

## El verdadero juez

Este documento son hipótesis informadas; el **playtest con 5-8 personas que NO sean del
Movimiento** es el dato. Qué medir, cronómetro en mano:
- ¿Cuántos segundos hasta la primera acción en el Territorio?
- ¿Cuántos llegan al primer retorno de familia sin ayuda?
- ¿Dónde preguntan "¿y ahora qué hago?"? (cada pregunta = un defecto de UI, no del jugador)
- Al final: "¿se lo mandarías a un amigo?" — la única métrica que predice escala.
