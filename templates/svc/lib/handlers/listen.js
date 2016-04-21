/*jslint node: true */
'use strict';

const log = require("llog");

module.exports.ack = true;

module.exports.queueName = '[SERVICE_NAME]-user'; // setting a queue name helps us identify this service's queues easily

module.exports.routingKey = "user"; // send + listen pattern is used to send commands to services. "Do this"

module.exports.type = "onboard"; // an optional type parameter lets us send many different types of commands to a single queue, maintaining order.

module.exports.listen = function (event, cb) {

  log.info(`handling listened event of type ${event.type} with routingKey ${this.routingKey}`);

  /*

  do something with your event

  */

  cb();
};