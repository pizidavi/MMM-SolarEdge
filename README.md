# MMM-SolarEdge
A [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror) module, for a SolarEdge system, displaying the energy produced, used and received/released to the grid by your SolarEdge system, updated every minute  

## Installation
  1. Clone repo into MagicMirror/modules directory  
  2. Get a SolarEdge API Key:  
    1. Open [Solaredge website](https://monitoring.solaredge.com) and login  
    2. Click, on the top navbar, the Administration section  
  3. Create an entry in `config/config.js` with your API Key, SiteID, and other config options  

 **Example:**
```
 {
    module: 'MMM-SolarEdge',
	position: 'bottom_left',
	config: {
		apiKey: "################################", // Requires your own API Key
		siteId: "#####", // SolarEdge site ID
	}
 },
```
**Note:** Only enter your API Key in the `config.js` file. Your API Key is yours alone, _do not_ post or use it elsewhere.  
