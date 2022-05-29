import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

function App() {
  // Hook
  const [location, setLocation] = useState(false);

  // useEffect
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  // checking if the user gave us permission to access this location
  if (location == false) {
    return <Fragment>Habilite a localização no browser.</Fragment>;
  } else {
    return (
      <Fragment>
        <h3>Clima na sua localidade</h3>
        <hr />
        <ul>
          <li>Temperatura Atual: </li>
          <li>Temp max</li>
          <li>Temp min</li>
          <li>Pressão</li>
          <li>Umidade</li>
        </ul>
      </Fragment>
    );
  }
}

export default App;
