function refreshWeather(response) {
  let tempElement = document.querySelector("#weather-value");
  let temp = Math.round(response.data.temperature.current);
  let city = document.querySelector(".current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-icon");

  city.innerHTML = response.data.city;
  time.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} mph`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class = "weather-icon" />`;
  tempElement.innerHTML = temp;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "f37daf9e84tf92dob02174b7ea4039ad";
  let unit = "imperial";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(refreshWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#weather-search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "f37daf9e84tf92dob02174b7ea4039ad";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML += `
      <div class="weather-forecast-day">
      <div class="forecast-day">${formatDay(day.time)}</div>
      <img src="${day.condition.icon_url}" class="forecast-icon" />
      <div class="forecast-temperatures">
         <div class="forecast-temp"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
         <div class="forecast-temp">${Math.round(day.temperature.minimum)}°</div>
      </div>
      </div>
      `;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

searchCity("Houston");
