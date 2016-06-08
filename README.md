# homebridge-rolling-spider

A plugin for [nfarina/homebridge](https://github.com/nfarina/homebridge) which support Parrot Rolling Spider, using [voodootikigod/node-rolling-spider](https://github.com/voodootikigod/node-rolling-spider).

# Installation

1. Install homebridge and this plugin using:
```sudo npm install -g homebridge homebridge-rolling-spider```

2. Update your configuration file. See the sample below.

# Configuration

Configuration sample:

 ```
"accessories": [
	{
		"accessory": "RollingSpider",
		"name": "drone",
		"uuid": ""
	}
]

```

UUID is an optional value, typically leave it blank and your drone will be found automatically by node-rolling-spider. If you want to discover and specify your UUID, use [Discovery Tool](https://github.com/voodootikigod/node-rolling-spider/blob/master/eg/discover.js).
See more details in [voodootikigod/node-rolling-spider](https://github.com/voodootikigod/node-rolling-spider).

# Acknowledgement

- [nfarina/homebridge](https://github.com/nfarina/homebridge)
- [voodootikigod/node-rolling-spider](https://github.com/voodootikigod/node-rolling-spider)