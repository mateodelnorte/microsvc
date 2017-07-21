const { exec } = require("child_process");
const debug = require("debug")("exec");
const callbackify = require("callbackify");

module.exports = (command, options = {}) =>
  new Promise((resolve, reject) => {
    const cwd = options.cwd || path.resolve(process.cwd());

    debug(`running '${command}' in cwd ${cwd}`);

    exec(command, { cwd }, (err, stdout, stderr) => {
      if (err || stderr.toString().length)
        return reject(new Error(err || stderr.toString()));

      let output = stdout.toString();

      if (output.indexOf("already exists") > -1)
        return reject(new Error(output));

      resolve(output);
    });
  });
