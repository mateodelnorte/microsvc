const debug = require("debug")("gits");
const path = require("path");

const exec = require("./_exec").noisy;

const add = (files, options = {}) => exec(`git add ${files}`, options);

const addAllCommitAndPush = (message, options = {}) =>
  add(".", options)
    .then(() => commit(message, options))
    .then(() => push("master", options));

const commit = (message, options = {}) =>
  exec(`git commit -m '${message}'`, options);

const init = (args, options = {}) =>
  //TODO: make this reference the options
  exec("git init", { cwd: path.resolve(process.cwd(), args) });

const push = (branch, options = {}) =>
  exec(`git push origin ${branch}`, options);

const remoteAddOrigin = (owner, name, options = {}) =>
  exec(
    `git remote add origin git@github.com:${owner}/${name}.git`,
    options
  ).catch(err => {
    // already exists is considered a successful origin add
    if (err.message.includes("already exists")) return;

    throw err;
  });

module.exports = {
  add,
  addAllCommitAndPush,
  commit,
  init,
  push,
  remoteAddOrigin
};
