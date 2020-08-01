
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default  function Error({message}){

    return (
        <Card>
        {" "}
        <CardContent>
          {" "}
          <Typography variant="h5" component="h2" color="secondary">
            ERROR
          </Typography>
          <Typography variant="h5" color="secondary">
             {message}
          </Typography>
        </CardContent>
      </Card>
    )
}