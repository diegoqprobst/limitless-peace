# ADR-003 — Stack: React + TypeScript + Vite, CSS plano

**Estado:** Aceptado · 2026-06-09

## Contexto

El juego lo construye una persona con asistencia de IA, con plazo corto (2–3 meses) y
presupuesto mínimo. Debe ser web (multiplataforma, sin instalación), mantenible por terceros
en el futuro, ligero para celulares en redes lentas, y desplegable como sitio estático
([ADR-001](ADR-001-sin-backend.md)).

La pregunta: ¿con qué tecnologías?

## Decisión

- **TypeScript** como lenguaje: tipado estático que mantiene el contenido sincronizado con el
  motor y atrapa errores en compilación.
- **React 18** para la interfaz: modelo declarativo por componentes, ecosistema enorme,
  fácil de continuar por cualquier desarrollador.
- **Vite 6** como herramienta de build y desarrollo: arranque y recarga instantáneos; produce
  un bundle estático optimizado.
- **CSS plano con variables**, sin framework de estilos: control total, bundle mínimo, sin
  dependencias que mantener.
- **Estado con `useReducer` + Context**, sin librería de estado externa.

## Consecuencias

**Positivas:**
- Stack **estándar y conocido** → un desarrollador nuevo (o un mentor del programa) puede
  continuarlo sin curva de aprendizaje exótica.
- **Bundle pequeño** y carga rápida en celulares.
- TypeScript + Vite dan una **experiencia de desarrollo asistido por IA** muy productiva, lo
  que importa cuando se construye solo + IA.
- Sin dependencias de pago ni propietarias.

**Negativas / límites aceptados:**
- React añade algo de peso frente a "vanilla JS"; se acepta por mantenibilidad y velocidad de
  desarrollo. El bundle sigue siendo pequeño para los estándares actuales.
- Elegir no usar un framework de estilos significa escribir CSS a mano; se acepta por control y
  ligereza, dado el alcance.

## Alternativas consideradas

- **Motor de juego (Unity, Godot, Construct):** descartado. Exceso de peso para un juego de
  texto/decisiones, peor en web/móvil, curva y/o licencias. El CSS y React bastan.
- **Generador de narrativa interactiva (Twine, Ink):** atractivos para prototipar historias,
  pero atan el contenido a su formato y dificultan la i18n estructurada y los indicadores
  tipados. Preferimos el control de datos propios ([ADR-002](ADR-002-contenido-como-datos.md)).
- **Vanilla JS sin framework:** más ligero, pero más costoso de mantener y extender por terceros.
