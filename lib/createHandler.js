"use strict";

const fs = require("fs-extra");
const handlebarsStream = require("./handlebars-stream");
const path = require("path");

function createHandler(options = {}) {
  const dest = path.resolve(process.cwd(), options.dir || "./lib/handlers");
  const name = path.basename(options.name);
  const params = options.params;

  return fs.mkdirp(dest).then(
    () =>
      new Promise((resolve, reject) => {
        const read = fs.createReadStream(
          path.join(__dirname, "../templates/handler/handler.hbs")
        );
        const write = fs.createWriteStream(path.join(dest, `${name}.js`), {
          flags: "w"
        });

        read.on("error", reject);

        write.on("error", reject);

        write.on("finish", resolve);

        read.pipe(handlebarsStream(options.params)).pipe(write);
      })
  );
}

module.exports = createHandler;
