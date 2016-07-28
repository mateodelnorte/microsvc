# microsvc

```microsvc``` is a tiny reusable framework for building microservices with messaging and rest

## Installation

```
npm install -g microsvc
```

### Dependencies

```microsvc``` uses ```hub``` by github in order to create repositories on github for you. Follow [hub's official instructions](https://hub.github.com/) to install and configure ```hub``` on your machine.

```microsvc``` uses ```gitslave``` to create a metarepo that handles performing commands across any number of attached repositories. Gitslave may be installed via brew install gitslave, but note you may find an issue with using the command gits status on macs with newer versions of git. To escape that fun little problem, we've made our own fix and made it available to you as an npm package via ```npm i gitslave -g```. You're welcome!

## Usage

```
> microsvc create system <system_name>
# creates a new microsvc system that acts as a meta project to
# house all other service, site, api, and etc. repos.
# microsvc systems are managed using gitslave.

> microsvc create service <service_name>
# creates a new microsvc service which

> microsvc create handler <FILE_NAME>
# creates a new handler in the current directory
# with the provided routingKey and additional options
```

---

### ```microsvc create system```

This project acts as a meta project to house all other service, site, api, etc repos.

To most easily work on all repos in unison, use [gitslave](http://gitslave.sourceforge.net/). A good intro example of [gitslave](http://gitslave.sourceforge.net/) usage can be found (here)[http://gitslave.sourceforge.net/tutorial-basic.html].

To get started, download [gitslave](http://gitslave.sourceforge.net/) and perform the following operation in the development directory of your choice: 'gits clone git@github.com:example/repo.git'.

```
microsvc create system <SYSTEM_NAME>
```

---

### ```microsvc create service```

Creates a new service with example handlers and api exposed. The service also comes configured with configuration management using cconfig, logging with llog, and servicebus for messaging.

```
microsvc create service <SERVICE_NAME>
```

---

### ```microsvc create handler```

Creates a new handler with the provided routingKey and additional options.

```
microsvc create handler <FILE_NAME>
```

#### Options:

```
-h, --help                      output usage information
-V, --version                   output the version number
-s, --subscribe                 create subscribe handler (defaults to listen)
-r, --routingKey [routing key]  set the routing key name
-q, --queueName [queue name]    set the queue name
-a, --ack                       set ack=true to create persistent queue and durable messages
-t, --type [message type]       filter to a specific message type
-w, --where [where clause]      provide a where clause
```

## microsvc technology

* [cconfig](https://github.com/mateodelnorte/cconfig)
* [llog](https://github.com/mateodelnorte/llog)
* [servicebus](https://github.com/mateodelnorte/servicebus)

## supporting technology

* [gitslave](http://gitslave.sourceforge.net/)
