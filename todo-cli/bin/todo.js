#!/usr/bin/env node

const { spawn } = require("child_process");

const todo = spawn(process.execPath, [`${__dirname}/../lib/index.js`, ...process.argv.slice(2)], {
    stdio: "inherit",
});

todo.on("exit", (code) => {
  process.exit(code);
});
