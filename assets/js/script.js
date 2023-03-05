var APIKey = "1a86d10356127f6c83e94caad377236d";
var searchBtn = $('#search-btn');
var searchHistoryContainer = $('.search-history');
var cityNameEl = $('.city-name');
var currentDate = $('.current-date');
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



$(document).ready(function() {

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
                //console.log(data);
                for (var i = 0; i < data.length; i++) {
                    var lat = data[i].lat;
                    var lon = data[i].lon;
                  };
                  getCurrentWeatherAPI(lat, lon);
            });
    };

    //function for current weather api - need to retrieve city name, date, icon of weather conditions, temp, humidity, and wind speed
    var getCurrentWeatherAPI = function (lat, lon) {

        var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&units=imperial';
        
        fetch(currentWeatherUrl)
            .then(function (response) {
                return response.json();
        })
        .then(function (data) {
            console.log(data);
                console.log('name: ' + data.name);
                var iconCode = data.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                console.log('temp: ' + data.main.temp + 'F');
                console.log('humidity: ' + data.main.humidity + '%');
                console.log('wind speed: ' + data.wind.speed + 'MPH');
                cityNameEl.text(data.name);
                temp.text('Temp: ' + data.main.temp);
                wind.text('Wind: ' + data.wind.speed);
                humidity.text('Humidity: ' + data.main.humidity);
                weatherIcon.attr('src', iconUrl);
            });
    };

    var displayCurrentWeather = function () {

    }

//click event function
searchBtn.click(function (event) {
    event.preventDefault();

    var text = userInput.val();

    //pushes each input into the empty array that will be used to set storage
      cityNamesArray.push(text);

    //if there is no input, return
    if (text) {
        coordinatesAPI(text);
        
    } else if (text= "") {
        return;
    }
        //sets local storage with array
        localStorage.setItem("cities", JSON.stringify(cityNamesArray));
        
        //empties the user input area after submitting input with click
        userInput.val("");

        retrieveStorage();
        renderCities();
        getCurrentWeatherAPI();
})
});


// const container = document.getElementById('container');
// const title = document.createElement('h1');
// title.textContent = data.title;
// container.appendChild(title);

// const list = document.createElement('ul');
// for (const item of data.items) {
//   const listItem = document.createElement('li');
//   listItem.textContent = item.name;
//   list.appendChild(listItem);
// }
// container.appendChild(list);