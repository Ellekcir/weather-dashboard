
//----------------------------------------------------------------------------------------------
// GLOBAL VARIABLES
//----------------------------------------------------------------------------------------------

// Uses Moment.js for current time and date
let currentMoment = moment().format('MMMM Do YYYY, h:mm a');
// Grabs the search button from the HTML
const searchBtn = document.querySelector('#searchButton');
// Grabs the input section for the search of the city from the HTML
let citySearch = document.querySelector('#citySearch');
// This will be used to create an array of the searched cities and will be used to grab them from the LS
let cityList = [];
// Grabs the clear storage button from the HTML
let clearStorage = document.querySelector("#clearStorage");


//----------------------------------------------------------------------------------------------
// USER SEARCH INPUT
//----------------------------------------------------------------------------------------------

// This function will be played after the event of the search button is pressed
let getCity = function (event) {
    //this cancels the default action of the submit button
    event.preventDefault();
    // This grabs the value of the input of the user (i.e The city name) trim() - takes away any space (' ')values
    let cityName = citySearch.value.trim();
    // This .push will push the cityName (users input) into the array provided in cityList
    cityList.push(cityName);
    // Grabs the array from cityList and attaches to the local storage withthe key name 'City'
    localStorage.setItem("City", cityList.join(','));
    // When the user enters a value of a city it will run the function attaching the city to the api fetch
    if (cityName) {
        runFunction(cityName)
    }

}

//----------------------------------------------------------------------------------------------
// RETRIEVES LS CITIES
//----------------------------------------------------------------------------------------------


// This function retrieves the local storage 
let getCityList = function () {
    // Variable that retrieves the local storage key value of "City" which will be in an array .split(",") will break them up at the "," [Sydney,Melbourne,Perth] = Sydney Melbourne Perth
    let cities = localStorage.getItem("City").split(",");
    console.log(cities);
    // console.log(typeof cities);
    // This for loops each city name grabbed from the array 
    cities.forEach((city) => {
        // Creates a list item for each city 
        let listItem = document.createElement("li");
        //list styling 
        listItem.style.listStyleType = "none";
        // Creates a button 
        let cityBtn = document.createElement("button");
        //styles button ---------------------------------------------NOT WORKING 
        cityBtn.style.testAlign = "center";
        cityBtn.style.border = "none";
        cityBtn.style.backgroundColor = "#d2c2f6";
        cityBtn.style.textAlign = "center"
        // For each city grabbed from the array puts the button name as the city name
        cityBtn.innerHTML = city;
        // adds an event when the cityBtn is clicked to runFunction using the value of the buttons innerHTML which we just set to be the cities name grabbed from the array in the LS 
        cityBtn.addEventListener("click", function (event) {
            // event.target is the what element the event is tagetting (i.e the button) for ex: <button> Sydney </Button>    
            console.log(event.target);
            runFunction(event.target.innerHTML);
        })
        // adds the button to the list items
        listItem.append(cityBtn);
        // gets the cityResults from HTML and adds in the list Items (Cities from the user input that was stored in the LS)
        document.getElementById("cityResults").append(listItem);

    })

}
// Calls function but only if there is data in the LS
if (localStorage.getItem('City') !== null)
    getCityList()

//----------------------------------------------------------------------------------------------
// CURRRENT WEATHER 
//----------------------------------------------------------------------------------------------

