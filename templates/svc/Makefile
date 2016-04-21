DEBUG=debug*,info*,warn*,error*
LOG_LEVEL=0

run: start

start:
	DEBUG=$(DEBUG) \
	LOG_LEVEL=$(LOG_LEVEL) \
	supervisor ./bin/[SERVICE_NAME]-svc | ./node_modules/.bin/bunyan -o short -l $(LOG_LEVEL)

.PHONY: test