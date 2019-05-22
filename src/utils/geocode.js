const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm9nZXJzaGF3IiwiYSI6ImNqdmlhb2R4OTAzeTM0OXFnbjF6eXQ5bWsifQ.MozGkYDCLIy7FF3IGh6kmQ&limit=1'
    request({ url, json: true }, (error, {body}) => {
        const features = body.features
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.message) {
            callback('Unable to find location!', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined,{
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name

            })
        }
    })
}    

module.exports = geocode