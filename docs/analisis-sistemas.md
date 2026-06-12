# Análisis — Lógica sistémica y gamificación de intervenciones reales

*Análisis pedido por Diego (jun 2026): "aún no tiene lógica cada cosa que podemos [construir]…
podemos gamificar muchísimo, haz un análisis tú".*

## 1. El diagnóstico es correcto

Hoy los edificios del Territorio son **aditivos**: cada uno suma vitalidad e indicadores,
pero (salvo la economía y las incursiones) no conversan entre sí ni con el terreno. La
profundidad de juegos como Terra Nil o Frostpunk no viene de tener más piezas, sino de que
las piezas forman **cadenas causales**: A sin B produce C. Eso es, además, exactamente cómo
piensa la doctrina humanitaria real — el manual Esfera es literalmente un grafo de
dependencias (agua → salud → nutrición → protección).

**Regla de diseño que propongo:** cada mecánica nueva debe enseñar una cadena causal real
documentada. Si no existe en la literatura humanitaria, no entra al juego.

## 2. Cadenas causales (la primera ya está implementada)

| Cadena | Estado | Doctrina real |
|---|---|---|
| Aluvión → sin potabilizadora → **brote de enfermedades** | ✅ Implementada (evento `brote`, mes 7) | Inundación contamina pozos; WatSan se despliega ANTES del brote (Esfera, cap. agua) |
| Seguridad baja → **incursión** destruye lo construido | ✅ Implementada | Vacíos de seguridad en posconflicto (garantías) |
| Minas sin desminar → **accidente** | ✅ Implementada | DIH / desminado humanitario |
| Sin alimentos cerca de familias retornadas → **retorno frágil** (familias se van si hay crisis) | 🔜 Propuesta | Seguridad alimentaria como condición de retorno (ACNUR/PMA) |
| Sin escuela al año X → **reclutamiento juvenil** (evento; cancha/escuela lo previenen) | 🔜 Propuesta | Educación como protección de la niñez en emergencias |
| Mercado sin camino seguro al vado → **economía aislada** (no genera ingresos esos meses) | 🔜 Propuesta (necesita terreno) | Acceso y cadenas logísticas |

Implementación técnica: el patrón ya existe — `ContextoEvento` ahora expone `vistos`,
`hayAgua`, etc. Cada cadena nueva = un campo de contexto + un evento condicional. Costo
marginal bajo; el contenido (texto + retro doctrinal) es el trabajo real.

## 3. Terreno con lógica: elevaciones y ubicación segura

La idea de Diego ("el centro de distribución se debe instalar en lugar seguro") apunta a la
mecánica más valiosa del siguiente salto: **que el DÓNDE importe tanto como el QUÉ**.

Propuesta concreta (nivel 2, "La ciudad del puente"):
- **Elevación por celda** (0–2): el mapa pasa de string plano a incluir altura
  (`T2` = tierra alta). El 3D ya está listo para esto: las celdas son cajas con altura.
- **Zona inundable** (elevación 0, junto al río): construir ahí es más barato pero el
  aluvión destruye/daña. Enseña: mapeo de riesgos (análisis de amenazas previo, EVC de
  la Cruz Roja — Evaluación de Vulnerabilidades y Capacidades).
- **Ubicación del centro de distribución**: en doctrina real, los puntos de distribución
  se eligen por acceso seguro, visibilidad y control de multitudes. En juego: si el centro
  queda junto a celdas de baja seguridad (frontera del mapa / zona de incursión), evento
  de saqueo; junto a la base o zona poblada, funciona. Enseña ubicación, no solo compra.
- **Línea de vista / cobertura**: la emisora en celda alta cubre más radio (×1.5) — premio
  natural a leer el terreno.

Esto convierte cada partida en un problema espacial distinto y multiplica rejugabilidad
sin escribir un solo evento más.

## 4. Gamificar intervenciones reales: el "modo Expediente"

Diego propone guías de procesos reales (Irlanda del Norte; el final de ETA — libro
pendiente). El formato que recomiendo: **Expedientes** — campañas guiadas de 15–20
minutos, a medio camino entre La Mesa y el Códex:

- Cada Expediente recorre UN proceso real en 6–8 escenas con fechas y hechos reales
  (sin renombrar: son historia, como el Jardín). En cada escena el jugador responde
  "¿qué harías tú?" ANTES de ver qué se hizo de verdad y qué pasó después.
  El gancho pedagógico es la comparación: *tu intuición vs. la historia*.
- **Irlanda del Norte** es el candidato ideal del primer Expediente: proceso cerrado,
  arco completo (canal secreto → cese → Viernes Santo → referendo → decommissioning),
  y ya tenemos a Hume en el Jardín y al IRA en el códex.
- **ETA / España** es valioso precisamente porque rompe el molde: NO hubo acuerdo de paz —
  hubo final unilateral (cese definitivo 2011, desarme 2017, disolución 2018) sin mesa,
  sin amnistía, con las víctimas como actor central del relato posterior. Como Expediente
  enseña algo que ningún otro caso enseña: **a veces la paz no se negocia, se gana por
  agotamiento del proyecto violento** — y aún así deja pendientes (presos, memoria,
  relato). Es complejo y sensible (víctimas vivas, política española actual): requiere
  revisión experta antes de publicarse, y conviene esperar a que Diego lea su libro para
  co-escribirlo. Riesgo medio, valor pedagógico alto.
- Arquitectura: mismo motor de nodos de La Mesa con dos campos extra
  (`fecha`, `queOcurrio`). Un Expediente = un archivo de datos. Cero motor nuevo.

## 5. Prioridad recomendada (impacto ÷ esfuerzo)

1. ✅ ~~Cadena aluvión→brote~~ (hecha hoy) — valida el patrón.
2. **Cadenas 2-3 del cuadro** (retorno frágil, reclutamiento juvenil) — bajo esfuerzo,
   profundidad inmediata. *Antes del playtest.*
3. **Expediente Irlanda del Norte** — gran pieza para la candidatura ("aprende historia
   real jugando") y barato técnicamente. *Antes del video si da el tiempo.*
4. **Terreno con elevaciones + ubicación segura** — el salto de profundidad espacial.
   *Para el nivel 2 / post-Fase 1.*
5. **Expediente ETA** — tras la lectura de Diego + revisión experta. *Fase 2 o post-premio.*

La regla de la hoja de ruta sigue vigente: nada de esto debe retrasar el video de Fase 1.
Las cadenas (2) caben antes del playtest; lo demás se decide según el calendario de la
convocatoria.
