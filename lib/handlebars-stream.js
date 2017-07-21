"use strict";

var handlebars = require("handlebars");
var Transform = require("stream").Transform;

function handlebarsStream(params) {
  var ts = new Transform();
  var chunks = [];

  ts._transform = function _transform(chunk, enc, cb) {
    chunks.push(chunk.toString());
    cb(null);
  };

  ts._flush = function _flush(cb) {
    if (chunks.length) {
      var template = handlebars.compile(chunks.join(""));
      var content = template(params);
      var buf = new Buffer(content.length);
      buf.write(content.toString());
      this.push(buf);
    }

    cb(null);
  };

  return ts;
}

module.exports = handlebarsStream;
