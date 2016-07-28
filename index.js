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

const createBlank = require('./lib/createBlank');

program
  .command('blank <PROJECT_NAME>')
  .description('creates a new blank project managed by gitslave')
    .action(function (project) {
      console.log(`creating new blank project: \'${project}\'...`);
      createBlank(project, (err) => {
        if (err) throw err;
        console.log(`finished creating new blank project \'${project}\'...`);
        console.log(`type 'cd ./${project}' to enter project directory`);
      });
    })

program.parse(process.argv);

if ( ! program.args.length) program.help();
