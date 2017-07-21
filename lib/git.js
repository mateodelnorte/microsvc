const cp = require("child_process");
const debug = require("debug")("gits");
const path = require("path");

var add = (module.exports.add = function(files, options, cb) {
  if (typeof options === "function") {
    cb = options;
    options = {};
  }

  options = options || {};
  options.cwd = options.cwd || path.resolve(process.cwd());

  const command = `git add ${files}`;

  debug(`running '${command}' in cwd ${options.cwd}`);

  cp.exec(command, { cwd: options.cwd }, (err, stdout, stderr) => {
    if (err || stderr.toString().length) return cb(err);
    console.log(stdout);
    cb();
  });
});

module.exports.addAllCommitAndPush = (message, options, cb) => {
  if (typeof options === "function") {
    cb = options;
    options = {};
  }

  options = options || {};
  options.cwd = options.cwd || path.resolve(process.cwd());
  console.log(111, options);
  return add(
    ".",
    { cwd: options.cwd },
    commit.bind(
      commit,
      message,
      { cwd: options.cwd },
      push.bind(push, "master", { cwd: options.cwd }, cb)
    )
  );
};

var commit = (module.exports.commit = function(message, options, cb) {
  if (typeof options === "function") {
    cb = options;
    options = {};
  }

  options = options || {};
  options.cwd = options.cwd || path.resolve(process.cwd());

  const command = `git commit -m '${message}'`;

  debug(`running '${command}' in cwd ${options.cwd}`);

  cp.exec(command, { cwd: options.cwd }, (err, stdout, stderr) => {
    if (err || stderr.toString().length) return cb(err);
    console.log(stdout);
    cb();
  });
});

module.exports.init = (args, options, cb) => {
  if (typeof options === "function") {
    cb = options;
    options = {};
  }

  options = options || {};
  options.cwd = options.cwd || path.resolve(process.cwd());

  const command = `git init`;

  debug(`running '${command}' in cwd ${options.cwd}`);

  cp.exec(
    command,
    { cwd: path.resolve(process.cwd(), args) },
    (err, stdout, stderr) => {
      if (err || stderr.toString().length) return cb(err);
      console.log(stdout);
      cb();
    }
  );
};

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

var remoteAddOrigin = (module.exports.remoteAddOrigin = function(
  owner,
  name,
  options,
  cb
) {
  if (typeof options === "function") {
    cb = options;
    options = {};
  }

  options = options || {};
  options.cwd = options.cwd || path.resolve(process.cwd());

  const command = `git remote add origin git@github.com:${owner}/${name}.git`;

  debug(`running '${command}' in cwd ${options.cwd}`);

  cp.exec(command, { cwd: options.cwd }, (err, stdout, stderr) => {
    if (err || stderr.toString().length) return cb(err);
    console.log(stdout);
    cb();
  });
});
