//GUIGLASS 2017
//TRAFFIC CONDITIONS MODULE
Module.resgister("trafficconditions",{
	defaults: {
		locationStartX: 32.909623,
		locationStartY: -96.770208,
		locationEndX: 32.909623,
		locationEndY: -96.770208,
		apiBase: "https://navi.nickroberts.io",
		endpoint: "traffic/state",
		};
		start: function() {
		Log.info("Starting module: " + this.name);

		// Set locale.
		moment.locale(config.language);

		this.traffic = "";
		this.loaded = false;
		this.scheduleUpdate(this.config.initialLoadDelay);

		this.updateTimer = null;
		var url = this.config.apiBase + this.config.apiVersion + "/" + this.config.forecastEndpoint + locationStartX + "/" + locationStartY + "/" + locationEndX + "/" + locationEndY
		var request = new XMLHttpRequest();
		request.open("POST", url, true);
		request.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.processResponse(JSON.parse(this.response));
				
				} else {
					Log.error(self.name + ": Could not load.");
				}

		
			}
		};
		weatherRequest.send();


	};
	processResponse: function(data) {

		this.traffic = data.state;
		//Log.log(this.forecast);
		this.show(this.config.animationSpeed, {lockString:this.identifier});
		this.loaded = true;
		this.update();

	},


});