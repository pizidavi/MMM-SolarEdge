var request = require('request');
var NodeHelper = require('node_helper');

module.exports = NodeHelper.create({

	start: function() { },

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		console.log('Notification: ' + notification + ' Payload: ' + payload);

		if(notification === 'GET_SOLAR') {
			var solarEdgeUrl = payload.config.url + payload.config.siteId + '/currentPowerFlow.json?api_key=' + payload.config.apiKey;
			request(solarEdgeUrl, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					var jsonData = JSON.parse(body);
				    self.sendSocketNotification('SOLAR_DATA', jsonData);
				}
			});
		}
	},

});
