//Day and Time
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let currentTime = new Date();
let day = days[currentTime.getDay()];
let hour = addZero(currentTime.getHours());
let minutes = addZero(currentTime.getMinutes());
let time = document.querySelector("#current-time");
time.innerHTML = day + ", " + hour + ":" + minutes;

//Celcius & Fahrenheit
function convertFarenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  let farenheitTemp = Math.round(currentTemp.innerHTML * (9 / 5) + 32);
  currentTemp.innerHTML = farenheitTemp;
}

function convertCelcius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  let celciusTemp = Math.round((currentTemp.innerHTML - 32) * (5 / 9));
  currentTemp.innerHTML = celciusTemp;
}

let celcius = document.querySelector("#celcius-click");
celcius.addEventListener("click", convertCelcius);

let fahrenheit = document.querySelector("#fahrenheit-click");
fahrenheit.addEventListener("click", convertFarenheit);

//City name and temp
function forecast(response) {
  let day1 = document.querySelector("#temperature");
  day1.innerHTML = Math.round(response.data.main.temp);
}

function city(event) {
  event.preventDefault();
  let searchedCity = document.querySelector(".search-city");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = searchedCity.value;

  let apiKey = "66e038d90b67f15e0494a6c2611fd584";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(forecast);
}
let form = document.querySelector(".search");
form.addEventListener("submit", city);

//CurrentLocation
function currentTemp(response) {
  let location = document.querySelector("#city-name");
  location.innerHTML = "Your Current location";
  let day1 = document.querySelector("#temperature");
  day1.innerHTML = Math.round(response.data.main.temp);
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "66e038d90b67f15e0494a6c2611fd584";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(url).then(currentTemp);
}

function geoLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", geoLocation);
