const { exec } = require("child_process");
const path = require("path");

const debug = require("debug")("exec");

const defaultDir = path.resolve(process.cwd());

module.exports = (command, options) =>
  new Promise(function(resolve, reject) {
    const cwd = (options || {}).cwd || defaultDir;

    debug(`running '${command}' in cwd ${cwd}`);

    exec(command, { cwd }, (err, stdout, stderr) => {
      if (err || stderr.toString().length)
        return reject(new Error(err || stderr.toString()));

      resolve(stdout.toString());
    });
  });
