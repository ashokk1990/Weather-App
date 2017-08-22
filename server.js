const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
const apiKey = 'af7ae0c6f85b7afec9e2c738d5e4fe2a'
//Using bodyparser middleware
app.use(bodyParser.urlencoded({extended:true}))
// exposing public folder to express
app.use(express.static('public'))
// setting templating engine to handlebars
app.set('view engine','hbs')
// Get request to render view.
app.get('/',function(req,res){
    res.render('index')
})
// Post operation to make api request for weather data.
app.post('/',function(req,res){
    let cityName = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        if(err){
        res.render('index', {weather: null, error: 'Error, please try again'})
        } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
            res.render('index', {weather: null, error: 'Error, please try again'})
        } else {
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`
            res.render('index', {weather: weatherText, error: null})
        }
        }
    });
})
// server listening to port 3210
app.listen(3210, function(){
    console.log('Server started on port: 3210')
})