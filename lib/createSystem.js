"use strict";

const git = require("./git");
const gits = require("./gits");
const hub = require("./hub");
const fs = require("fs-extra");
const ncp = require("ncp").ncp;
const path = require("path");
const replace = require("stream-replace");

function createSystem(systemName) {
  /*
  steps:

    1. hub create meta-repo, allowing org specification
    2. clone
    3. gits prepare
    4.
  */

  const name = path.basename(systemName);
  let dest = path.join(process.cwd(), name);

  return fs
    .mkdirp(name)
    .then(() => git.init(name))
    .then(() => hub.create(name, { cwd: dest }))
    .then(() => fs.mkdirp(dest))
    .then(
      () =>
        new Promise((resolve, reject) => {
          ncp(
            path.join(__dirname, "../templates/system"),
            dest,
            {
              clobber: true,
              rename: target => target.replace("[SYSTEM_NAME]", name),
              transform: (read, write, file) =>
                read.pipe(replace(/\[SYSTEM_NAME\]/g, name)).pipe(write)
            },
            err => (err ? reject(err) : resolve())
          );
        })
    );
}

module.exports = createSystem;
