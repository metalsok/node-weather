const request = require("request");

const forecast = (geodata, weatherApiKey, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${
    (geodata.latitude, geodata.longitude)
  }`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const message = `${response.body.current.weather_descriptions[0]} in ${geodata.location}. It is currently  ${response.body.current.temperature} degress outside.`;
      callback(undefined, message);
    }
  });
};

module.exports = { forecast };
