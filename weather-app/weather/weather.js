const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/24431d0e56632af62a7e1891d23a0fd9/${lat},${lng}?units=si`,
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
