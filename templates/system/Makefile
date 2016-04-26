MODULE?=
NODE_APPS?=account-svc blotter-svc compliance-svc credit-svc denormalizer dmm-monitor engagement-svc fix-config-svc fix-router icbc-gateway icbc-mock-provider job-svc market-svc market-config-svc notification-svc opportunity-svc reference-data-svc reporting-svc scheduler-svc scoring-svc settlement-svc slack-svc statestreet-credit-gateway statestreet-mock-provider surveillance-svc test-suite trader-svc treasury-svc user-presence-svc web-compliance web-corp
NODE_VERSION=5.6.0
VERSION=

_default: run

audit:
	SKIP_FILES=true $(MAKE) nsp

clean:
	for nodeApp in $(NODE_APPS); do cd $$nodeApp && rm -rf node_modules && cd ..; done
	rm -rf trace-importer
	rm -rf bondmath
	rm -rf node-python
	rm -rf settlement=mock-provider

clean-queues:
	for nodeApp in $(NODE_APPS); do cd $$nodeApp && rm -f .queues* && cd ..; done

install-pre:
	$(MAKE) maybe-npm-install-global APPS="n supervisor bower npm-cache"

install-node-apps:
	-n node $(NODE_VERSION)
	for nodeApp in $(NODE_APPS); do cd $$nodeApp && $(NPM_INSTALL_APP) install && cd ..; done

install-without-node-switching:
	PATH="$(shell dirname $(shell n which $(NODE_VERSION))):$$PATH" && \
		(for nodeApp in $(NODE_APPS); do cd $$nodeApp && npm install && cd ..; done)

install: install-tools install-python-apps install-pre install-node-apps
	-n node $(NODE_VERSION)

kill-all:
	-killall -9 node python
	-tmux kill-session -t [SYSTEM_NAME]

link-for-all:
	for app in $(NODE_APPS); do cd $$app && npm link $(MODULE) && cd ..; done

rebuild-no-cache:
	$(MAKE) NPM_INSTALL_APP=npm clean install init-submodules

rebuild: clean install init-submodules

init-submodules:
	gits submodule init
	gits submodule update

install-tools:
	if test `which tmux`; then \
		echo 'tmux installed. continuing'; \
	else \
		echo 'installing tmux'; \
		brew install tmux; \
	fi
	if test `which tmuxinator`; then \
		echo 'tmuxinator installed. continuing'; \
		export EDITOR='vim'; \
	else \
		echo 'installing tmux'; \
		gem install tmuxinator; \
		export EDITOR='vim'; \
	fi

manage-rabbitmq-qa:
	open http://localhost:3002 && ssh -L3002:nj1smq01:15672 staging

manage-rabbitmq-prod:
	open http://localhost:3001 && ssh -L3001:nj1pmq01:15672 production

nsp:
	./infra-tools/static-analysis/nsp.sh

populate:
	gits populate

reset-all: kill-all reset-queues reset-redis

reset-queues: clean-queues
	rabbitmqctl stop_app
	rabbitmqctl reset
	rabbitmqctl start_app
	rabbitmqctl set_vm_memory_high_watermark 0.8

reset-redis:
	redis-cli FLUSHALL

run:
	$(MAKE) run-only

run-only:
	mkdir -p ~/.tmuxinator
	cp ./tmuxinator.all.yml ~/.tmuxinator/[SYSTEM_NAME].yml
	NO_WEB=$(NO_WEB) mux [SYSTEM_NAME]

run-no-web:
	$(MAKE) NO_WEB=true run-only

test: test-unit test-integration

test-integration:
	cd test-suite; \
	make test; \

test-unit:
	testsuitestring='test-suite'
	for dir in * ; do \
		if [ -d $$dir ] && [ -f ./$$dir/node_modules/.bin/mocha ] ; then \
			echo running for mocha $$dir ; \
			cd $$dir; \
			make LOG_LEVEL=50 test; \
			echo \\n; \
			cd ..; \
		else \
			echo mocha not found. skipping for $$dir \\n; \
		fi \
	done

unlink-for-all:
	for app in $(NODE_APPS); do cd $$app && npm unlink $(MODULE) && cd ..; done

update-module-for-all:
	for app in $(NODE_APPS); do cd $$app && update-package-dot-json $(MODULE) $(VERSION) && cd ..; done

.PHONY: test
