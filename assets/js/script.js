var APIKey = "1a86d10356127f6c83e94caad377236d";
var searchBtn = $('#search-btn');
var searchHistoryContainer = $('.search-history');
var cityNameEl = $('.city-name');
var currentDateEl = $('#current-date');
var weatherIcon = $('.weather-icon');
var temp = $('.temperature');
var wind = $('.wind');
var humidity = $('.humidity');
var userInput = $('.city-name-input');
//variable that is empty array to store inputs into local storagge
var cityNamesArray = [];

//WHEN BUTTON IS CLICKED TO SEARCH CITY THAT WAS INPUT
//IT IS SAVED TO LOCAL STORAGE AND APPEARS ON THE LIST BELOW AS A BUTTON THAT CAN BE RECLICKED
//AND IT WILL FETCH API INFORMATION REGARDING THE WEATHER (CITY NAME, DATE, ICON, TEMPERATURE, HUMIDITY, AND WIND SPEED) OF THAT CITY USING A COMBINATION OF 5 DAY WEATHER FORECAST API AND THE OPENWEATHERMAP API
//I WILL NEED TO CONVERT CITY NAME INTO CITY COORDINATES IN ORDER TO USE THE 5-DAY WEATHER FORECAST
//IF I CLICK ON THE SEARCH HISTORY LIST, THOSE FEATURES REAPPEAR



$(document).ready(function () {

    function retrieveStorage() {

        //retrieving the array from local storage
        var storedCities = JSON.parse(localStorage.getItem("cities"));

        //if there is something to retrieve in local storage, make it the value of a variable
        if (storedCities !== null) {
            cityNamesArray = storedCities;
        };
    };
    //function to display inputs stored in local storage as buttons
    function renderCities() {

        document.querySelector('.search-history').innerHTML = "";

        //for loop in order to index all the values stored in the array
        for (var i = 0; i < cityNamesArray.length; i++) {
            var cityName = cityNamesArray[i];
            var btn = document.createElement("button");
            var newBtn = $(btn).addClass('btn btn-secondary').text(cityName);
            searchHistoryContainer.append(newBtn);
        };
    };

    //FUNCTION CONVERTING CITY NAME TO COORDINATES
    var coordinatesAPI = function (city) {

        var geoCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + APIKey;

        fetch(geoCodeUrl)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var lat = data[i].lat;
                    var lon = data[i].lon;
                };
                getCurrentWeatherAPI(lat, lon);
                getFiveDayWeather(lat,lon);
            });
    };

    //function for current weather api - retrieves city name, date, icon, temp, humidity, and wind speed
    var getCurrentWeatherAPI = function (lat, lon) {

        var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&units=imperial';

        fetch(currentWeatherUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var iconCode = data.weather[0].icon;
                cityNameEl.text(data.name);
                temp.text('Temp: ' + data.main.temp + '°F');
                wind.text('Wind: ' + data.wind.speed + 'MPH');
                humidity.text('Humidity: ' + data.main.humidity + '%');

                //target icon image url from open weather api
                var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                weatherIcon.attr('src', iconUrl);

                //calls getCurrentDate dayjs() function and filters the unix timestamp from open weather as parameter
               getCurrentDate(data.dt);
            });
    };

    //get current date using day js with the unix timestamp provided by open weather api
    var getCurrentDate = function (unix) {
        var date = dayjs.unix(unix).format('MM/DD/YYYY');
        
        currentDateEl.text(date);
    };

    //five day weather fetch - retrieves date, icon, temp, humidity, and wind speed
var getFiveDayWeather = function (lat, lon) {

    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&cnt=5&units=imperial';

    fetch(forecastUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //delete console.logs when finished
    console.log(data);
    console.log('Day 1:')
    console.log('Unix/UTC: ' + data.list[0].dt);
    console.log('Temp: ' + data.list[0].main.temp + '°F');
    console.log(data.list[0].weather.icon);
    console.log('Wind speed: ' + data.list[0].wind.speed + 'MPH');
    console.log('Humidity: ' + data.list[0].main.humidity + '%');
    console.log('----------------');
    console.log('Day 2:')
    console.log('Unix/UTC: ' + data.list[1].dt);
    console.log('Temp: ' + data.list[1].main.temp + '°F');
    console.log(data.list[1].weather.icon);
    console.log('Wind speed: ' + data.list[1].wind.speed + 'MPH');
    console.log('Humidity: ' + data.list[1].main.humidity + '%');
    console.log('----------------');
    console.log('Day 3:')
    console.log('Unix/UTC: ' + data.list[2].dt);
    console.log('Temp: ' + data.list[2].main.temp + '°F');
    console.log(data.list[2].weather.icon);
    console.log('Wind speed: ' + data.list[2].wind.speed + 'MPH');
    console.log('Humidity: ' + data.list[2].main.humidity + '%');
    console.log('----------------');
    console.log('Day 4:')
    console.log('Unix/UTC: ' + data.list[3].dt);
    console.log('Temp: ' + data.list[3].main.temp + '°F');
    console.log(data.list[3].weather.icon);
    console.log('Wind speed: ' + data.list[3].wind.speed + 'MPH');
    console.log('Humidity: ' + data.list[3].main.humidity + '%');
    console.log('----------------');
    console.log('Day 5:')
    console.log('Unix/UTC: ' + data.list[4].dt);
    console.log('Temp: ' + data.list[4].main.temp + '°F');
    console.log(data.list[4].weather.icon);
    console.log('Wind speed: ' + data.list[4].wind.speed + 'MPH');
    console.log('Humidity: ' + data.list[4].main.humidity + '%');
    console.log('----------------');

  });
};
    //toggle icon and city name and date

    //make the buttons list click fetch api

    //click event function
    searchBtn.click(function (event) {
        event.preventDefault();

        var text = userInput.val();

        //pushes each input into the empty array that will be used to set storage
        cityNamesArray.push(text);

        //if there is no input, return
        if (text) {
            coordinatesAPI(text);

        } else if (text = "") {
            return;
        }
        //sets local storage with array
        localStorage.setItem("cities", JSON.stringify(cityNamesArray));

        //empties the user input area after submitting input with click
        userInput.val("");

        retrieveStorage();
        renderCities();
    })
});