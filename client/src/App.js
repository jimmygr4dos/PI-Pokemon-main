// import React from "react";
// import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import Detail from "./components/Detail/Detail";
import CreatePage from "./components/CreatePage/CreatePage";

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exath path="/home" component={Home} />
          <Route exact path="/" component = {LandingPage} />
          <Route exact path="/create" component={CreatePage} />
          <Route path="/pokemons/:id" component={Detail} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
