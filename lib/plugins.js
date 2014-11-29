var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('microsvc:plugins');
var microsvc = require('../');
var util = require('util');

function log () {
  if (global.service) {
    global.service.log.debug.apply(this, [].slice(arguments));
  } else
    debug.apply(this, arguments);
}

var plugins = [];

function Plugins () {
  EventEmitter.call(this);
}

util.inherits(Plugins, EventEmitter);

Plugins.prototype.empty = function () {
  return plugins.length === 0;
};

Plugins.prototype.plugin = function _plugin (plugin, service) {
  plugins.push(plugin);
};

Plugins.prototype.start = function _start (service) {
  log('starting plugins');
  var self = this, started = 0;
  function startPlugins () {
    if (plugins.length === 0) {
      log('plugins started');
      return self.emit('done');
    }
    plugin = plugins.shift();
    if (typeof plugin === 'function') {
      plugin = plugin(service);
    }
    plugin.once('done', startPlugins);
    plugin.start(service);
  }
  startPlugins();
};

module.exports = new Plugins();