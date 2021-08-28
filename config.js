const result = require('dotenv').config();

if (result.error) {
	console.log('Unable to set Environment Variables.');
	console.log(result.error);
} else {
	console.log('Environment Variables set.');
}