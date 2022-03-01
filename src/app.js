const geolocation = require('./apis/geolocation');
const weather = require('./apis/weather');
const path = require('path')
const express = require('express');
const yargs = require('yargs');
const fs = require('fs');


yargs.command({
  command: 'start',
  describe: 'Set all api keys',
  builder: {
    weatherApiKey: {
      describe: 'Set the weather api key',
      demandOption: true,
      type: 'string'
    },
    geoApiKey: {
      describe: 'Set the geolocation api key',
      demandOption: true,
      type: 'string'

    }
  },
  handler: (argv) => {
    const keys = { weatherApiKey: argv.weatherApiKey, geoApiKey: argv.geoApiKey }
    fs.writeFileSync("api-keys.json", JSON.stringify(keys))
  }
})


const app = express();

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather app'
  });
});

app.get('/geo', (req, res) => {
  geolocation.geocode(location, (err, data) => {
    res.send(data);
  })
})

app.get('/weather', (req, res) => {
  weather.getWeather(location, (err, data) => {
    res.send(data);
  })
})

app.listen(3000, () => {
  console.log('Listening to port 3000')
})

yargs.parse()
