const cp = require("child_process");
const debug = require("debug")("hub");
const path = require("path");

module.exports.create = (args, options, cb) => {
  if (typeof options === "function") {
    cb = options;
    options = {};
  }

  const command = `hub create ${args}`;
  const cwd = options.cwd || path.resolve(process.cwd());

  debug(`running '${command}' in cwd ${cwd}`);

  cp.exec(command, { cwd: cwd }, (err, stdout, stderr) => {
    if (err || stderr.toString().length)
      return cb(new Error(`hub error: ${err}`));
    if (stdout.toString().indexOf("already exists") > -1)
      return cb(new Error(`hub error: ${stdout}`));
    cb();
  });
};
