const geolocation = require('./apis/geolocation');
const weather = require('./apis/weather');
const express = require('express');
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const hbs = require('hbs');

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
const port = process.env.PORT || 3000

// Setting up paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setting up handlebars engine and path to views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectoryPath));

const {weatherApiKey, geoApiKey} = JSON.parse(
    fs.readFileSync('api-keys.json'),
    'utf8');

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather Application',
    name: 'Sokratis Met.',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Sokratis Met.',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Sokratis Met.',
  });
});
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help Page',
    name: 'Sokratis Met.',
    errorMessage: 'Help page not found.',
  });
});

app.get('/weather', (req, res) => {
  const {city = 'Vienna'} = req.query;

  geolocation.geocode(city, geoApiKey, (err, geodata) => {
    if (err) {
      res.send(err);
    }
    weather.forecast(geodata, weatherApiKey,
        (err, message) => {
          if (err) {
            res.send(err);
          }
          res.send({
            forecast: message, location: geodata.location, address: city,
          });
        });
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error page',
    errorMessage: 'Page not found',
    name: 'Sokratis Met.',
  });
});

app.listen(port, () => {
  console.log('Listening to port ' + port);
});
yargs.parse();
