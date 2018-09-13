var express = require('express');
var app = express();
var request = require('request');

app.set('view engine', 'ejs');

var city = "Dublin";
var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=5363435ae49939dfc973f6b59522299a`;

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
    res.render('weather', weatherData);
  });

});

app.listen(8000);
