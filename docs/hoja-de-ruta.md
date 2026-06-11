# Hoja de ruta — De prototipo a proyecto de ingeniería

**Filosofía:** costo cero hoy, construido íntegramente con IA, **documentado como proyecto
de ingeniería**. La complejidad sube por niveles, y cada nivel se desbloquea cuando entra
dinero. Nada se compra antes de tener los 250 CHF.

**Por qué documentar como ingeniería:** es el diferenciador de la candidatura. La mayoría
presenta una idea o una maqueta; nosotros presentamos un **sistema real, versionado,
arquitecturado y replicable**, construido solo + IA en semanas. El propio proceso de
construcción (devlog) es parte de la narrativa: "una persona joven, con IA, levantó una
plataforma educativa que cualquier Sociedad Nacional puede desplegar gratis".

---

## NIVEL 0 — "Ver la luz" (esta semana → semana 3) · Costo: 0 CHF

Objetivo: que cualquiera, en cualquier celular del mundo, pueda **jugar el juego en una URL
pública**, y que el repositorio se lea como un proyecto de ingeniería serio. Todo con IA,
sin gastar.

### 0.1 — Producto mínimo lanzable
- [ ] Pulir el escenario existente (textos, balance, duración real ~25 min).
- [ ] **Bilingüe ES/EN** desde ya (la IA traduce a costo cero; jurado internacional).
- [ ] Guardado de progreso y "seguir partida" con `localStorage` (sin backend).
- [ ] Contador de partidas respetuoso de privacidad (analítica sin cookies, plan gratis).
- [ ] Accesibilidad básica (contraste, navegación por teclado, lectores de pantalla) y
      pulido móvil.
- [ ] Pequeño "juice": animación de indicadores, transiciones, micro-momentos (la paloma,
      el sello al firmar). Bajo esfuerzo, alto impacto en cámara.

### 0.2 — Despliegue gratuito
- [ ] Deploy en Vercel o GitHub Pages (HTTPS, gratis). URL pública estable para compartir.
- [ ] Dominio: por ahora el subdominio gratuito; el dominio propio entra en el Nivel 1.

### 0.3 — Documentación de ingeniería (el entregable distintivo)
Crear y mantener, en `docs/`:
- [ ] `ARQUITECTURA.md` — diagrama del sistema, separación motor/contenido, flujo de datos,
      decisiones de stack. Por qué SPA estática, por qué contenido en archivos de datos.
- [ ] `decisiones/` (ADRs) — Architecture Decision Records cortos: "ADR-001: sin backend en
      el MVP", "ADR-002: contenido como datos para que no-programadores escriban escenarios",
      "ADR-003: i18n", etc. Cada uno: contexto → decisión → consecuencias.
- [ ] `guia-de-contenido.md` — cómo escribir un escenario nuevo sin tocar el motor
      (la clave de la escalabilidad: una filial crea su caso local editando texto).
- [ ] `devlog.md` — bitácora del build asistido por IA, fechada. Esto ES narrativa: cómo
      una persona + IA construyó el sistema. Insumo directo del video y el pitch.
- [ ] `CHANGELOG.md` y versionado semántico (v0.x). 
- [ ] `pruebas.md` — plan de QA manual + (cuando aporte) tests automatizados del motor.
- [ ] README como portada del proyecto (ya existe; actualizar con la URL pública).

**Hito Nivel 0:** URL pública jugable en ES/EN + repo documentado como proyecto de
ingeniería. *Con esto solo ya se puede grabar el video de Fase 1.*

---

## NIVEL 1 — "Premiable" (al recibir los 250 CHF) · Costo: ~250 CHF

Se desbloquea con el dinero del programa. Sube la percepción de calidad para el video y los
jueces. (Distribución detallada en `plan.md`.)

- [ ] **Dominio propio** (~25) — enlace serio y estable.
- [ ] **Ilustraciones por encargo** (~100) — portada + 1 por fase. El mayor salto de
      percepción por franco gastado. Encargar apenas llegue el dinero (tiempos de entrega).
