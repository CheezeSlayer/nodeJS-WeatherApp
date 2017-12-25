const yargs = require('yargs');
const fs = require('fs');

const notes = require('./default/default');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');


const argv = yargs //takes user input.  yargs allows for parsing arguments.
  .options({
    a: {
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    },

    u: {
      alias: 'units',
      requiresArg: true,
      describe: 'ca = Celsius, us = Fahrenheit.  Default: us',
      choices: ['us', 'ca'],
    },

    d: {
      alias: 'defaultAddress',
      requiresArg: true,
      describe: 'Set a default address',
      string: true
    }
  })

  .help()
  .alias('help', 'h')
  .argv;



var options = {
//options object initially empty but can store any user options
}

if ( argv.units ) {
  options.units = argv.u
}

if ( argv.defaultAddress ) {
  options.defaultAddress = argv.d;
  argv.address = argv.d;
  notes.saveDefault(argv.d);
}

if ( argv.address == '' ){
  argv.address = notes.getDefault();
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
        console.log(`Temperature: ${weatherResults.temperature}`);
        console.log(`Apparent Temperature: ${weatherResults.apparentTemperature}`);
      }
    });
  }
});
