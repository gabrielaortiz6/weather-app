var APIKey = "1a86d10356127f6c83e94caad377236d";
var btn = $('.btn');
var searchHistoryContainer = $('.search-history');
var cityNameEl = $('.city-name');
var userInput = $('.city-name-input');
var currentDateEl = $('.current-date');
var weatherIcon = $('#weather-icon');
var temp = $('#temperature');
var wind = $('#wind');
var humidity = $('#humidity');
//variable that is empty array to store inputs into local storagge
var cityNamesArray = [];
//forecast variables
var dayOneTemp = $('#day-one').find('.temp');
var dayOneWind = $('#day-one').find('.wind');
var dayOneHumidity = $('#day-one').find('.humidity');
var dayOneIcon = $('#day-one').find('.weather-icon');
var dayOneDateEl = $('#day-one').find('.current-date');
var dayTwoTemp = $('#day-two').find('.temp');
var dayTwoWind = $('#day-two').find('.wind');
var dayTwoHumidity = $('#day-two').find('.humidity');
var dayTwoIcon = $('#day-two').find('.weather-icon');
var dayTwoDateEl = $('#day-two').find('.current-date');
var dayThreeTemp = $('#day-three').find('.temp');
var dayThreeWind = $('#day-three').find('.wind');
var dayThreeHumidity = $('#day-three').find('.humidity');
var dayThreeIcon = $('#day-three').find('.weather-icon');
var dayThreeDateEl = $('#day-three').find('.current-date');
var dayFourTemp = $('#day-four').find('.temp');
var dayFourWind = $('#day-four').find('.wind');
var dayFourHumidity = $('#day-four').find('.humidity');
var dayFourIcon = $('#day-four').find('.weather-icon');
var dayFourDateEl = $('#day-four').find('.current-date');
var dayFiveTemp = $('#day-five').find('.temp');
var dayFiveWind = $('#day-five').find('.wind');
var dayFiveHumidity = $('#day-five').find('.humidity');
var dayFiveIcon = $('#day-five').find('.weather-icon');
var dayFiveDateEl = $('#day-five').find('.current-date');

//WHEN BUTTON IS CLICKED TO SEARCH CITY THAT WAS INPUT
//IT IS SAVED TO LOCAL STORAGE AND APPEARS ON THE LIST BELOW AS A BUTTON THAT CAN BE RECLICKED
//AND IT WILL FETCH API INFORMATION REGARDING THE WEATHER (CITY NAME, DATE, ICON, TEMPERATURE, HUMIDITY, AND WIND SPEED) OF THAT CITY USING A COMBINATION OF 5 DAY WEATHER FORECAST API AND THE OPENWEATHERMAP API
//I WILL NEED TO CONVERT CITY NAME INTO CITY COORDINATES IN ORDER TO USE THE 5-DAY WEATHER FORECAST
//IF I CLICK ON THE SEARCH HISTORY LIST, THOSE FEATURES REAPPEAR


