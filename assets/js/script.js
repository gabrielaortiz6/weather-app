var APIKey = "1a86d10356127f6c83e94caad377236d";
var searchBtn = $('#search-btn');
var searchHistoryContainer = $('.search-history');
var userInput = $('.city-name-input');
//variable that is empty array to store inputs into local storagge
var cityNamesArray = [];

//WHEN BUTTON IS CLICKED TO SEARCH CITY THAT WAS INPUT
//IT IS SAVED TO LOCAL STORAGE AND APPEARS ON THE LIST BELOW AS A BUTTON THAT CAN BE RECLICKED
//AND IT WILL FETCH API INFORMATION REGARDING THE WEATHER (CITY NAME, DATE, ICON, TEMPERATURE, HUMIDITY, AND WIND SPEED) OF THAT CITY USING A COMBINATION OF 5 DAY WEATHER FORECAST API AND THE OPENWEATHERMAP API
//IF I CLICK ON THE SEARCH HISTORY LIST, THOSE FUNCTIONALITIES REAPPEAR

$(document).ready(function() {
    function renderCities() {
        //retrieving the array from loal storage
       var storedCities = JSON.parse(localStorage.getItem("cities"));

       //if there is something to retrieve in local storage, make it the value of a variable
       if (storedCities !== null) {
        cityNamesArray = storedCities;
       };
       
       //for loop in order to index all the values stored in the array
       for (var i = 0; i < cityNamesArray.length; i++) {
        var cityName = cityNamesArray[i];
        var btn = document.createElement("button");
        var newBtn = $(btn).addClass('btn btn-secondary').text(cityName);
        searchHistoryContainer.append(newBtn);
       };
    };

//click event function
searchBtn.click(function (event) {
    event.preventDefault();

        var text = userInput.val();

        cityNamesArray.push(text);
    
        if (cityNamesText = "") {
            return;
        }

        localStorage.setItem("cities", JSON.stringify(cityNamesArray));
        userInput.val("");
        renderCities();
})
});