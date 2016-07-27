# microsvc

## Usage

```
> microsvc create system <system_name>
# creates a new microsvc system that acts as a meta project to
# house all other service, site, api, and etc. repos.
# microsvc systems are managed using gitslave.

> microsvc create service <service_name>
# creates a new microsvc service which comes with configuration management
# using cconfig, logging with llog, and servicebus for messaging.
```

## microsvc technology

* cconfig
* llog
* servicebus

## supporting technology

* gitslave
