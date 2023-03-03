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
function retrieveStorage() {

    //retrieving the array from local storage
    var storedCities = JSON.parse(localStorage.getItem("cities"));

   //if there is something to retrieve in local storage, make it the value of a variable
   if (storedCities !== null) {
    cityNamesArray = storedCities;
   };
};

$(document).ready(function() {
    retrieveStorage();
    
    function renderCities() {
        
        searchHistoryContainer.innerHTML = "";
    
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

    //pushes each input into the empty array that will be used to set storage
    cityNamesArray.push(text);

    //if there is no input, return
    if (text = "") {
        return;
    }
        //sets local storage with array
        localStorage.setItem("cities", JSON.stringify(cityNamesArray));
        
        //empties the user input area after submitting input with click
        userInput.val("");

        renderCities();
        //code that AskBCS helped with because my code did not update with new input, but instead would display whole array again
        // var city = document.querySelector('.search-history');
        // while(city.firstChild) {
        // city.removeChild(city.firstChild);
        // }

        //FUNCTION CONVERTING CITY NAME TO COORDINATES
        // function coordinatesAPI() {

        //     var geoCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityNamesArray + '&limit=1&appid=' + APIKey;

        //     fetch(geoCodeUrl) 
        //         .then(function (response) {
        //             return response.json();
        //         })
        //         .then(function (data) {
        //             console.log(data);
        //             for (var i = 0; i < cityNamesArray.length; i++) {
        //                 console.log(data[i].lat);
        //                 console.log(data[i].lon);
        //             }
        //         });
        // }

       
        //function to display inputs stored in local storage as buttons
        //coordinatesAPI();
})
});