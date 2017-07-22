const cp = require("child_process");
const debug = require("debug")("gits");
const path = require("path");
const callbackify = require("callbackify");

const exec = require("./_exec");

const prepareOptions = (opts = {}) => Object.assign({ cwd: defaultDir }, opts);

const defaultDir = path.resolve(process.cwd());

const add = (files, options) =>
  exec(`git add ${files}`, prepareOptions(options)).then(console.log);

const addAllCommitAndPush = (message, options) =>
  add(".", options)
    .then(() => commit(message, options))
    .then(() => push("master", options));

const commit = (message, options) =>
  exec(`git commit -m '${message}'`, prepareOptions(options)).then(console.log);

const init = (args, options) =>
  exec("git init", prepareOptions(options)).then(console.log);

const push = (branch, options) =>
  exec(`git push origin ${branch}`, prepareOptions(options)).then(console.log);

const remoteAddOrigin = (owner, name, options) =>
  exec(
    `git remote add origin git@github.com:${owner}/${name}.git`,
    prepareOptions(options)
  ).then(console.log);

// callbackify is temporary and won't be needed when everything's moved over to using promises
module.exports = {
  add: callbackify(add),
  addAllCommitAndPush: callbackify(addAllCommitAndPush),
  commit: callbackify(commit),
  init: callbackify(init),
  push: callbackify(push),
  remoteAddOrigin: callbackify(remoteAddOrigin)
};
