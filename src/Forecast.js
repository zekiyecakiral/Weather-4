import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Chart from "./Chart";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Error from "./Error";
import Button from "@material-ui/core/Button";

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

function Forecast() {
  const { cityName } = useParams();
  const history = useHistory();
  const [dataToShow, setDataToShow] = useState([]);
  const [hasError, setHasError] = useState(false);

  const fetchForecast = async (name) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${name}&units=metric&appid=${API_KEY}`
    )
      .then((resp) => {
        if (!resp.ok) {
          throw Error(resp.statusText);
        }
        return resp.json();
      })
      .then((response) => {
        let fiveDaysForecast = [];
        for (let i = 0; i < response.list.length; i++) {
          fiveDaysForecast = [
            ...fiveDaysForecast,
            {
              name: response.list[i].dt_txt,
              "°C": response.list[i].main.temp,
            },
          ];
          setDataToShow(fiveDaysForecast);
          setHasError(false);
          if(i>120) break;
        }
      })
      .catch((error) => {
        setHasError(true);
      });
  };

  function navigateToHome() {
    history.push("/");
  }

  useEffect(() => {
    fetchForecast(cityName);
  }, []);


  return (
    <Card>
      <CardContent>
      <Typography variant="h4">5 day forecast</Typography>
        <Typography variant="h5" component="h2">
          {cityName}
        </Typography>
        <Typography>
          {hasError && <Error message="Oppsss" />}
          {!hasError && <Chart dataToShow={dataToShow} />}
        </Typography>
        <Button variant="contained" color="secondary" onClick={navigateToHome}>
          Home
        </Button>
      </CardContent>
    </Card>
  );
}

export default Forecast;
