const request = require('request');

const API_KEY = '24431d0e56632af62a7e1891d23a0fd9'
const API_URL = `https://api.darksky.net/forecast/${API_KEY}`

var getWeather = (lat, lng, uOption, callback) => {//adjust DarkSky api url to contain desired coordinates

  var url = API_URL + `/${lat},${lng}`

  if ( uOption != undefined ){//if units are user choice then adjust url accordingly
    url = url + `?units=${uOption}`
  }

  request({
    url: url,
    json: true
  }, (error, response, body) => {
      if(!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        callback(`Unable to fetch weather. statusCode: ${statusCode}`);
      }
  });
}

module.exports.getWeather = getWeather;
