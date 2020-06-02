# weather-api-project
Utilize openweather.api to get weather data based on zipcode input.


Extremely barebones frontend with just a label, input and button wrapped in a form. 
Backend built with Node.js and Express. 

User inputs a zipcode and the form sends a post request to the server which then build out the api url using the zipcode as a parameter.

Server sends get request to the url, parses the returned json string and extracts weather data. Finally responds to the initial post request with the weather data.

Callback function in the api GET includes a simple conditional to catch invalid zip code entries. I tried using a try/catch but I think 
the invalid api parameter wasn't throwing an error and browser just hangs waiting for a reply from the server.
