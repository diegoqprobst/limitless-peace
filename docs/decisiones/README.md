# Registros de Decisiones de Arquitectura (ADRs)

Un **ADR** (*Architecture Decision Record*) es una nota corta que captura **una** decisión
técnica importante: el contexto en que se tomó, la decisión misma, y sus consecuencias. Sirve
para que cualquiera entienda *por qué* el sistema es como es, sin tener que reconstruir el
razonamiento desde cero — y para que las decisiones se puedan revisar con honestidad cuando
cambian las circunstancias.

Es una práctica estándar de ingeniería de software (popularizada por Michael Nygard, 2011).
La usamos aquí porque este proyecto se construye **como un proyecto de ingeniería documentado**:
las decisiones son tan parte del producto como el código.

## Formato

Cada ADR es un archivo `ADR-NNN-titulo.md` con: **Estado · Contexto · Decisión · Consecuencias**.
Los ADRs no se borran; si una decisión se revierte, se crea uno nuevo que la supersede y se
marca el anterior como *Reemplazado*.

## Índice

| # | Decisión | Estado |
|---|---|---|
| [001](ADR-001-sin-backend.md) | Sin backend: aplicación 100% estática | Aceptado |
| [002](ADR-002-contenido-como-datos.md) | Contenido como datos, separado del motor | Aceptado |
| [003](ADR-003-stack.md) | Stack: React + TypeScript + Vite, CSS plano | Aceptado |
| [004](ADR-004-i18n-estructura-texto.md) | i18n: separar estructura (lógica) de texto (idioma) | Aceptado |
