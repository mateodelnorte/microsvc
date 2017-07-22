const bus = require("./lib/bus");
const config = require("cconfig")();
const log = require("llog");
const registerHandlers = require("servicebus-register-handlers");
const util = require("util");

module.exports.start = cb => {
  registerHandlers({
    bus: bus,
    handleError: function handleError(msg, err) {
      log.error(
        "error handling %s: %s. rejecting message w/ cid %s and correlationId %s.",
        msg.type,
        err,
        msg.cid,
        this.correlationId
      );

      log.error(err);

      msg.handle.reject(function() {
        throw err;
      });
    },
    path: "./lib/handlers",
    queuePrefix: "[SERVICE_NAME]-svc"
  });

  cb();
};
