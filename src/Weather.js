import React, { useState } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Error from "./Error";
import CityCard from "./CityCard";

export default function Weather() {
  const [cities, setCities] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [city, setCity] = useState("");

  const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  const getWeather = (cityName) => {
    const END_POINT = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    fetch(END_POINT)
      .then((resp) => {
        if (!resp.ok) {
          throw Error(resp.statusText);
        }
        return resp.json();
      })
      .then((response) => {
        const {
          name,
          sys: { country },
          main: { temp_max, temp_min },
          weather: [{ main, description }],
          coord: { lat, lon },
        } = response;
        setCities([
          ...cities,
          {
            description: {
              name,
              country,
              main,
              description,
              lat,
              lon,
              temp_max,
              temp_min,
            },
            id: Date.now(),
          },
        ]);
        setHasError(false);
      })
      .catch((error) => {
        setHasError(true);
      });
  };

  const searchCityWeather = () => {
    getWeather(city);
    setCity("");
  };

  function removeCity(cityID) {
    const remainingCities = cities.filter((item) => item.id !== cityID);
    setCities(remainingCities);
  }

  return (
    <div>
      <h1>Weather</h1>
      <form noValidate autoComplete="off">
        <TextField
          className="input"
          id="outlined-basic"
          label="City"
          variant="outlined"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={searchCityWeather}
        >
          Search
        </Button>
      </form>

      {hasError && (
        <Error message={" Please be sure to enter a meaningful city name!"} />
      )}

      {cities
        .map((city) => <CityCard city={city} removeCity={removeCity} />)
        .reverse()}
    </div>
  );
}
