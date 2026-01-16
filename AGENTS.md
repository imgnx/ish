# Repository Guidelines

## Project Structure & Module Organization
- Entry point `index.js` hosts the hybrid JS/zsh REPL and the `$`/`sh` helpers.
- `ish.jsonc` is the pantry/spec for routing commands (not yet wired into the REPL).
- `src/mapFn.ts` is a WIP example primitive; convert to runnable JS/CLI before using it.
- `USAGE.md` documents the REPL philosophy and examples; keep it in sync with behavior.
- Logs/config history live outside this repo; avoid committing secrets or runtime artifacts.

## Build, Test, and Development Commands
- Install deps: `npm install` (only `@types/node` today).
- Run the REPL locally: `node index.js` (or `./index.js` after `chmod +x`).
- Validate JSONC manually before wiring: `node -e "require('fs').readFileSync('ish.jsonc','utf8')"` (or use `jsonc-parser` if added).
- No build pipeline yet; prefer plain JS for runnable primitives until tooling is added.

## Coding Style & Naming Conventions
- CommonJS modules; keep files UTF-8 with two-space indent for JSON/TOML and standard JS style.
- Prefer self-contained, dependency-light utilities; avoid adding global side effects in the REPL context.
- Naming: lower-case with dashes for folders; camelCase for functions; use descriptive verb-based command names in `ish.jsonc`.
- Comments only where behavior is non-obvious (e.g., routing rules or workarounds).

## Testing Guidelines
- No automated tests are present; add lightweight Node-based tests for new primitives and routing logic.
- Favor CLI-style tests that simulate REPL input/output; capture edge cases (shell vs JS routing, prefixes).
- If you add temporary tests under `tests/`, remove them before committing unless formalized.

## Commit & Pull Request Guidelines
- Use Conventional Commit prefixes (e.g., `chore(config): wire ish.jsonc router`, `feat(repl): add :mode directive`).
- Keep commits small and descriptive; squash intermediate spikes.
- PRs should describe scope, key commands run (REPL demos, parsers), and any redaction of tokens or logs.
- Link related issues and note remaining gaps (e.g., ts-node requirement, output buffering).

## Security & Configuration Tips
- Do not commit credentials, session logs, or `.env` files; scrub history before sharing traces.
- When adding config keys, document defaults in `USAGE.md` and keep allowed verbs explicit in `ish.jsonc`.
- Prefer local overrides for secrets and keep shell helpers defensive (validate inputs before execution).
