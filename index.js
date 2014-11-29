var EventEmitter = require('events').EventEmitter;
var debug = require('debug');
var log = debug('microsvc');
var Plugin = require('./lib/plugin');
var plugins = require('./lib/plugins');
var util = require('util');

function Service () {
  this.log = {
    info: debug('info'),
    debug: debug('debug'),
    warn: debug('warn'),
    error: debug('error')
  };
  this.plugins = plugins;
  EventEmitter.call(Service);
}

util.inherits(Service, EventEmitter);

Service.prototype.global = function _global () {
  global.service = this;
  return this;
};

Service.prototype.logger = function _logger (logger) {
  this.log = logger;
  return this;
};

Service.prototype.param = function _param (param, value) {
  if ( param && ! value) return this[param];
  this[param] = value;
  return this;
};

Service.prototype.start = function start (cb) {
  var self = this;
  this.log.info('starting service');
  if (plugins.empty()) {
    return this.emit('started');
  }
  plugins.on('done', function () {
    self.emit('started');  
    if (cb) return cb();
  });
  plugins.start(this);
};

Service.prototype.Plugin = Plugin;

Service.prototype.plugin = function _plugin (plugin) {
  this.plugins.plugin(plugin, this);
  return this;
};

module.exports = new Service();