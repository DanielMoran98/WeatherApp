var config = require('./config.json');
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.set('view engine', 'ejs');

var city = "Dublin";
var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${config.token}&cnt=7`;

app.use(express.static("public"));

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
    console.log(weatherData);
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
  } //console.log(weatherArray);

    var weather = { //Gets accurate current weather
      city: city,
      temperature: Math.round(weatherJson.list[0].main.temp - 273.15),
      description: weatherJson.list[0].weather[0].main,
      icon: weatherJson.list[0].weather[0].icon
    };

    var weatherData = {weather: weather, weatherArray: weatherArray}; //Prepares data for ejs file.
    console.log(weatherData);
    res.render('weather', weatherData);

  });




});

app.listen(8000);
