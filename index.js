#!/usr/bin/env node
const repl = require('repl');
const { execSync } = require('child_process');
const vm = require('vm');

// Execute shell command and return output
function $(cmd) {
  try {
    return execSync(cmd, { 
      encoding: 'utf8', 
      shell: '/bin/zsh',
      stdio: ['pipe', 'pipe', 'pipe']
    }).trim();
  } catch (error) {
    return error.stdout || error.message;
  }
}

// Execute shell command and print output (like zsh does)
function sh(cmd) {
  try {
    const result = execSync(cmd, { 
      encoding: 'utf8', 
      shell: '/bin/zsh',
      stdio: ['inherit', 'pipe', 'pipe']
    });
    console.log(result);
    return result.trim();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

// Start custom REPL
const r = repl.start({
  prompt: '⚡ ',
  eval: async (cmd, context, filename, callback) => {
    cmd = cmd.trim();
    
    // Remove parentheses wrapping if present
    if (cmd.startsWith('(') && cmd.endsWith(')')) {
      cmd = cmd.slice(1, -1).trim();
    }
    
    // Check if it looks like a shell command (no JS syntax)
    const isShellCommand = !cmd.match(/^(const|let|var|function|class|if|for|while|return|=>|\{|\[)/) 
                          && !cmd.includes('=')
                          && !cmd.match(/\.\w+\(/);
    
    if (isShellCommand && !cmd.startsWith('$') && !cmd.startsWith('sh(')) {
      // Execute as shell command
      try {
        const output = execSync(cmd, { 
          encoding: 'utf8', 
          shell: '/bin/zsh' 
        });
        console.log(output);
        callback(null, undefined);
      } catch (error) {
        callback(null, undefined);
      }
    } else {
      // Execute as JavaScript
      try {
        const result = vm.runInContext(cmd, context, { filename });
        callback(null, result);
      } catch (error) {
        callback(error);
      }
    }
  }
});

// Add utilities to REPL context
r.context.$ = $;
r.context.sh = sh;
r.context.shell = execSync;

console.log('🚀 Hybrid JS/Zsh REPL started!');
console.log('   - Type shell commands directly: ls -la');
console.log('   - Use $("cmd") to capture output: const files = $("ls")');
console.log('   - Use sh("cmd") to print output: sh("cat file.txt")');
console.log('   - Mix JS and shell: files.split("\\n").forEach(f => sh(`cat ${f}`))\n');
