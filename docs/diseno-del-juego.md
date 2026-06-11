# Documento de diseño — Limitless Peace

## 1. Visión

Un juego narrativo de decisiones, corto (20–35 min por partida), que enseña **cómo funcionan
los procesos de paz por dentro**: sus fases, sus mecanismos, sus dilemas y sus modos de
fracaso. El jugador no "gana la guerra": acompaña, como mediador humanitario, la lenta
construcción de un acuerdo.

**Fantasía central:** estar sentado en la mesa donde se decide la paz, sintiendo el peso de
cada decisión.

**Tesis pedagógica:** la paz no fracasa por falta de buenas intenciones, sino por fallas de
diseño (precondiciones imposibles, ceses sin verificación, víctimas al margen, acuerdos sin
pedagogía). Quien entiende el diseño, entiende la noticia, el plebiscito y la historia de su
país de otra manera.

## 2. El jugador y su rol

Asesor/a técnico de un equipo internacional de mediación humanitaria. Esta elección de rol
es deliberada:

- **No es el gobierno ni la insurgencia** → el jugador mantiene distancia crítica de ambas
  partes y experimenta la neutralidad como herramienta de trabajo, no como tibieza.
- **No tiene poder de decisión final** → recomienda; el peso está en el criterio, igual que
  en la vida real de mediadores y asesores.
- **Es humanitario** → conecta con la identidad del voluntariado del Movimiento (Principios
  Fundamentales, DIH).

## 3. Estructura

### Fases (mapa del proceso)

| Fase | Nombre | Lo que se aprende |
|------|--------|-------------------|
| 0 | Pre-negociación | Canales secretos, garantes, diseño de agenda |
| 1 | Medidas humanitarias y cese al fuego | DIH, acuerdos humanitarios, verificación, crisis |
| 2 | Negociación sustantiva | Víctimas, justicia transicional, verdad, DDR, género, spoilers |
| 3 | Firma y refrendación | Plebiscito vs. congreso, pedagogía de paz, desinformación |
| 4 | Implementación | Seguimiento, presupuesto, garantías de seguridad |

### Mecánica de indicadores

Cuatro indicadores (0–100) que modelan las dimensiones reales de un proceso:

- **Confianza** — entre las partes y en la mesa. Se construye con gestos verificables; se
  destruye con ultimátums y sorpresas.
- **Seguridad** — cese al fuego, protección de civiles y de firmantes. La dimensión física
  de la paz.
- **Justicia** — derechos de las víctimas: verdad, justicia, reparación, no repetición.
- **Legitimidad** — respaldo social y político. La dimensión democrática: un acuerdo
  perfecto sin legitimidad muere en la primera elección.

**Por qué cuatro y no uno:** la tensión entre indicadores ES el contenido. La amnistía
general sube Confianza pero hunde Justicia; el plebiscito sube Legitimidad en teoría pero
arriesga todo. El jugador aprende que la paz es un problema de equilibrios, no de maximizar
una sola variable.

### Bucle de juego

1. Leer la situación (nodo narrativo).
2. Elegir entre 2–3 opciones plausibles (ninguna es caricatura).
3. Ver el efecto en los indicadores **y** leer la retroalimentación con evidencia real
   ("así funcionó/fracasó en Colombia / Irlanda del Norte / Sudáfrica…").
4. Desbloquear entradas del Códex relacionadas.
5. Avanzar. Si los indicadores caen bajo umbrales, se disparan nodos de crisis.

La retroalimentación inmediata con caso real es **el corazón psicoeducativo**: convierte
cada elección en una mini-lección anclada a una emoción (alivio, sorpresa, arrepentimiento).

### El Códex

Enciclopedia interna con 22 conceptos en 7 categorías, cada entrada con estructura fija:
**¿Qué es? / En la práctica / Caso real / Para discutir**. Funciona como documentación del
juego y material de taller imprimible. Las entradas se descubren jugando (refuerzo positivo)
pero todas son consultables siempre (el juego nunca esconde conocimiento).

### Finales

4 finales calculados sobre los indicadores, calibrados con honestidad histórica:

- **Paz sostenible** (exigente: promedio ≥65 y ningún indicador <50) — rara, como en la realidad.
- **Paz frágil** — el resultado más común de los procesos reales; el juego lo dice explícitamente.
- **Acuerdo en cuidados intensivos** — firmado pero naciendo muerto.
- **Recaída** — el proceso colapsa; el final recuerda los casos reales que terminaron así.

La rejugabilidad es parte del diseño pedagógico: comparar partidas en grupo revela qué
decisiones son estructurales y cuáles cosméticas.

## 4. Decisiones de diseño notables

- **País ficticio (Miravalle), evidencia real.** Evita herir sensibilidades de víctimas
  reales y discusiones partidistas, pero cada retroalimentación cita casos verificables.
  El jugador aprende historia real a través de una ficción segura.
- **Sin opciones trampa.** Las opciones débiles son las que la evidencia comparada muestra
  que fracasan. Un experto en paz reconocería las tres opciones de cada nodo como posturas
  que existieron de verdad.
- **Texto > gráficos.** Estética indie sobria (papel oscuro, tipografía serif, una paleta
  cálida) que pone el presupuesto de atención en el contenido. Cero dependencias de assets
  costosos — clave con presupuesto de 250 USD.
- **Datos separados del motor.** Crear un escenario nuevo = editar un archivo de texto.
  Pensado para que voluntarios sin experiencia técnica puedan escribir contenido (por
  ejemplo: un escenario de mediación comunitaria, o uno basado en el conflicto del país
  donde se use el taller).

## 5. Hoja de ruta (post-MVP)

| Prioridad | Mejora | Esfuerzo |
|-----------|--------|----------|
| Alta | Playtesting con voluntarios y ajuste de balance | Bajo |
| Alta | Versión en inglés (i18n) para uso IFRC internacional | Medio |
| Media | Segundo escenario: mediación comunitaria (escala micro) | Medio |
| Media | Modo facilitador: pausas de discusión programadas para talleres | Bajo |
| Media | Persistencia de partida (localStorage) y compartir resultado | Bajo |
| Baja | Ilustraciones (encargo a artista local con parte del presupuesto) | Medio |
| Baja | Sonido ambiente / música (assets CC0) | Bajo |
