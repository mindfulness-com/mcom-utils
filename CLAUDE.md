# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules for Claude

- **Always update CLAUDE.md** after every task.
- **Always run `npm run lint:fix`** after any TypeScript changes.
- **Always run `npm run build`** after code changes — `dist/` is what consumers import.

## Overview

Shared utilities npm library (`@mindfulness/utils`) consumed by all server-side services. Published to npm. Compiles to `dist/` with full TypeScript declarations. Changes here require a publish + version bump in every consumer that needs them.

## Commands

```bash
npm run build            # tsc + TypeDoc docs generation → dist/
npm run test             # Jest (TZ=UTC, maxWorkers=2)
npm run lint             # ESLint check
npm run lint:fix         # Auto-fix ESLint violations
npm run start:tests      # Jest watch mode
```

**Publishing:** `npm publish` — runs `publish.sh` which lints, tests, bumps the version, and pushes tags. Requires a clean git working tree. After publishing, use `npm run link:utils` from the monorepo root to propagate to local consumers immediately, or bump the version in each consumer's `package.json`.

## Architecture

TypeScript-first library. Organised as namespaced submodule imports (e.g., `import { when } from '@mindfulness/utils/maybe'`). Everything is also re-exported from `src/index.ts` for convenience.

**Key modules:**
- `maybe` — `Maybe<T>`, `when()`, `whenAsync()`, `isDefined()`, `definitely()` — the null-safety primitives used everywhere in the platform. Prefer these over optional chaining for consistency.
- `fn` — `composel()` (left-to-right function composition), `ifDo()`
- `date` / `time` / `timezone` — date-fns wrappers, timezone-aware helpers for the global user base
- `id` — nanoid-based ID generation
- `env` — strict environment variable getters (throws on missing required vars)
- `sql` — pg-escape-based parameterisation helpers
- `object` — `omitEmpty()`, deep merge utilities
- `string`, `array`, `math`, `boolean`, `currency`, `url` — general utilities

## Known Technical Debt

The following are exported but never imported by any consumer — safe to remove when there's appetite:
- `boolean.toggle`
- `error.throw_`, `error.assertError`
- `debug.logThrough`
- `math.isBetween`, `math.isMultipleOf`, `math.percentOf`
- `definetly.*` — deprecated typo alias for `definitely`. Use `definitely` instead.
