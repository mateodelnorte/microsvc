"use strict";
const callbackify = require("callbackify");
const fs = require("fs-extra");
const git = require("./git");
const gits = require("./gits");
const hub = require("./hub");
const ncp = require("ncp").ncp;
const path = require("path");
const replace = require("stream-replace");
const remove = require("remove");

function createService(serviceName) {
  const org = path.dirname(serviceName);
  const name = path.basename(serviceName);

  let dest = path.join(process.cwd(), name);

  return fs
    .mkdirp(dest)
    .then(() => git.init(name, { cwd: dest })) // hub needs an existing local repo to create the remote
    .then(() => hub.create(serviceName))
    .then(
      () =>
        new Promise((resolve, reject) =>
          ncp(
            path.join(__dirname, "../templates/svc"),
            dest,
            {
              clobber: true,
              rename: target => target.replace("[SERVICE_NAME]", name),
              transform: (read, write, file) =>
                read.pipe(replace(/\[SERVICE_NAME\]/g, name)).pipe(write)
            },
            err => (err ? reject(err) : resolve())
          )
        )
    )
    .then(() => git.remoteAddOrigin(org, name, { cwd: dest }))
    .then(() => git.addAllCommitAndPush("initial commit", { cwd: dest }))
    .then(() => fs.remove(dest)) // gits requires no local repo, so we remove it
    .then(() => gits.attach(`../${name}`, name)); // and then reclone during the attach
}

module.exports = callbackify(createService);
