var Service, Characteristic;
var RollingSpider = require("rolling-spider");


module.exports = function(homebridge){
	console.log("homebridge API version: " + homebridge.version);

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-rolling-spider", "RollingSpider", RollingSpiderAccessory);
}

var isConnected = false;

function RollingSpiderAccessory(log, config) {
	var self = this;
	this.log = log;

	// Recieve settings from config.json
	this.uuid = config["uuid"] || "";
	// Set default service as a Switch
  this.service = config["service"] || "Switch";

  // Initialize Rolling Spider
  this.rs = (this.uuid!="") ?
  	new RollingSpider({uuid:this.uuid}) : new RollingSpider();

  // Connect with Rolling Spider
	this.rs.connect( function(err) {
		if( err ) {
			self.log("err="+err);
			return;
		}
		self.log("Connected with rolling-spider:"+self.rs.name);
	  self.rs.setup( function() {

	  	// Stabilize
	  	self.rs.flatTrim();
	    self.rs.startPing();
	    self.rs.flatTrim();

	    // Set flags to true
	    setTimeout( function() {
	      self.log("Ready to takeoff:" + self.rs.name);
	      isConnected = true;
	    }, 1000);
    } );
  } );
}

RollingSpiderAccessory.prototype = {

	setFlyingState: function(takeoff, callback) {
		this.log("setFlyingState // CONNECTED="+isConnected+", takeoff="+takeoff);
		if( isConnected ) {
			if (takeoff) {
				this.log("Setting flying state to - takeoff");
				this.rs.takeoff();
				this.rs.flatTrim();
			} else {
				this.log("Setting flying state to - landing");
				this.rs.land();
			}
			callback();
		} else {
			// callback("error");
			callback();
		}
	},

	identify: function(callback) {
		this.log("Identify!!!");
		callback(); // success
	},

	getServices: function() {
		this.log("getServices // this.service="+this.service);

		var services = [];

		// Information service
		var informationService = new Service.AccessoryInformation();
		informationService
			.setCharacteristic(Characteristic.Manufacturer, "Parrot")
			.setCharacteristic(Characteristic.Model, "RollingSpider Model")
			.setCharacteristic(Characteristic.SerialNumber, "RollingSpider Serial Number");
		services.push(informationService);

		// Switch
		if( this.service=='Switch' ) {
			var switchService = new Service.Switch(this.name);
			switchService
		    .getCharacteristic(Characteristic.On)
		    .on('set', this.setFlyingState.bind(this));
			services.push(switchService);
		}

		return services;
	}
};
