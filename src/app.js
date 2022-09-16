const geolocation = require('./apis/geolocation');
const weather = require('./apis/weather');
const path = require('path');
const express = require('express');
const yargs = require('yargs');
const fs = require('fs');
const {geocode} = require('./apis/geolocation');

yargs.command({
  command: 'start',
  describe: 'Set all api keys',
  builder: {
    weatherApiKey: {
      describe: 'Set the weather api key',
      demandOption: true,
      type: 'string',
    },
    geoApiKey: {
      describe: 'Set the geolocation api key',
      demandOption: true,
      type: 'string',

    },
    location: {
      describe: 'Set the geolocation api key',
      demandOption: true,
      type: 'string',

    },
  },
  handler: (argv) => {
    const keys = {
      weatherApiKey: argv.weatherApiKey,
      geoApiKey: argv.geoApiKey,
    };
    fs.writeFileSync('api-keys.json', JSON.stringify(keys));
  },
});
const app = express();
const {weatherApiKey, geoApiKey} = JSON.parse(
    fs.readFileSync('api-keys.json'),
    'utf8');

app.get('/geo', (req, res) => {
  const city = req.query.city;
  geolocation.geocode(city, geoApiKey, (err, geodata) => {
    if (geodata) {
      weather.forecast(geodata, weatherApiKey,
          (err, weatherMessage) => {
            weatherMessage ? res.send(weatherMessage) : res.send(err);
          });
    } else {
      res.send(err);
    }
  });
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
});
yargs.parse();