$(document).ready(function () {

    //function for retrieving user input from storage
    function retrieveStorage() {

        //retrieving the array from local storage
        var storedCities = JSON.parse(localStorage.getItem("cities"));

        //if there is something to retrieve in local storage, make it the value of a variable
        if (storedCities !== null) {
            cityNamesArray = storedCities;
        };
    };

    //function that creates buttons out of the stored user inputs
    function renderCitiesHistory() {

        document.querySelector('.search-history').innerHTML = "";

        //for loop in order to index all the values stored in the array
        for (var i = 0; i < cityNamesArray.length; i++) {
            var cityName = cityNamesArray[i];
            var btn = document.createElement("button");
            var newBtn = $(btn).addClass('btn btn-secondary search-btn mb-4').text(cityName);
            searchHistoryContainer.append(newBtn);
        };
    };

    //Function converting user input (city name) into coordinates so it is usable for the other API fetchs
    var coordinatesAPI = function (city) {

        var geoCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + APIKey;

        fetch(geoCodeUrl)
            .then(function (response) {
                if (response.status != 200) {
                    window.alert("Error!")
                }
                else if (response.ok) {
                    return response.json();
                }
            })
            .then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var lat = data[i].lat;
                    var lon = data[i].lon;
                }
                getCurrentWeatherAPI(lat, lon);
                getFiveDayWeather(lat, lon);
            });
    }
    //function for current weather api - retrieves city name, date, icon, temp, humidity, and wind speed
    var getCurrentWeatherAPI = function (lat, lon) {

        var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&units=imperial';

        fetch(currentWeatherUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            })
            .then(function (data) {
                var iconCode = data.weather[0].icon;
                cityNameEl.text(data.name);
                temp.text('Temp: ' + data.main.temp + '°F');
                wind.text('Wind: ' + data.wind.speed + ' MPH');
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
            if (response.status != 200) {
                window.alert("Error! Please enter a valid city")
            }
            else if (response.ok) {
                return response.json();
            }
        })
            .then(function (data) {
                //delete console.logs when finished
                console.log(data);
                var dateDayOne = data.list[0].dt_txt;
                var dateDayTwo = data.list[1].dt_txt;
                var dateDayThree = data.list[2].dt_txt;
                var dateDayFour = data.list[3].dt_txt;
                console.log(dateDayThree);
                var dateDayFive = data.list[4].dt_txt;
                var dayOneIconCode = data.list[0].weather[0].icon;
                var dayTwoIconCode = data.list[1].weather[0].icon;
                var dayThreeIconCode = data.list[2].weather[0].icon;
                var dayFourIconCode = data.list[3].weather[0].icon;
                var dayFiveIconCode = data.list[4].weather[0].icon;

                //reformat date
                var reformatDate1 = dayjs(dateDayOne).format('MM/DD/YYYY');
                dayOneDateEl.text(reformatDate1);
                dayOneTemp.text('Temp: ' + data.list[1].main.temp + '°F');
                dayOneWind.text('Wind: ' + data.list[0].wind.speed + 'MPH');
                dayOneHumidity.text('Humidity: ' + data.list[0].main.humidity + '%');
                //target icon image url from open weather api
                var dayOneIconUrl = "http://openweathermap.org/img/wn/" + dayOneIconCode + "@2x.png";
                //sets attribute of icon element
                dayOneIcon.attr('src', dayOneIconUrl);

                //repeated for Day 2 of Forecast
                var reformatDate2 = dayjs(dateDayTwo).format('MM/DD/YYYY');
                dayTwoDateEl.text(reformatDate2);
                dayTwoTemp.text('Temp: ' + data.list[1].main.temp + '°F');
                dayTwoWind.text('Wind: ' + data.list[1].wind.speed + 'MPH');
                dayTwoHumidity.text('Humidity: ' + data.list[1].main.humidity + '%');
                //target icon image url from open weather api
                var dayTwoIconUrl = "http://openweathermap.org/img/wn/" + dayTwoIconCode + "@2x.png";
                //sets attribute of icon element
                dayTwoIcon.attr('src', dayTwoIconUrl);

                //repeated for Day 3
                var reformatDate3 = dayjs(dateDayThree).format('MM/DD/YYYY');
                dayThreeDateEl.text(reformatDate3);
                dayThreeTemp.text('Temp: ' + data.list[2].main.temp + '°F');
                dayThreeWind.text('Wind: ' + data.list[2].wind.speed + 'MPH');
                dayThreeHumidity.text('Humidity: ' + data.list[2].main.humidity + '%');
                //target icon image url from open weather api
                var dayThreeIconUrl = "http://openweathermap.org/img/wn/" + dayThreeIconCode + "@2x.png";
                //sets attribute of icon element
                dayThreeIcon.attr('src', dayThreeIconUrl);

                //repeat for Day Four
                var reformatDate4 = dayjs(dateDayFour).format('MM/DD/YYYY');
                dayFourDateEl.text(reformatDate4);
                dayFourTemp.text('Temp: ' + data.list[3].main.temp + '°F');
                dayFourWind.text('Wind: ' + data.list[3].wind.speed + 'MPH');
                dayFourHumidity.text('Humidity: ' + data.list[3].main.humidity + '%');
                //target icon image url from open weather api
                var dayFourIconUrl = "http://openweathermap.org/img/wn/" + dayFourIconCode + "@2x.png";
                //sets attribute of icon element
                dayFourIcon.attr('src', dayFourIconUrl);

                //repeat for Day Five
                var reformatDate5 = dayjs(dateDayFive).format('MM/DD/YYYY');
                dayFiveDateEl.text(reformatDate5);
                dayFiveTemp.text('Temp: ' + data.list[4].main.temp + '°F');
                dayFiveWind.text('Wind: ' + data.list[4].wind.speed + 'MPH');
                dayFiveHumidity.text('Humidity: ' + data.list[4].main.humidity + '%');
                //target icon image url from open weather api
                var dayFiveIconUrl = "http://openweathermap.org/img/wn/" + dayFiveIconCode + "@2x.png";
                //sets attribute of icon element
                dayFiveIcon.attr('src', dayFiveIconUrl);
            });
    };

    //make the buttons list click fetch api

    //toggle icon and city name and date and five day forecast
    function toggle() {
        document.querySelector('.toggle-content').style.display = 'block';
    }

    //function to display user's input, set storage, and retrieve storage
    // $('.btn').on('click', function (event) {
    function display(event) {
        event.preventDefault();

        var text = userInput.val();

        //pushes each input into the empty array that will be used to set storage
        cityNamesArray.push(text);

        //if there is no input, return and use text (user's input) as parameter for the coordinatesAPI function, which changes the city name into coordinates that can be used for the other APIs
        if (text) {
            coordinatesAPI(text);

        } else if (text = "") {
            return;
        }
        //sets local storage with array
        localStorage.setItem("cities", JSON.stringify(cityNamesArray));

        //empties the user input area after submitting input with click
        userInput.val("");

        //calls the function that creates the buttons out of user input and retrieves storage
        renderCitiesHistory();
        retrieveStorage();
    };
      //click events
    $('.btn').on('click', toggle);
    $('.btn').on('click', display);
});