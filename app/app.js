'use strict';

const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();


function naturalToUnix(str) {
	return new Date(str).getTime() / 1000;
}

function UnixToNatural(unix) {
	let d = new Date(unix * 1000);
	let month, day, year;

	// Convert Month
	switch(d.getMonth()) {
		case 0:
			month = 'January';
			break;
		case 1:
			month = 'February';
			break;
		case 2:
			month = 'March';
			break;
		case 3:
			month = 'March';
			break;
		case 4:
			month = 'April';
			break;
		case 5:
			month = 'May';
			break;
		case 6:
			month = 'June';
			break;
		case 7:
			month = 'July';
			break;
		case 8:
			month = 'August';
			break;
		case 9:
			month = 'September';
			break;
		case 10:
			month = 'October';
			break;
		case 11:
			month = 'November';
			break;
		case 12:
			month = 'December';
			break;
		default:
			break;
	}

	day = d.getDate();
	year = d.getFullYear();

	return `${month} ${day}, ${year}`;
}

function validateStringTimestamp(time) {
	let natArr = time.split(' ');
	let isNat = false;

	// Check if month is valid
	switch(natArr[0]) {
		case 'January':
		case 'February':
		case 'March':
		case 'March':
		case 'April':
		case 'May':
		case 'June':
		case 'July':
		case 'August':
		case 'September':
		case 'October':
		case 'November':
		case 'December':
			isNat = true;
			break;
		default:
			break;
	}

	// Check if Day is valid
	if (natArr[1].length < 4 && natArr[1].length > 1) {
		let day = parseInt(natArr[1]);
		if (day < 0 || day > 32) isNat = false;
	} else {
		isNat = false;
	}

	// Check if year is valid
	if (natArr[2].length !== 4) isNat = false;

	return isNat;
}

function validateUnixTimeStamp(time) {
	return time.length === 10;
}

/*
 * ROUTES 
 */
app.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/:time', function(req, res) {
	let time = req.params.time,
			firstChar = time.charCodeAt(0),
			unixValue = null,
			naturalValue = null;

	if (firstChar > 47 && firstChar < 58) {
		/*
		 * If the first character in the param is a number,
		 * assume a Unix timestamp was given. Proceed to check
		 * if timestamp is valid.
		 */

		if (validateUnixTimeStamp(time)) {
			unixValue = parseInt(time);
			naturalValue = UnixToNatural(unixValue);
		}

	} else {
		/*
		 * If the first character in the param is not a digit,
		 * assume it's a natural date timestamp. Proceed to check
		 * if timestamp is valid.
		 */

		// Create natural value if tests passed
		// http://stackoverflow.com/questions/11893083/convert-normal-date-to-unix-timestamp
		if (validateStringTimestamp(time)) {
			naturalValue = time;
			unixValue = naturalToUnix(naturalValue);
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