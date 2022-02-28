const geolocation = require('../geolocation');
const weather = require('../weather');
const path = require('path')
const express = require('express');
const exphbs = require('express-handlebars');


const location = process.argv.slice(2)[0];

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('index',{
    title:'Weather app'
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
