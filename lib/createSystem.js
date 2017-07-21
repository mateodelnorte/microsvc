'use strict';

const git = require('./git');
const gits = require('./gits');
const hub = require('./hub');
const mkdirp = require('mkdirp');
const ncp = require('ncp').ncp;
const path = require('path');
const replace = require('stream-replace');

module.exports = function (systemName, cb) {

  /*
  steps:

    1. hub create meta-repo, allowing org specification
    2. clone
    3. gits prepare
    4.
  */

  const name = path.basename(systemName);

  mkdirp(name, (err) => {

    git.init(name, (err) => {
      if (err) return cb(err);

      hub.create(name, { cwd: path.resolve(process.cwd(), name) }, (err) => {
        if (err) return cb(err);

        let dest = path.join(process.cwd(), name);

        mkdirp(dest, (err) => {
          ncp(path.join(__dirname, '../templates/system'), dest, {
            clobber: true,
            rename: function(target) {
              if(target.indexOf('[SYSTEM_NAME') > -1) target = target.replace('[SERVICE_NAME]', name);;
              return target;
            },
            transform: function(read, write, file) {
              read
                .pipe(replace(/\[SYSTEM_NAME\]/g, name))
                .pipe(write);
            }
          },cb);

        });

      });

    });

  });

}