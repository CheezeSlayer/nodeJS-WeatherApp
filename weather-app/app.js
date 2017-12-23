const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs //takes user input.  yargs allows for parsing arguments.
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    },

    u: {
      alias: 'units',
      describe: 'Unit Options: ca = Celsius, us = Fahrenheit.  Default: us',
      choices: ['us', 'ca']
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var options = {

}

if ( argv.units ) {
  options.units = argv.u
}

//function responsible for all logic involved in handling user input address
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    //function responsible for handling geolocation output coordinates into DarkSky weather api
    weather.getWeather(results.latitude, results.longitude, argv.u, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`Temperature: ${weatherResults.temperature}.`);
        console.log(`Apparent Temperature: ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});
