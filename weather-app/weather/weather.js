const request = require('request');

const API_KEY = '24431d0e56632af62a7e1891d23a0fd9'
const API_URL = `https://api.darksky.net/forecast/${API_KEY}`

//`https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}?units=us`

var getWeather = (lat, lng, uOption, callback) => {

  var url = API_URL + `/${lat},${lng}`

  if ( uOption != undefined ){
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
