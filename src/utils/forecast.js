const request = require('request');

const forecast = (latitude, longitude, callback)=> {
    const url = 'https://api.darksky.net/forecast/6e451eba7328a0910c7c2fde6ea9b5c7/' + latitude + ',' + longitude;
    
    request({url, json: true}, (err, {body})=>{
        if(err) {
            callback('Unable to connect to weather service! ', undefined)
        } else if (body.err) {
            callback('Unable to find location', undefined)
        } else {
            
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. The high today is ${body.daily.data[0].temperatureHigh}  With a low of ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability} chance of rain.`);
        }
    })

}



module.exports = forecast;

