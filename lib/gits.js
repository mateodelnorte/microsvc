const callbackify = require("callbackify");
const exec = require("./_exec");

const cp = require("child_process");
const debug = require("debug")("gits");
const path = require("path");

const attach = (repoPath, localPath) =>
  exec(`gits attach ${repoPath} ${localPath}`, { cwd: process.cwd() }).then(
    console.log
  );

module.exports = {
  attach: callbackify(attach)
};
