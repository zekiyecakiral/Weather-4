import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Link } from "react-router-dom";

export default function CityCard({ city, removeCity }) {
  return (
    <>
      <Card className="container" key={city.id}>
        <CardContent>
          <Link className="linkClass" to={`/${city.description.name}`} style={{textDecoration:'none'  }}>
            <Typography variant="h5" component="h2">
              {city.description.name}, {city.description.country}{" "}
            </Typography>

            <Typography color="textSecondary">
              {city.description.main}
            </Typography>

            <Typography variant="body2" component="p">
              {city.description.description}
              <br />
              <br />
              <span>min temp: </span> {city.description.temp_min}
              <br />
              <span>max temp: </span> {city.description.temp_max}
            </Typography>
          </Link>
        </CardContent>
        <HighlightOffIcon
          color="secondary"
          style={{ fontSize: 40 }}
          onClick={() => {
            const selectedId = city.id;
            removeCity(selectedId);
          }}
        />
      </Card>
    </>
  );
}
