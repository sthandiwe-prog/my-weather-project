let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = document.querySelector("#time");
time.innerHTML = `${day} ${hour}:${minutes}`;

function searchDefault(city) {
  let units = "metric";
  let apiKey = `b98755d1364b40ce6f0dab6b8d71729b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-space").value;
  searchDefault(city);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempInCelsius = document.querySelector("#tempInCelsius");
  tempInCelsius.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let fahreinheitDegrees = document.querySelector(".fahrenheit");
fahreinheitDegrees.addEventListener("click", convertToFahrenheit);

function convertToCelsuis(event) {
  event.preventDefault();
  let tempInCelsius = document.querySelector("#tempInCelsius");
  tempInCelsius.innerHTML = Math.round(celsiusTemperature);
}

let celsiusDegrees = document.querySelector(".celsius");
celsiusDegrees.addEventListener("click", convertToCelsuis);

function displayForecast(response) {
  //console.log(response.data);

  let forecastWeather = document.querySelector("#forecast");

  let htmlForecast = `<div class="row">`;

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  days.forEach(function displayDays(days) {
    htmlForecast =
      htmlForecast +
      `<div class="col">
                ${days} <br />
                <img src="image(s)/Mon.png" alt="Cloudy weather" /> <br />
                27°C
        </div>`;
  });

  htmlForecast = htmlForecast + `</div>`;
  forecastWeather.innerHTML = htmlForecast;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=b98755d1364b40ce6f0dab6b8d71729b`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);

  let condition = document.querySelector("#condition");
  condition.innerHTML = response.data.weather[0].main;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let temp = Math.round(celsiusTemperature);
  let actualTemp = document.querySelector("#tempInCelsius");
  actualTemp.innerHTML = `${temp}`;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);

  icon.setAttribute("alt", `${response.data.weather[0].main}`);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchCity);

searchDefault("Durban");

let celsiusTemperature = null;
