"use strict";

const handlebars = require("handlebars");
const Transform = require("stream").Transform;

function handlebarsStream(params) {
  const ts = new Transform();
  const chunks = [];

  ts._transform = function _transform(chunk, enc, cb) {
    chunks.push(chunk.toString());
    cb(null);
  };

  ts._flush = function _flush(cb) {
    if (chunks.length) {
      const template = handlebars.compile(chunks.join(""));
      const content = template(params);
      const buf = new Buffer(content.length);
      buf.write(content.toString());
      this.push(buf);
    }

    cb(null);
  };

  return ts;
}

module.exports = handlebarsStream;
