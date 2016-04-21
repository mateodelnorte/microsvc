/*jslint node: true */
'use strict';

const log = require("llog");

module.exports.ack = true;

module.exports.routingKey = "product.updated"; // publish + subscribe pattern is used to react to fanout messages from other services. "this happened"

module.exports.suscribe = function (event, cb) {

  log.info(`handling subscribed event of type ${event.type} with routingKey ${this.routingKey}`);

  /*

  do something with your event

  */

  cb();
};