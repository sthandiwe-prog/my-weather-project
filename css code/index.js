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

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempInCelsius = document.querySelector("#tempInCelsius");
  tempInCelsius.innerHTML = 66;
}

let fahreinheitDegrees = document.querySelector(".fahrenheit");
fahreinheitDegrees.addEventListener("click", convertToFahrenheit);

function convertToCelsuis(event) {
  event.preventDefault();
  let tempInCelsius = document.querySelector("#tempInCelsius");
  tempInCelsius.innerHTML = 24;
}

let celsiusDegrees = document.querySelector(".celsius");
celsiusDegrees.addEventListener("click", convertToCelsuis);

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

function showTemperature(response) {
  let condition = document.querySelector("#condition");
  condition.innerHTML = response.data.weather[0].main;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;

  let temp = Math.round(response.data.main.temp);
  let actualTemp = document.querySelector("#tempInCelsius");
  actualTemp.innerHTML = `${temp}`;
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchCity);

searchDefault("Durban");
