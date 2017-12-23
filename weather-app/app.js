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
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

//function responsible for all logic involved in handling user input address
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    //function responsible for handling geolocation output coordinates into DarkSky weather api
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`Temperature: ${weatherResults.temperature}.`);
        console.log(`Apparent Temperature: ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});
