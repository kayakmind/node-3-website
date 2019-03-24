const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //concatanate url with location data provided by another module
    const url = 'https://api.darksky.net/forecast/083a3b47b3aca142f2717c151672e032/' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, { body }) => {
        //check to see if we made the connection
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        //made connection, checking to see if the location we provided was bad   
        } else if (body.error) { 
            callback('Unable to find location', undefined)
        //parse response data for specific values    
        } else {
            callback(undefined, body.daily.data[0].summary + 'The temperature is ' + body.currently.temperature + '. The chance of rain is ' + body.currently.precipProbability + '%')
    
    }

    })
}
//export module so it can be used in other modules
module.exports = forecast