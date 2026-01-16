<!-- markdownlint-configure-file {$DINGLEHOPPER/prod/ish/assets/.markdownlint.jsonc} -->

# REVIEW.md #

<link rel="styles" href="/Users/donaldmoore/src/dinglehopper/prod/ish/.markdownstyles.css">

I looked. You’re already _dangerously_ close to “chef mode.” 😄

## What you’ve got right now (and it’s solid) ##

- `index.js` is a **hybrid REPL**: it decides “shell vs JS” with a heuristic, and then either:

    - runs the line in **zsh** (`execSync(... shell:'/bin/zsh')`)
    - or runs it in **JS** via `vm.runInContext`

- You’ve got two “knives” in the context already:

    - `$("cmd")` → capture stdout (zsh)
    - `sh("cmd")` → run + print (zsh)

- `ish.jsonc` is the beginning of your **pantry spec**: what “keywords/verbs” are allowed per language + custom mappings.
- `USAGE.md` nails the _philosophy_ (and the `/##` comment vibe is cool).

## The big gap: `ish.jsonc` isn’t wired in yet ##

Right now the REPL doesn’t read `ish.jsonc`, so the “fusion cuisine” is still based on a regex vibe-check:

```js
const isShellCommand =
  !cmd.match(/^(const|let|var|function|class|if|for|while|return|=>|\{|\[)/) &&
  !cmd.includes('=') &&
  !cmd.match(/\.\w+\(/);
```

That heuristic will absolutely misclassify legit shell stuff:

- env assignments: `FOO=bar cmd`
- `{}` / `[]` that appear in shell (brace expansion, `find -exec {} \;`, jq snippets, etc.)
- any command containing `=` (common in flags, URLs, grep patterns…)

If “mix like a chef” is the goal, you’ll want the router to be **rules-first** (config + explicit prefixes) and **heuristics only as a fallback**.

## One change that makes this feel “real” immediately ##

Add **explicit engine prefixes** (even if you keep the auto-heuristic):

- `sh: ls -la`
- `js: [1,2,3].map(x=>x*2)`
- `cfg:` (later) to inspect your pantry config
- and keep “no prefix” as auto-mode

That alone gives you:

- zero ambiguity when you want it
- still “just type commands” when you don’t

## Your `mapFn.ts` currently can’t run ##

`src/mapFn.ts` defines `mapFn` but never _does_ anything with argv, and `ts-node` isn’t in `package.json` deps—so the “custom map wrapper” in `ish.jsonc` won’t actually execute as-is.

If you want that as the canonical “custom primitive” example, you’ll want either:

- implement it as **plain JS** (no ts-node dependency), or
- add `ts-node` + `typescript` and make the file behave like a CLI:

    - read JSON from stdin or an argv param
    - run the transform
    - print JSON

## The “chef” model that matches your config file ##

Your `ish.jsonc` is already describing a nice 3-layer design:

1. **Allowed surface area** (“what words exist”)
2. **Router** (“what does `await` mean here?”)
3. **Implementation** (“file:src/mapFn.ts” etc.)

The _money_ move: treat each REPL line as one of:

- **Directive** (`:mode js`, `:help`, `:pantry`, `:allow …`)
- **Shell** (explicit or routed)
- **JS** (explicit or routed)

…and then let `ish.jsonc` decide which keywords are legal and what they translate to.

## One more gotcha: `sh()` prints twice-ish ##

Your `sh()` does `execSync(... stdio: ['inherit','pipe','pipe'])` and then `console.log(result)`.
That’s fine, but it means `sh()` is “print because I log,” not “print because the child prints.”
If you ever want true “interactive-ish” shell output, you’ll likely switch stdout to `inherit` for `sh()`.

## If you want a crisp next step (no bikeshedding) ##

Wire in **just these three things** and it’ll instantly feel like its own language:

1. `sh:` and `js:` prefixes
2. `:mode auto|sh|js` (sticky default engine)
3. parse `ish.jsonc` and expose `:pantry` to print what’s enabled + what’s mapped

Everything else (top-level `await`, fancy pipelines, value-typing, markdown fences) can come right after.

If you want, I can sketch the router logic using your `ish.jsonc` structure exactly (including JSONC parsing), but I won’t touch your files unless you explicitly tell me to start making edits.
