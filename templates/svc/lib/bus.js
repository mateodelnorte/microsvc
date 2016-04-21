const config = require('cconfig')();
const log = require('llog');
const servicebus = require('servicebus');
const messageDomain = require('servicebus-message-domain');
const retry = require('servicebus-retry');

const bus = servicebus.bus({
  enableConfirms: true,
  prefetch: config.SERVICEBUS_PREFETCH,
  url: config.RABBITMQ_URL
});

bus.use(messageDomain());
bus.use(bus.logger());
bus.use(bus.package());
bus.use(bus.correlate());
bus.use(retry({
  store: new retry.RedisStore({
    host: config.REDIS.HOST,
    port: config.REDIS.PORT
  })
}));

module.exports = bus;