const request = require('postman-request');

// weather for mar del plata
const urlBase = 'http://api.weatherstack.com/'
const key = '2ae609bd533b2cf856ef179ac4ccd2cd';


const forecast = ({ latitude , longitude}, callback) =>{

    const url = `${urlBase}current?access_key=${key}&query=${latitude},${longitude}`;

    request({url, json:true}, (mistake, response, {location , current, error})=>{
        if(mistake){
            callback('Unable to connect to service', null);
        } else if(error){
            callback('Location not found', null);
        } else {
            let { name , country } = location;
            callback(null, {
                name,
                country,
                temp: current
            });
        }
    })
}

module.exports = forecast;