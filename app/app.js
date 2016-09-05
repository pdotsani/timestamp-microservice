'use strict';

const express = require('express');
const path = require('path');
const service = require('./service');

const port = process.env.PORT || 3000;
const app = express();

/*
 * ROUTES 
 */
app.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/:time', function(req, res) {
	var time = req.params.time,
			firstChar = time.charCodeAt(0),
			unixValue = null,
			naturalValue = null;

	if(time != 'favicon.ico') {
		if (firstChar > 47 && firstChar < 58) {
			/*
			 * If the first character in the param is a number,
			 * assume a Unix timestamp was given. Proceed to check
			 * if timestamp is valid.
			 */

			if (service.validateUnixTimeStamp(time)) {
				unixValue = parseInt(time);
				naturalValue = service.UnixToNatural(unixValue);
			}

		} else {
			/*
			 * If the first character in the param is not a digit,
			 * assume it's a natural date timestamp. Proceed to check
			 * if timestamp is valid.
			 */

			// Create natural value if tests passed
			// http://stackoverflow.com/questions/11893083/convert-normal-date-to-unix-timestamp
			if (service.validateStringTimestamp(time)) {
				naturalValue = time;
				unixValue = service.naturalToUnix(naturalValue);
			}
		}
	}

	res.json({
		unix: unixValue,
		natural: naturalValue
	});
});

app.listen(port, function() {
	console.log('Timestamp-ms listening on port ' + port);
});