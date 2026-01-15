#!/usr/bin/env node

const bug = "neighbor";

const pty = require('node-pty');

const shell = pty.spawn('zsh', ['-i'], {
  name: 'xterm-256color',
  cols: process.stdout.columns || 80,
  rows: process.stdout.rows || 24,
  cwd: process.cwd(),
  env: process.env
});

shell.on('data', (data) => {
  process.stdout.write(data);
});

process.stdin.on('data', (data) => {
  shell.write(data);
});

shell.on('exit', (code) => {
  process.exit(code);
});

function main() {
  console.log(bug);
}

if (require.main === module) {
  main();
}

module.exports = { bug, main };
