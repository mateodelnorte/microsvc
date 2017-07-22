const callbackify = require("callbackify");
const exec = require("./_exec");

const prefixError = prefix => err => {
  throw new Error(`${prefix}${err.message}`);
};

const create = (args, options = {}) =>
  exec(`hub create ${args}`, options)
    .then(stdout => {
      if (stdout.indexOf("already exists") > -1) throw new Error(`${stdout}`);
    })
    .catch(prefixError("hub error:"));

module.exports = callbackify(create);
