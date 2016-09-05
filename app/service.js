'use strict';

exports.naturalToUnix= function(str) {
	return new Date(str).getTime() / 1000;
}

exports.UnixToNatural= function(unix) {
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
			month = 'April';
			break;
		case 4:
			month = 'May';
			break;
		case 5:
			month = 'June';
			break;
		case 6:
			month = 'July';
			break;
		case 7:
			month = 'August';
			break;
		case 8:
			month = 'September';
			break;
		case 9:
			month = 'October';
			break;
		case 10:
			month = 'November';
			break;
		case 11:
			month = 'December';
			break;
		default:
			break;
	}

	day = d.getDate();
	year = d.getFullYear();

	return `${month} ${day}, ${year}`;
}

exports.validateStringTimestamp = function(t) {
	let natArr = t.split(' ');
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

exports.validateUnixTimeStamp = function(t) {
	return t.length === 10;
}