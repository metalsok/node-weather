const request = require('request');

const geocode = (city,geoApiKey, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${geoApiKey}`
    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect!', undefined)
        }
        else if(res.body.features.length===0){
            callback('Location not found',undefined)
        }
        else {
            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }
    })
}
module.exports = { geocode }
