<!-- markdownlint-configure-file {$DINGLEHOPPER/prod/ish/.markdownlint.jsonc} -->

# `ish` / ishScript #

<link rel="stylesheet" href="$DINGLEHOPPER/prod/ish/md.styles.css">

`zsh`/`node.js`/`[insert language here]` "summing" REPL.

> "Use the best parts of **\_\_\_\_**..."

## Zsh & JavaScript

| Feature         | zsh                                    | js                                              | ish                          |
| --------------- | -------------------------------------- | ----------------------------------------------- | ---------------------------- |
| Input           | ✅ `read`                              | `await, on[event]...`                           | `read`                       |
| Output          | ✅ `echo`                              | `console.log()`                                 | `echo`                       |
| Client (Browse) | `curl`                                 | ✅ `fetch`                                      | `fetch`                      |
| Comment         | ✅ `# comment`                         | ✅ `// comment`, `/** comment`, `/* comment */` | `//`, `#`, `/## comment`     |
| Peek            | ✅ `which`                             | ?                                               | `which`                      |
| Loop            | `while IFS= read -r linel do ... done` | ✅ `.map`                                       | `Array.map, map(Array, _cb)` |
| Switch          | `case ... [_]) ... ;; esac`            | ✅ `switch ([_]) { ... }`                       | `switch ([_]) { ... }`       |
| Concatenate     | ✅ `cat`                               | `require("node:fs/promises").readSync()`        | `cat`                        |

```ish

/ ##
/ # "ish(Script)"
/ #
/ ##

⚡ ls -la
// Shows directory listing
⚡ const files = $("ls \*.js")
⚡ files
'index.js\ntest.js\napp.js'
⚡ files.split('\n').length
3

⚡ cat package.json
// Shows file contents

⚡ const name = $("whoami")
⚡ echo "Hello, I am " + name
// Prints: Hello, I am yourname

# More Examples
⚡ for (let i = 0; i < 3; i++) { sh(`echo "Count: ${i}"`) }
Count: 0
Count: 1
Count: 2


⚡ pwd
/Users/you/project


⚡ JSON.parse($("cat package.json")).version
'1.0.0'
```
