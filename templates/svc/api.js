const bodyParser = require('body-parser');
const config = require('cconfig')();
const express = require('express');
const log = require('llog');
const onHeaders = require('on-headers');
const pretty = require('pretty-hrtime');
const path = require('path');

module.exports.start = (cb) => {

  const app = express();

  app.use(function (req, res, next) {
    const started = process.hrtime();
    const method = req.method;
    const path = req.path;
    log.debug('%s: %s', method, path);
    onHeaders(res, function onHeaders () {
      const ended = process.hrtime(started);
      log.debug('%s: %s took %s', method, path, pretty(ended));
    });
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/', require('./routes/index'));

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {}
    });
  });

  app.set('port', config.PORT || 3000);

  var server = app.listen(app.get('port'), function() {

    log.info('web api started on port %s', app.get('port'));

    cb();
  });

};