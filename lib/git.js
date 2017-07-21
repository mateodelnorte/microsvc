const cp = require("child_process");
const debug = require("debug")("gits");
const path = require("path");

const exec = require("./_exec");
const callbackify = require("callbackify");

const augmentCwd = (opts = {}) => {
  if (!opts.cwd) opts.cwd = path.resolve(process.cwd());
  return opts;
};

const add = (module.exports.add = callbackify((files, options) =>
  exec(`git add ${files}`, augmentCwd(options)).then(console.log)
));

module.exports.addAllCommitAndPush = callbackify((message, options) =>
  add(".", options)
    .then(() => commit(message, options))
    .then(() => push("master", options))
);

const commit = (module.exports.commit = callbackify((message, options) =>
  exec(`git commit -m '${message}'`, augmentCwd(options)).then(console.log)
));

module.exports.init = callbackify((args, options) =>
  exec("git init", augmentCwd(options)).then(console.log)
);

var push = (module.exports.push = function(branch, options, cb) {
  if (typeof options === "function") {
    cb = options;
    options = {};
  }

  options = options || {};
  options.cwd = options.cwd || path.resolve(process.cwd());

  const command = `git push origin ${branch}`;

  debug(`running '${command}' in cwd ${options.cwd}`);

  cp.exec(command, { cwd: options.cwd }, (err, stdout, stderr) => {
    if (err || stderr.toString().length) return cb(err);
    console.log(stdout);
    cb();
  });
});

const remoteAddOrigin = (module.exports.remoteAddOrigin = callbackify(
  (owner, name, options) =>
    exec(
      `git remote add origin git@github.com:${owner}/${name}.git`,
      augmentCwd(options)
    ).then(console.log)
));
