"use strict";

const fs = require("fs-extra");
const git = require("./git");
const gits = require("./gits");
const hub = require("./hub");
const ncp = require("ncp").ncp;
const path = require("path");
const replace = require("stream-replace");

function createBlank(projectName) {
  const org = path.dirname(projectName);
  const name = path.basename(projectName);

  let dest = path.join(process.cwd(), name);

  return fs
    .mkdirp(dest)
    .then(() => git.init(name, { cwd: dest }))
    .then(() => hub.create(projectName, { cwd: dest }))
    .then(
      () =>
        new Promise((resolve, reject) => {
          ncp(
            path.join(__dirname, "../templates/blank"),
            dest,
            {
              clobber: true,
              rename: target => target.replace("[PROJECT_NAME]", name),
              transform: (read, write, file) =>
                read.pipe(replace(/\[PROJECT_NAME\]/g, name)).pipe(write)
            },
            err => (err ? reject(err) : resolve())
          );
        })
    )
    .then(() => git.remoteAddOrigin(org, name, { cwd: dest }))
    .then(() => git.addAllCommitAndPush("initial commit", { cwd: dest }))
    .then(() => fs.remove(dest)) // gits requires no local repo, so we remove it
    .then(() => gits.attach(`../${name}`, name)); // and then reclone during the attach
}

module.exports = createBlank;
