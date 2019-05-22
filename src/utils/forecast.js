const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/65660f4e9aad6b7f48374a3669f22891/' + latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const currently = body.currently
            const daily = body.daily
            callback(undefined,daily.data[0].summary + ' It is currently ' + currently.temperature + ' degrees out. There is ' + currently.precipProbability + '% chance of rain.')
        }
    })

}


module.exports = forecast