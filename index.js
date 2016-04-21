#!/usr/bin/env node

/**
 * Module dependencies.
 */

const createService = require('./lib/createService');

var program = require('commander')
  .version(require('./package.json').version);

program
  .command('create <SERVICE_NAME>')
  .description('creates a new service with example handlers and api exposed')
    .action(function (serviceName) {
      console.log('creating new microsvc \'${serviceName}\'...');
      createService(serviceName, (err) => {
        if (err) throw err;
        console.log('finished creating new microsvc \'${serviceName}\'...');
        console.log(`type 'cd ./${serviceName} && npm i && make run' to initialize and run`);
      });
    })

program.parse(process.argv);

if ( ! program.args.length) program.help();