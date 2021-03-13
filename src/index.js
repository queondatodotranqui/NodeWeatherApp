const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./request/forecast.js');
const geolocation = require('./request/geocode.js');


// configs
const app = express();
const public = path.join(__dirname , '../public')
const partialPath = path.join(__dirname, '../views/partials');
app.set('view engine', 'hbs');
app.use(express.static(public));
hbs.registerPartials(partialPath);

// data 
const name = 'Nicolas Vera';

// work
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        description: 'This page is for FAQ',
        name,
        date: new Date()
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        description: 'This is the help section',
        name
    });
})

app.get('/weather', (req, res)=>{
    if(req.query.address){
        geolocation(req.query.address, (error, response)=>{
            if(error){
                return res.send({
                    error
                })
            } else {
                forecast(response, (mistake, info)=>{
                    if(mistake){
                        return res.send({
                            mistake
                        })
                    } else {
                        return res.send({
                            weather: info
                        })
                    }
                })
            }
        })
    }
})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: 'Help',
        message: 'Help article not found',
        name
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        title: 'Error',
        message: 'Page not found'
    });
})

app.listen(3000, ()=>{
    console.log('Server up in port 3000');
})