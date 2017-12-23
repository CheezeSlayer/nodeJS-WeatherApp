const request = require('request');

const API_KEY = '24431d0e56632af62a7e1891d23a0fd9'

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}?units=si`,
    json: true
  }, (error, response, body) => {
      if(!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        callback('Unable to fetch weather.');
      }
  });
}

module.exports.getWeather = getWeather;
