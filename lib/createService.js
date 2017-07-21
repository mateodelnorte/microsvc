"use strict";

const git = require("./git");
const gits = require("./gits");
const hub = require("./hub");
const mkdirp = require("mkdirp");
const ncp = require("ncp").ncp;
const path = require("path");
const replace = require("stream-replace");
var remove = require("remove");

module.exports = function(serviceName, cb) {
  const org = path.dirname(serviceName);
  const name = path.basename(serviceName);

  let dest = path.join(process.cwd(), name);

  mkdirp(dest, err => {
    if (err) return cb(err);

    // hub needs an existing local repo to create the remote
    git.init(name, { cwd: dest }, err => {
      if (err) return cb(err);

      hub.create(serviceName, err => {
        if (err) return cb(err);

        ncp(
          path.join(__dirname, "../templates/svc"),
          dest,
          {
            clobber: true,
            rename: function(target) {
              if (target.indexOf("[SERVICE_NAME") > -1)
                target = target.replace("[SERVICE_NAME]", name);
              return target;
            },
            transform: function(read, write, file) {
              read.pipe(replace(/\[SERVICE_NAME\]/g, name)).pipe(write);
            }
          },
          err => {
            if (err) return cb(err);

            git.remoteAddOrigin(org, name, { cwd: dest }, err => {
              if (err) return cb(err);

              git.addAllCommitAndPush("initial commit", { cwd: dest }, err => {
                if (err) return cb(err);

                // gits requires no local repo, so we remove it
                remove(dest, function(err) {
                  if (err) return cb(err);

                  // and then reclone during the attach
                  gits.attach(`../${name}`, name, err => {
                    if (err) return cb(err);

                    cb();
                  });
                });
              });
            });
          }
        );
      });
    });
  });
};
