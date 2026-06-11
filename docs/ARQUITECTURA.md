# Arquitectura — Limitless Peace

Documento de arquitectura del sistema. Describe **cómo está construido** el juego, **por qué**
así, y **cómo extenderlo**. Pensado para que cualquier persona —técnica o no— entienda la
ingeniería detrás del proyecto, y para que un equipo nuevo pueda continuarlo.

> Las decisiones de fondo están registradas como ADRs en [`docs/decisiones/`](decisiones/).

---

## 1. En una frase

Una aplicación web **estática** (sin servidor) que ejecuta un **motor de juego narrativo**
genérico sobre **contenido editable como datos**, con soporte **bilingüe** mediante una capa
de traducción superpuesta. Cero backend, cero costo de hosting, despliegue en cualquier CDN.

## 2. Stack tecnológico

| Capa | Tecnología | Por qué |
|---|---|---|
| Lenguaje | TypeScript | Tipado estático → el contenido y el motor no se desincronizan; errores en compilación, no en producción. |
| UI | React 18 | Componentes declarativos; estándar de industria, fácil de continuar. |
| Build/dev | Vite 6 | Arranque y recarga instantáneos; build estático optimizado. |
| Estado | `useReducer` + Context | Suficiente para el alcance; sin dependencias de estado externas. |
| Estilos | CSS plano (variables) | Sin framework pesado; control total, bundle mínimo. |
| Hosting | Estático (Vercel/Pages/Netlify) | Gratis, HTTPS, global. Ver [ADR-001](decisiones/ADR-001-sin-backend.md). |

Sin backend, sin base de datos, sin cuentas de usuario, sin dependencias de pago. El árbol de
dependencias de producción es esencialmente **React + ReactDOM**.

## 3. Principio rector: separar MOTOR de CONTENIDO

La decisión arquitectónica central ([ADR-002](decisiones/ADR-002-contenido-como-datos.md)):
el **motor** no sabe nada del conflicto de Miravalle. Solo sabe de nodos, opciones, efectos
sobre indicadores y finales. Todo el contenido —la historia, los textos, los casos reales—
vive como **datos** en `src/data/`.

```
                 ┌──────────────────────────┐
                 │        MOTOR (engine/)    │   genérico, reutilizable
                 │  tipos, indicadores,      │   no conoce el contenido
                 │  aplicar efectos, clamp   │
                 └────────────▲─────────────┘
                              │ consume
        ┌─────────────────────┴─────────────────────┐
        │              CONTENIDO (data/)             │   un escenario concreto
        │  escenario.ts · codex.ts · finales.ts      │   editable sin tocar el motor
        │  en.ts (capa de traducción) · content.ts   │
        └─────────────────────▲─────────────────────┘
                              │ entrega contenido por idioma
        ┌─────────────────────┴─────────────────────┐
        │            INTERFAZ (components/)           │   pantallas React
        │  Inicio · Juego · Final · Códex · Panel     │
        └────────────────────────────────────────────┘
```

**Consecuencia práctica:** crear un escenario nuevo (otro conflicto, mediación comunitaria,
un caso local de una Sociedad Nacional) es **editar archivos de texto**, sin programar el motor.

## 4. Estructura de carpetas

```
src/
  engine/
    types.ts          Motor: Indicadores, Nodo, Opcion, EntradaCodex, Final,
                      y la lógica pura (aplicarEfectos, clamp, promedio).
  data/
    escenario.ts      Estructura + texto base (español): nodos, efectos, ramificación.
    codex.ts          Las 22 entradas del Códex (español).
    finales.ts        Los 4 finales y sus condiciones (lógica, idioma-neutral).
    en.ts             Capa de traducción al inglés (solo texto, indexado por id).
    content.ts        getContent(lang): combina estructura + texto del idioma.
  i18n/
    lang.ts           Tipo de idioma, persistencia, detección del navegador.
    ui.ts             Diccionario de interfaz (botones, etiquetas) ES/EN.
    LanguageContext.tsx  Provee idioma + diccionario + contenido a la app.
  components/
    PantallaInicio · PantallaJuego · PantallaFinal · Codex · PanelIndicadores
  App.tsx             Orquesta el estado del juego (reducer) y el enrutado de pantallas.
  main.tsx            Punto de entrada.
  styles.css          Estilos (variables CSS, estética "papel oscuro").
docs/                 Documentación de ingeniería + pedagógica + de proyecto.
```

