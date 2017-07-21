const cp = require("child_process");
const debug = require("debug")("gits");
const path = require("path");

module.exports.attach = (repoPath, localPath, cb) => {
  const command = `gits attach ${repoPath} ${localPath}`;

  debug(`running '${command}' in cwd ${process.cwd()}`);

  cp.exec(command, { cwd: process.cwd() }, (err, stdout, stderr) => {
    if (err || stderr.toString().length)
      return cb(new Error(`gits error: ${err || stderr.toString()}`));
    console.log(stdout);
    cb();
  });
};
