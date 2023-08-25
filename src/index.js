function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector(".date-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// search bar
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// // convert fahrenheit
// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector(".current-temp");
//   temperatureElement.innerHTML = 63;
// }

// let fahrenheitLink = document.querySelector(".fahrenheit");
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

// // convert celsius
// function convertToCelsius(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector(".current-temp");
//   temperatureElement.innerHTML = 17;
// }

// let celsiusLink = document.querySelector(".celsius");
// celsiusLink.addEventListener("click", convertToCelsius);

// current location
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchLocation(position) {
  let apiKey = "e450bc345a80a08ada69fd5c714d871d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);

// Search Engine - change city & temp
function changeTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = temp;
}

function searchCity(city) {
  let apiKey = "ecdb6eb1190bca80c0fc58c1b82b1674";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