- [ ] **Sonido/ambiente** con assets CC0 (0 CHF, pero entra aquí porque acompaña al arte).
- [ ] **Modo facilitador** para talleres (proyector + votación a mano alzada).
- [ ] **Taller piloto** (~60 en refrigerios/impresiones) → datos pre/post y testimonios:
      la evidencia para los jueces internacionales.
- [ ] Fichas del códex imprimibles (~40).
- [ ] Reserva (~25) para producción del video.

**Hito Nivel 1:** juego que se ve premiable + evidencia de impacto real.

---

## NIVEL 2 — "Plataforma" (si llega más financiamiento / fase de escala)

Aquí el proyecto deja de ser "un juego" y se vuelve "una plataforma" — el salto de ingeniería
que justifica inversión mayor. Solo si hay dinero que lo sostenga.

- [ ] **Backend ligero** (p. ej. InsForge o Vercel + base de datos):
  - Estadísticas agregadas y anónimas: *"el 68% de los jugadores eligió el tribunal
    especial"* — material de oro para el pitch y para investigación de impacto.
  - Códigos de sesión para talleres (todo un grupo juega y se ve el resultado colectivo).
- [ ] **Editor de escenarios** web: que voluntarios sin saber programar creen y publiquen
      casos locales. Esto materializa la promesa de escala del Movimiento.
- [ ] **Más idiomas** (FR/AR/PT…) — la IFRC opera en 17 lenguas.
- [ ] Panel de impacto para Sociedades Nacionales.

**Hito Nivel 2:** de juego a plataforma replicable con datos.

---

## NIVEL 3 — "Ambición" (si el premio/financiamiento es grande)

La cima de complejidad. Refuerza la narrativa "construido con IA" siendo, él mismo, IA aplicada.

- [ ] **Mentor adaptativo con IA**: un LLM que personaliza la retroalimentación del juego
      según el camino del jugador y responde sus dudas sobre cada decisión, citando casos.
- [ ] **Modo aula en vivo** (multijugador): un facilitador conduce a un grupo en tiempo real.
- [ ] **Analítica para investigación**: medición de impacto a escala, exportable, para
      publicar resultados con la IFRC.
- [ ] Segundo y tercer escenario (conflicto comunitario, mediación escolar).

**Hito Nivel 3:** producto de referencia en pedagogía de paz del Movimiento.

---

## La escalera de un vistazo

| Nivel | Cuándo | Dinero | Qué desbloquea | Complejidad |
|---|---|---|---|---|
| **0** | Ahora (sem. 1–3) | 0 | URL pública bilingüe + docs de ingeniería | SPA estática |
| **1** | Al recibir 250 CHF | 250 | Arte, dominio, sonido, modo taller, piloto | + assets + evidencia |
| **2** | Más financiamiento | $$ | Backend, stats, editor de escenarios, +idiomas | + plataforma de datos |
| **3** | Financiamiento grande | $$$ | Mentor IA, aula en vivo, investigación | + IA + tiempo real |

**Regla de oro:** cada nivel es lanzable por sí solo. Nunca empezamos el Nivel N+1 sin que
el Nivel N esté en producción y documentado. Si el dinero nunca pasa del Nivel 0, igual
tenemos un proyecto completo, vivo y presentable.

---

## Qué hacemos esta semana (Nivel 0, arranque)

1. **Tú:** confirmar fecha límite y formato de la cohorte; empezar a redactar tu historia
   personal (gancho del video).
2. **Yo, con IA, a costo cero, en este orden:**
   - i18n ES/EN del juego.
   - Guardado en `localStorage` + "seguir partida".
   - Juice visual (indicadores animados, micro-momentos).
   - Despliegue público (URL para compartir).
   - Arrancar la documentación de ingeniería: `ARQUITECTURA.md`, primeros ADRs y `devlog.md`.

Cuando digas, empiezo por el i18n y el despliegue para que el juego **vea la luz** esta
misma semana.
