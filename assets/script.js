//GIVEN a weather dashboard with form inputs 
// WHEN I search for a city 
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//Create a function that when I put a city in the input it finds the weather in that location
// Have a function that shows the future conditions
// have the previous search stored in the local storage


/* TO - DO 

<div id='cityHistory'> - 
city is added to the search history
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
<div id='currentForecast'>
the date, an icon representation of weather conditions,
<div id='fiveDayForecast'>
an icon representation of weather conditions, 

*/



//--------------Global Variables ----\
const searchBtn = document.querySelector('#searchButton');
let citySearch = document.querySelector('#citySearch');
let getCity = function (event) {
    event.preventDefault();
    
    let name = citySearch.value.trim();
    if (name) {
        runFunction(name)
    }
}




var runFunction = function (name) {

    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=4d5d9b3ba4f089d7ed898b71a8ee0a08`

    fetch(requestUrl)
        .then(function (response) {
            console.log(response);
            return response.json();
        }).then((data) => {
            console.log(data);
            // console.log(data.weather[0])
            //console.log(data.name)
            //document.getElementById("cityName").innerHTML=data.weather[0];
            document.getElementById('currentForecast').style.display = "block";
            document.getElementById('currentForecast').style.backgroundColor = "#ffffff";
            document.getElementById('cityName').innerHTML = data.name
            document.getElementById('cityName').style.color = "pink"
            document.getElementById('temp').innerHTML = "Temperature: " + data.main.temp.toString().split(".")[0] + " °C";
            document.getElementById('temp').style.color = "red"
            document.getElementById('windSpeed').innerHTML = "Wind Speed: " + data.wind.speed + ' MPH';
            document.getElementById('windSpeed').style.color = "lightgreen"
            document.getElementById('humidity').innerHTML = "Humidity: " + data.main.humidity + " %";
            document.getElementById('humidity').style.color = "green"
            // console.log(JSON.stringify(data.weather[0]));

            var forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&units=metric&appid=4d5d9b3ba4f089d7ed898b71a8ee0a08`

            fetch(forecast)
                .then(function (response) {
                    return response.json();
                })
                .then((data) => {
                    //  console.log(data);

                    let forecastDiv = document.getElementById("fiveDayForecast")
                    //forecastDiv.style.display = "flex" 
                    let parentDiv = document.createElement("div")
                    parentDiv.style.display = "flex";
                    parentDiv.style.textAlign = "center";

                    for (let i = 0; i < 40; i += 8) {
                        // console.log(data.list[i]);
                        let div = document.createElement("div")

                        div.style.margin = "30px "
                        div.style.backgroundColor = "#ab7500";
                        div.style.color = "#ffffff";
                        div.style.borderRadius = "25px";
                        div.style.flexFlow = "column wrap";
                        div.style.padding = "10px";

                        let date_heading = document.createElement("h4");

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

                        let temperature_paragraph = document.createElement("p")
                        temperature_paragraph.innerHTML = 'Temp: ' + data.list[i].main.temp + ' °C'


                        let wind_paragraph = document.createElement("p")
                        wind_paragraph.innerHTML = 'Wind: ' + data.list[i].wind.speed + ' MPH'

                        let humidity_paragraph = document.createElement("p")
                        humidity_paragraph.innerHTML = 'Humidity: ' + data.list[i].main.humidity + ' %'
                        // console.log();

                        let iconEl = document.createElement("p")
                        let icon_URL = 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png'
                        // icon_link.setAttribute(href, ('http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png'))
                        // iconEl.innerHTML = icon_URL.iconEl

                        div.append(date_heading, temperature_paragraph, wind_paragraph, humidity_paragraph)
                        parentDiv.append(div)


                    }
                    //  console.log(parentDiv)
                    forecastDiv.append(parentDiv)
                    // parentDiv.append(body)


                })
        })
};
// event listener to the input text (location) 

searchBtn.addEventListener('click', getCity)




// How to check the RESPONSE and log it to the page..
// var requestUrl = // API website
// var responseText = document.getElementById(//ID)
// )
// function getApi (requestUrl) {
//     fetch(requestUrl)
//         .then(function(response) {
//             console.log(response);
//             if (response.status === 200) {
//                 responseText.textContent = "Request success"
//             }
//         });
// }

// getApi(requestUrl);

//document.get

// 1- Include the "icons" file in your program: openweatherAPI Icons integration

// 2- In your index.html :

// <div class="weather-icon"><img src="icons/unknown.png" /></div>
// 3- In your JavScript file(follow these 3 steps in your JS code) :

// 1st Step: let locationIcon = document.querySelector('.weather-icon');

// 2nd Step: const {icon} = data.weather[0];

// 3rd Step(not in code format, as it was making thebackticks part disappear):
// locationIcon.innerHTML = <img src="icons/${icon}.png">;



// const searchBtn = document.querySelector('#searchButton');
// const citySearch = document.querySelector('#citySearch');


// searchBtn.addEventListener('click', function (event) {
//     event.preventDefault();
// let potato = event.target.value;
// console.log(potato)
//     console.log('clicked');
//     localStorage.setItem("City", citySearch);
//     JSON.parse(localStorage.getItem("City"));
// })