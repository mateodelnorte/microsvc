'use strict';

const mkdirp = require('mkdirp');
const ncp = require('ncp').ncp;
const path = require('path');
const replace = require('stream-replace');

module.exports = function (serviceName, cb) {
  let dest = path.join(process.cwd(), serviceName);
  mkdirp(dest, (err) => {
    ncp(path.join(__dirname, '../templates/svc'), dest, {
      clobber: true,
      rename: function(target) {
        if(target.indexOf('[SERVICE_NAME') > -1) target = target.replace('[SERVICE_NAME]', serviceName);;
        return target;
      },
      transform: function(read, write, file) {
        read
          .pipe(replace(/\[SERVICE_NAME\]/g, serviceName))
          .pipe(write);
      }
    },cb);
  });
}