## 5. Modelo de datos del motor

```ts
Indicadores = { confianza, seguridad, justicia, legitimidad }   // 0–100 cada uno

Opcion = { texto, efectos: Partial<Indicadores>, retro, codex?: string[] }

Nodo = {
  id, fase, titulo, texto,
  opciones: Opcion[],
  siguiente?: string | ((ind: Indicadores) => string | undefined)   // ramificación
}

Final = { id, titulo, descripcion, leccion, aplica: (ind) => boolean }
```

- **`siguiente` como función** permite ramificación condicional (p. ej., si la confianza cae
  bajo 35, el flujo entra a un nodo de crisis). Es lo que hace al motor un grafo, no una lista.
- **`Final.aplica`** se evalúa en orden; gana el primero que cumple. La condición es lógica
  pura, **idioma-neutral**.

## 6. Flujo de estado (una decisión)

```
Jugador elige una Opcion
   │
   ▼
dispatch('elegir', opcion)
   │   aplicarEfectos(indicadores, opcion.efectos)  → nuevos indicadores (clamp 0–100)
   │   registra entradas de Códex desbloqueadas
   │   guarda retroPendiente (para mostrar la retroalimentación)
   ▼
Pantalla muestra retroalimentación + cambios en indicadores
   │
   ▼
dispatch('continuar', siguienteId)
   │   calcula siguiente nodo (string o función sobre indicadores)
   │   si no hay siguiente → pantalla final (obtenerFinal evalúa indicadores)
   ▼
Siguiente nodo, o final
```

El estado del juego se maneja con un **reducer puro** (`App.tsx`): acciones `comenzar`,
`elegir`, `continuar`, `reiniciar`. El reducer no depende del idioma; recibe lo que necesita
(ids, efectos) por parámetro. Esto mantiene la lógica de juego desacoplada de la presentación.

## 7. Internacionalización (i18n)

Capa de traducción superpuesta. Ver [ADR-004](decisiones/ADR-004-i18n-estructura-texto.md).

```
escenario.ts (estructura + texto ES)        en.ts (solo texto EN, por id)
            └──────────────┬──────────────────────┘
                           ▼
                    content.ts: getContent(lang)
            combina estructura (única) + texto del idioma
            fallback automático a ES si falta una traducción
                           ▼
            LanguageContext → toda la UI consume content + ui
```

- La **lógica** (efectos, ramificación, condiciones de final) existe **una sola vez** (ES).
- El **texto** se traduce sin riesgo de romper la mecánica.
- Idioma nuevo = un archivo `data/<lang>.ts` + un diccionario en `ui.ts`. El motor no cambia.
- Preferencia persistida en `localStorage`; idioma inicial deducido del navegador.

## 8. Despliegue

`npm run build` produce `dist/` (HTML + JS + CSS estáticos). Se sube a cualquier hosting
estático con HTTPS (Vercel, GitHub Pages, Netlify, Cloudflare Pages) **sin configuración de
servidor**. No hay secretos, variables de entorno ni base de datos que gestionar.

**Implicación de escala (clave para la narrativa):** réplica a costo cero. Cualquier Sociedad
Nacional puede alojar su propia copia, en su idioma, sin infraestructura.

## 9. Calidad y verificación

- **Tipado estricto** (`tsc --noEmit` en el build): el contenido mal formado no compila.
- **Verificación en navegador** documentada en [`devlog.md`](devlog.md) por cada cambio
  observable.
- Plan de pruebas en [`pruebas.md`](pruebas.md) *(pendiente de crear en Nivel 0)*.

## 10. Extensibilidad — hacia dónde crece

La arquitectura está pensada para escalar por niveles (ver [`hoja-de-ruta.md`](hoja-de-ruta.md))
sin reescribir lo existente:

- **Nuevos escenarios** → nuevos archivos de datos. El motor ya los soporta.
- **Nuevos idiomas** → nuevas capas de traducción. La i18n ya los soporta.
- **Backend opcional (Nivel 2)** → estadísticas agregadas y editor de escenarios se pueden
  añadir como capa externa sin tocar el motor; el juego seguiría funcionando sin él.
- **IA (Nivel 3)** → un mentor adaptativo consumiría el mismo modelo de datos.

El motor es el activo estable; el contenido y las capas (idioma, datos, IA) crecen alrededor.
