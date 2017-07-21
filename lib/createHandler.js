"use strict";

const fs = require("fs");
const handlebarsStream = require("./handlebars-stream");
const mkdirp = require("mkdirp");
const ncp = require("ncp").ncp;
const path = require("path");
var remove = require("remove");

module.exports = function(options, cb) {
  options = options || {};

  const dest = path.join(process.cwd(), options.dir || "./lib/handlers");
  const name = path.basename(options.name);
  const params = options.params;

  mkdirp(dest, err => {
    if (err) return cb(err);

    const read = fs.createReadStream(
      path.join(__dirname, "../templates/handler/handler.hbs")
    );
    const write = fs.createWriteStream(path.join(dest, `${name}.js`), {
      flags: "w"
    });

    read.on("error", cb);

    write.on("error", cb);

    write.on("finish", cb);

    read.pipe(handlebarsStream(options.params)).pipe(write);
  });
};
