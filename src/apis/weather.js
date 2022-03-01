const request = require('request')

const getWeather = (location, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=&query=${location}`

    request({ url, json: true }, (err, data) => {
        callback(undefined, data)
    })

}
module.exports = { getWeather }