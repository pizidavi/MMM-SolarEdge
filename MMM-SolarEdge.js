/*
* Magic Mirror module for displaying SolarEdge data
* By pizidavi, forked from bertieuk https:// github.com/bertieuk/MMM-SolarEdge
* MIT Licensed
*/

Module.register('MMM-SolarEdge',{
  // Default module config.
  defaults: {
    url: 'https:// monitoringapi.solaredge.com/site/',
    apiKey: '', // Enter API key in config.js not here
    siteId: '',
    interval: 60*1000, // 1 minute
  },

  start: function() {
    // Logging appears in developer tools console
    Log.info('Starting module: ' + this.name);

    this.loaded = false;
    this.titles = ['Producted', 'Usaged', 'Released/Received'];
    this.results = [];

    this.getSolarData();

    var self = this;
    setInterval(function() {
      self.getSolarData();
    }, this.config.interval);
  },

  // Import additional CSS Styles
  getStyles: function() {
    return ['solar.css']
  },

  // Contact node helper for solar data
  getSolarData: function() {
    Log.info('SolarApp: getting data');

    this.sendSocketNotification('GET_SOLAR', {
      config: this.config
    });
  },

  // Handle node helper response
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'SOLAR_DATA') {
      this.results[0] = payload.siteCurrentPowerFlow.PV.currentPower;	// Producted
      this.results[1] = payload.siteCurrentPowerFlow.LOAD.currentPower;	// Usaged
      this.results[2] = payload.siteCurrentPowerFlow.GRID.currentPower;	// Released/Received

      this.loaded = true;
      this.updateDom(1000);
    }
  },

  // Override dom generator.
  getDom: function() {
    var wrapper = document.createElement('div');

    if (!this.config.apiKey || !this.config.siteId) {
      wrapper.innerHTML = 'Missing configuration.';
      return wrapper; }

    if (!this.loaded) {
	    wrapper.innerHTML = 'Loading...';
      return wrapper; }

    var tb = document.createElement('table');
    for (var i = 0; i < this.results.length; i++) {
      var row = document.createElement('tr');

      var titleTr = document.createElement('td');
      var dataTr = document.createElement('td');

      titleTr.innerHTML = this.titles[i];
      titleTr.className += ' medium regular bright';
      dataTr.innerHTML = this.results[i];
      dataTr.classname += ' medium light normal';

      row.appendChild(titleTr);
      row.appendChild(dataTr);

      tb.appendChild(row);
  	}
    wrapper.appendChild(tb);

    return wrapper;
  }
});
