import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.gif";
import cloud_icon from "../Assets/cloudy.png";
import wind_icon from "../Assets/wind.png";
import humid_icon from "../Assets/humidity.png";
import mist_icon from "../Assets/mist.png";
import snow_icon from "../Assets/snow.png";
import { useState } from "react";

const WeatherApp = () => {
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;
      let response = await fetch(url);
      let data = await response.json();

      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
      humidity[0].innerHTML = data.main.humidity + "%";
      wind[0].innerHTML = Math.floor(data.wind.speed) + "km/hr";
      temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
      location[0].innerHTML = data.name;

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(snow_icon);
      } else if (
        data.weather[0].icon === "50d" ||
        data.weather[0].icon === "50n"
      ) {
        setWicon(mist_icon);
      } else {
        setWicon(clear_icon);
      }
    } catch (error) {
      console.error("error fetching weather data", error);
      window.alert("City not found. Please enter a valid city name.");
      element[0].value = "";
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };
  return (
    <>
      <div className="container">
        <div className="top-bar">
          <input
            type="text"
            className="cityInput"
            placeholder="enter city name"
            onKeyDown={handleKeyDown}
          />
          <div
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">24c</div>
        <div className="weather-location">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humid_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">64percent</div>
              <div className="text">humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">18km/hr</div>
              <div className="text">Wind speed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default WeatherApp;
