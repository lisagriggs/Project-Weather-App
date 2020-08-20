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
time.innerHTML = `${day}, ${hour}:${minutes}`;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//Celcius & Fahrenheit
function convertFarenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");

  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  let farenheitTemp = Math.round(currentTemp.innerHTML * (9 / 5) + 32);
  currentTemp.innerHTML = farenheitTemp;
}

function convertCelcius(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
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
  day1.innerHTML = `${Math.round(response.data.main.temp)}`;

  let weatherDescription = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  weatherDescription.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather.description);
}

function nextHours(response) {
  let futureForecast = document.querySelector("#forecast");
  let forecast = response.data.list[0];

  futureForecast.innerHTML = `
    <div class="col">
      <p class="time">${formatHours(forecast.dt * 1000)}</p>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" class="sub-emoji"/>                
      <p class="temp"><span id="temperature">${Math.round(forecast.main.temp)}</span>°</p>
    </div>`;

  forecast = response.data.list[1];
  futureForecast.innerHTML += `
    <div class="col">
      <p class="time">${formatHours(forecast.dt * 1000)}</p>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" class="sub-emoji"/>                
      <p class="temp"><span id="temperature">${Math.round(forecast.main.temp)}</span>°</p>
    </div>`;

  forecast = response.data.list[2];
  futureForecast.innerHTML += `
    <div class="col">
      <p class="time">${formatHours(forecast.dt * 1000)}</p>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" class="sub-emoji"/>                
      <p class="temp"><span id="temperature">${Math.round(forecast.main.temp)}</span>°</p>
    </div>`;

  forecast = response.data.list[3];
  futureForecast.innerHTML += `
    <div class="col">
      <p class="time">${formatHours(forecast.dt * 1000)}</p>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" class="sub-emoji"/>                
      <p class="temp"><span id="temperature">${Math.round(forecast.main.temp)}</span>°</p>
    </div>`;

  forecast = response.data.list[4];
  futureForecast.innerHTML += `
    <div class="col">
      <p class="time">${formatHours(forecast.dt * 1000)}</p>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" class="sub-emoji"/>                
      <p class="temp"><span id="temperature">${Math.round(forecast.main.temp)}</span>°</p>
    </div>`;
}

function city(event) {
  event.preventDefault();
  let searchedCity = document.querySelector(".search-city");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = searchedCity.value;

  let apiKey = "66e038d90b67f15e0494a6c2611fd584";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(forecast);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(nextHours);
}

let form = document.querySelector(".search");
form.addEventListener("submit", city);

//Onload
function search(city) {
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${city}`;

  let apiKey = "66e038d90b67f15e0494a6c2611fd584";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forecast);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(nextHours);
}

search("London");
