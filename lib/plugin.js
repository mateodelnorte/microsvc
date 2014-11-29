var debug = require('debug')('microsvc:plugin');
var EventEmitter = require('events').EventEmitter;
var microsvc = require('../');
var util = require('util');

function Plugin () {
  EventEmitter.call(this);
}

util.inherits(Plugin, EventEmitter);

function log () {
  if (global.service) {
    global.service.log.debug.apply(this, [].slice(arguments));
  } else
    debug.apply(this, arguments);
}

Plugin.prototype.done = function done () {
  log('plugin %s loaded', this.constructor.name);
  this.emit('done');
};

Plugin.prototype.start = function start (service) {
  log('starting plugin %s', this.constructor.name);
  this._start(service);
};

Plugin.prototype._start = function _start (service) {
throw new Error('plugins must inherit a plugin._start(service) { /***/ } function');
};

module.exports = Plugin;