# ADR-001 — Sin backend: aplicación 100% estática

**Estado:** Aceptado · 2026-06-09

## Contexto

El juego debe poder llegar a juventud voluntaria en contextos de bajos recursos y a público
general, desde cualquier dispositivo (sobre todo celulares). El proyecto compite por un premio
con presupuesto de 250 CHF, que llega *después* y debe rendir al máximo. La sostenibilidad a
largo plazo no puede depender de pagar servidores ni de que alguien administre infraestructura.

La pregunta: ¿el juego necesita un servidor (backend, base de datos, cuentas de usuario)?

## Decisión

**No.** El MVP es una aplicación **100% estática**: HTML, JS y CSS servidos desde un CDN. Todo
el estado de la partida vive en el navegador (memoria + `localStorage`). No hay servidor propio,
base de datos, autenticación ni variables de entorno.

## Consecuencias

**Positivas:**
- **Costo de hosting: 0.** Vercel, GitHub Pages, Netlify o Cloudflare Pages lo sirven gratis
  con HTTPS global.
- **Réplica a costo cero:** cualquier Sociedad Nacional puede alojar su copia sin
  infraestructura. Es el corazón del argumento de escalabilidad de la candidatura.
- **Sin superficie de ataque ni datos personales que proteger** → simplicidad de privacidad,
  relevante al trabajar con jóvenes y menores en talleres.
- **Funciona offline** una vez cargado; tolerante a conexiones malas.
- **Mantenimiento mínimo:** nada que parchear del lado servidor.

**Negativas / límites aceptados:**
- No hay estadísticas de uso centralizadas más allá de un contador simple de analítica sin
  cookies.
- No hay partidas sincronizadas entre dispositivos ni cuentas.

**Cómo se mitigan a futuro:** estas capacidades son del **Nivel 2** de la hoja de ruta y se
añadirían como una capa externa **opcional** (ver [ARQUITECTURA](../ARQUITECTURA.md) §10),
sin que el juego deje de funcionar como estático. La decisión no cierra esa puerta; la pospone
hasta que haya financiamiento que la justifique.
