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
//click event function
searchBtn.click(function (event) {
    event.preventDefault();

        var text = userInput.val();

        cityNamesArray.push(text);
        console.log(cityNamesArray);
    
        if (cityNamesText = "") {
            return;
        }

        localStorage.setItem("cities", JSON.stringify(cityNamesArray));
        userInput.val("");

    // if (cityNames) {
    //     //add a button to the search history container with user input
    //     var newBtn = searchHistoryContainer.append('<button></button>').addClass('btn btn-secondary').text(cityNames);
    //     inputs.val("");
    // }
})
});