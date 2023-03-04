var APIKey = "1a86d10356127f6c83e94caad377236d";
var searchBtn = $('#search-btn');
var searchHistoryContainer = $('.search-history');
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
                    console.log(lat);
                    console.log(lon);
                  };
            });
    };

    //function for current weather api - need to retrieve city name, date, icon of weather conditions, temp, humidity, and wind speed
    var getCurrentWeatherAPI = function () {
        
        var lat = coordinatesAPI(data[i].lat);
        var lon = coordinatesAPI(data[i].lon);
        console.log(lat);
        console.log(lon);

        var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;
        
        fetch(currentWeatherUrl)
            .then(function (response) {
                return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
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