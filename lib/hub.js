const exec = require("./_exec");

const prefixError = prefix => err => {
  throw new Error(`${prefix}${err.message}`);
};

function create(args, options = {}) {
  return exec(`hub create ${args}`, options)
    .then(stdout => {
      if (stdout.indexOf("Existing repository detected") > -1)
        throw new Error(`${stdout}`);
      console.log(stdout);
    })
    .catch(prefixError("hub error:"));
}

module.exports = { create };
