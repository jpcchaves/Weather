import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import './App.css'

function App() {
  // Location Hook
  const [location, setLocation] = useState(false);

  // Weather Hook
  const [weather, setWeather] = useState(false);

  // http request
  let getWeather = async (lat, long) => {
    let res = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: lat,
          lon: long,
          appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
          lang: "pt",
          units: "metric",
        },
      }
    );
    setWeather(res.data);
    console.log(res.data)
  };

  // useEffect
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  // checking if the user gave us permission to access this location
  if (location == false) {
    return (
      <Fragment>Habilite a localização no browser.</Fragment>
  )} else if (weather == false) {
    return (
    <Fragment>Carregando o clima...</Fragment>
    )
  } else {
    return (
    <Fragment>
      <div className="container">
        <h3>Clima em {weather["name"]}: {weather["weather"][0]["description"]}</h3>
        <hr />
        <ul>
          <li>Temperatura atual: {weather["main"]["temp"].toFixed(0)} ºC</li>
          <li>Sensação térmica de {weather["main"]["feels_like"]} ºC</li>
          <li>Temperatura máxima: {weather["main"]["temp_max"]} ºC</li>
          <li>Temperatua mínima: {weather["main"]["temp_min"]} ºC</li>
          <li>Humidade: {weather["main"]["humidity"]}%</li>
        </ul>
      </div>
    </Fragment>
    )
  }
}

export default App;
