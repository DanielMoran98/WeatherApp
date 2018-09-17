//Required modules
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path');

//Required files
var config = require('./config.json');
var dates = require('./util/dates.js');

//App setup
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('view engine', 'ejs');

var city = "Dublin";
var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${config.token}&cnt=7`;



// Routes
app.get('/', function(req, res)
{
  request(url, function(error, response, body) {
    weatherJson = JSON.parse(body);

    var weather = {
      city: city,
      temperature: Math.round(weatherJson.list[0].main.temp - 273.15),
      description: weatherJson.list[0].weather[0].main,
      icon: weatherJson.list[0].weather[0].icon
    };

    var weatherData = {weather: weather};
    //console.log(weatherData);
    res.render('index', weatherData);

  });
});



app.post('/city', urlencodedParser, function(req, res)
{
  console.log(req.body.searchedCity);
  city = req.body.searchedCity;
  var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${config.token}&cnt=7`;

  request(url, function(error, response, body) {
    weatherJson = JSON.parse(body);
    var weatherArray = [];

    for(var i = 0; i < 7; i++)
    {
    var loopObject = {
      city: city, //Sets the city taken from the search bar
      temperature: Math.round(weatherJson.list[i].main.temp - 273.15), //Sets the values taken from the API query
      description: weatherJson.list[i].weather[0].main,
      icon: weatherJson.list[i].weather[0].icon
      }
    weatherArray.push(loopObject);
  }

    var weather = { //Gets accurate current weather
      city: city,
      temperature: Math.round(weatherJson.list[0].main.temp - 273.15),
      description: weatherJson.list[0].weather[0].main,
      icon: weatherJson.list[0].weather[0].icon
    };

    var days = [
      dates.dayOfWeek(1),
      dates.dayOfWeek(2),
      dates.dayOfWeek(3),
      dates.dayOfWeek(4),
      dates.dayOfWeek(5),
      dates.dayOfWeek(6),
      dates.dayOfWeek(7)
    ]

    var weatherData = {weather: weather, weatherArray: weatherArray, days: days}; //Prepares data for ejs file.
    //console.log(weatherData);
    res.render('weather', weatherData);

  });




});

app.listen(8000, function(){
  console.log("Server running.");
});
