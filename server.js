
const express = require("express");
const app = express();

const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config();

let port = process.env.PORT;
if (port == null || port =="") {
    port = '3000';
}

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    let zipCode = req.body.zipCode;
    let apiKey = process.env.APIKEY;
    let units = "imperial";
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=${units}`;



    https.get(url, (response) => {
        if (response.statusCode === 200) {
            response.on("data", (data) => {
                weatherData = JSON.parse(data);
                let cityName = weatherData.name;
                let temp = weatherData.main.temp;
                let feel = weatherData.main.feels_like;
                let desc = weatherData.weather[0].description;
                let icon = weatherData.weather[0].icon;
                let imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    
                res.send(
                    `<h2>Weather in ${cityName}:</h2>
                    <h3>Temperature: ${temp} degrees Fahrenheit</h3>
                    <h3>Feels Like: ${feel}</h3>
                    <h3>Weather: ${desc}</h3><br>
                    <img src="${imgURL}">`
                );
            });
        } 
        else {
            res.sendFile(__dirname + "/404.html");
        }
    });
});

