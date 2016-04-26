#!/usr/bin/env node

/**
 * Module dependencies.
 */


const createSystem = require('./lib/createSystem');

var program = require('commander')
  .version(require('./package.json').version);

program
  .command('system <SYSTEM_NAME>')
  .description('creates a new system')
    .action(function (serviceName) {
      console.log(`creating new system \'${systemName}\'...`);
      createSystem(systemName, (err) => {
        if (err) throw err;
        console.log(`finished creating new system \'${systemName}\'...`);
        console.log(`type 'cd ./${systemName}' and begin creating your first services`);
      });
    })

const createService = require('./lib/createService');

program
  .command('service <SERVICE_NAME>')
  .description('creates a new service with example handlers and api exposed')
    .action(function (serviceName) {
      console.log(`creating new microsvc \'${serviceName}\'...`);
      createService(serviceName, (err) => {
        if (err) throw err;
        console.log(`finished creating new microsvc \'${serviceName}\'...`);
        console.log(`type 'cd ./${serviceName} && npm i && make run' to initialize and run`);
      });
    })

program.parse(process.argv);

if ( ! program.args.length) program.help();