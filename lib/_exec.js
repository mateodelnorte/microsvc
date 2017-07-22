const { spawn } = require("child_process");
const path = require("path");
const parseSpawnArgs = require("parse-spawn-args").parse;

const debug = require("debug")("exec");

const defaultDir = path.resolve(process.cwd());

function exec(command, options = {}) {
  return new Promise(function(resolve, reject) {
    const cwd = options.cwd || defaultDir;
    const noisy = !!options.noisy;

    debug(`running '${command}' in cwd ${cwd}`);

    const commandParts = command.split(/\s+/g, 2);
    const args = parseSpawnArgs(command.replace(/^\S+/g, ""));

    const program = spawn(commandParts[0], args, { cwd });

    const errors = [];
    const output = [];

    program.stdout.on("data", function(data) {
      const message = data.toString();
      if (noisy) console.log(message);
      output.push(message);
    });

    program.stderr.on("data", function(data) {
      const message = data.toString();
      console.error(message);
      errors.push(message);
    });

    program.on("exit", function(code) {
      return code
        ? reject(
            new Error(errors.join("\n") || `Error: Command failed: ${command}`)
          )
        : resolve(output.join("\n"));
    });
  });
}

// stdout is displayed
exec.noisy = (command, options = {}) =>
  exec(command, Object.assign({}, options, { noisy: true }));

module.exports = exec;
