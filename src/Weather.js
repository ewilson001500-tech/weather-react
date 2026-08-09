import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("Houston");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function showValues(response) {
    setLoaded(true); //this just says that it got a response from the API
    setWeather({
      temp: response.data.temperature.current,
      description: response.data.condition.description,
      humidity: response.data.temperature.humidity,
      wind: response.data.wind.speed,
      icon: response.data.condition.icon_url,
    }); //this is getting the data from the api so we can use it
  }

  function handleSubmit(event) {
    event.preventDefault();
    let key = "f37daf9e84tf92dob02174b7ea4039ad";
    let api = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=imperial`;

    axios.get(api).then(showValues);
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={handleChange}
      />
      <input type="submit" />
    </form>
  );

  if (loaded) {
    //we use load to show that we got the response from the api
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temp)}°F</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind} mph</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form; //we havent got a response from the api yet so it just shows the form
  }
}