// This function will fetch for data from openweathermap
var runFunction = function (cityName) {
    // The variable that holds the api url with unique API key, the ${cityName} will be the city the user enters in to the input 
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=4d5d9b3ba4f089d7ed898b71a8ee0a08`
    // This retrieves the data from the API
    fetch(requestUrl)
        // once retrieved this will console log the response which  then will be returned in .JSON in order to be able to read it
        .then(function (response) {
            console.log(response);
            return response.json();
            //then once data .json has returned logs 
        }).then((data) => {
            console.log(data);
            console.log("Data received - All further information will be used from here to make a dynamic generated page")
            console.log(data.name)
            //City name
            document.getElementById('cityName').innerHTML = data.name
            document.getElementById('currentForecast').style.display = "block";
            document.getElementById('cityName').style.color = "#27277c"
            // document.getElementById('currentForecast').style.backgroundColor = "#488bc1";
            console.log(data.name)
            // Weather condition icon 
            let iconImage = document.getElementById('icon')
            let iconFetchedUrl = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'
            iconImage.setAttribute("src", iconFetchedUrl);
            console.log(data.weather[0].icon)
            // Temperature
            document.getElementById('temp').innerHTML = "Temperature: " + data.main.temp.toString().split(".")[0] + " °C";
            document.getElementById('temp').style.color = "#ffffff";
            console.log("Temperature: " + data.main.temp.toString().split(".")[0] + " °C");
            // Date
            document.getElementById('dateCurrent').innerHTML = currentMoment;
            document.getElementById('dateCurrent').style.color = "#27277c";
            console.log(currentMoment);
            // Wind speed
            document.getElementById('windSpeed').innerHTML = "Wind Speed: " + data.wind.speed + ' MPH';
            document.getElementById('windSpeed').style.color = "#ffffff"
            console.log("Wind Speed: " + data.wind.speed + ' MPH');
            // Humidity
            document.getElementById('humidity').innerHTML = "Humidity: " + data.main.humidity + " %";
            document.getElementById('humidity').style.color = "#ffffff"
            console.log("Humidity: " + data.main.humidity + " %");

            //----------------------------------------------------------------------------------------------
            // 5 DAY FORECAST WEATHER 
            //----------------------------------------------------------------------------------------------


            // the api variable to fetch data for the 5 day forecast
            var forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=4d5d9b3ba4f089d7ed898b71a8ee0a08`
            // same as above fetch function
            fetch(forecast)
                .then(function (response) {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);

                    let forecastDiv = document.getElementById("fiveDayForecast");
                    forecastDiv.innerHTML = "";
                    forecastDiv.style.display = "flex"
                    let parentDiv = document.createElement("div")
                    parentDiv.style.display = "flex";
                    parentDiv.style.textAlign = "center";

                    for (let i = 0; i < 40; i += 8) {
                        // console.log(data.list[i]);
                        let div = document.createElement("div")

                        div.style.margin = "30px "
                        div.style.backgroundColor = "#488bc1";
                        div.style.color = "#ffffff";
                        div.style.borderRadius = "25px";
                        div.style.flexFlow = "column wrap";
                        div.style.padding = "10px";

                        let date_heading = document.createElement("h5");

                        // h4.style.display = "flex";

                        //-----------------Fetching the data for the 5 day forecast-------------------------------------
                        // This breaks down the fetch data of the date originally 'yyyy-dd-mm 00:00:00'
                        // grabbin the first split of the string value of 'yyyy-dd-mm'
                        dateFetched = data.list[i].dt_txt.toString().split(" ")[0]
                        // condensed variable of fetched date
                        let dateArr = dateFetched.split('-')

                        //  console.log(dateArr)
                        let dateOrder = `${dateArr[2]} - ${dateArr[1]} - ${dateArr[0]}`
                        // also written "dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0]"
                        date_heading.innerHTML = dateOrder
                        // date_heading.innerHTML = dateFetched.toString().split("-")[1].push([2])
                        // console.log(dateFetched.toString().split("-"));

                        // Weather condition icon 
                        let iconEl = document.createElement("p")
                        let icon_URL = 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png'
                        let imgTag = document.createElement("img");
                        // adds the image on to the paragraph
                        imgTag.setAttribute("src", icon_URL);
                        iconEl.append(imgTag)
                        // Temperature
                        let temperature_paragraph = document.createElement("p")
                        temperature_paragraph.innerHTML = 'Temp: ' + data.list[i].main.temp + ' °C'
                        // Wind speed
                        let wind_paragraph = document.createElement("p")
                        wind_paragraph.innerHTML = 'Wind: ' + data.list[i].wind.speed + ' MPH'
                        // Humidity
                        let humidity_paragraph = document.createElement("p")
                        humidity_paragraph.innerHTML = 'Humidity: ' + data.list[i].main.humidity + ' %'
                        // Date
                        div.append(date_heading, iconEl, temperature_paragraph, wind_paragraph, humidity_paragraph)
                        parentDiv.append(div)


                    }
                    //  console.log(parentDiv)
                    forecastDiv.append(parentDiv)
                    // parentDiv.append(body)


                })
        })
};

//----------------------------------------------------------------------------------------------
// CLEAR LS
//----------------------------------------------------------------------------------------------


// This function is set to an event button to clear the LS
let clearAll = function () {
    localStorage.removeItem('City');
    location.reload();
}

// This is to add tooltips to buttons
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

// event listener to the input text (location) 
searchBtn.addEventListener('click', getCity);
// event listener to clear LS 
clearStorage.addEventListener('click', clearAll)

