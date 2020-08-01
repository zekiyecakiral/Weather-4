import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Weather from "./Weather";
import Forecast from "./Forecast";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Weather}></Route>
          <Route exact path="/:cityName" component={Forecast}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
