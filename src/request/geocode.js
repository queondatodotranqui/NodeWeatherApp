const request = require('postman-request');

// lat and long
const basePath = 'https://api.mapbox.com/';
const token = 'pk.eyJ1IjoidG9kb3RyYW5xdWlsb3l2b3MiLCJhIjoiY2tsdHBxbXZ5MDVseTJvbDJsODRmbncydSJ9.EbkTMd3drYxkBoQr9fkSRQ'

const geoLocation = (address, callback) =>{

    const url = `${basePath}geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1`;

    request({url, json: true}, (error, response, { features })=>{
        if(error){
            callback('Unable to connect to service', null);
        } else if(features.length === 0){
            callback('Location not found', null);
        } else {
            callback(null , {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                place: features[0].place_name
            });
        }
    })
}

module.exports = geoLocation;