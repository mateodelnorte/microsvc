const exec = require("./_exec").noisy;

const attach = (repoPath, localPath) =>
  exec(`gits attach ${repoPath} ${localPath}`, { cwd: process.cwd() });

module.exports = { attach };
