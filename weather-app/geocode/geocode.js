const request = require('request'); //npm module that converts http requests to javascript objects

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address) //takes plain text address (user input) and return encoded result for injection to google geocode api request url

  request ({//makes api request to google geolocation api
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true //tells request that the data coming back is JSON data.  Takes JSON string and convert it to object
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {//google geocode api status variable that displays whether or not the request was successful
      callback('Unable to find that address.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
