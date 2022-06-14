import React, { useState, useEffect } from "react";
import facade from "./Facades/apiFacade";
import Home from "./Components/Home";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ItemsEdit from "./Content/ItemsEdit";
import NoMatch from "./Content/NoMatch";
import "bootstrap/dist/css/bootstrap.min.css";
import AddRace from "./Content/AddRace";
import Header from "./Components/Header";
import ShowCars from "./Content/ShowCars";
import ShowDrivers from "./Content/ShowDrivers";
import AllRaces from "./Content/AllRaces";
import AllCars from "./Content/AllCars";
import EditCar from "./Content/EditCar";
import Signup from "./Content/Signup";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [errorMessage, setErrorMessage] = useState("All is good... so far");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setErrorMessage("Logged out");
  };

  return (
    <Container fluid>
      <Router>
        <Header facade={facade} LoggedIn={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Home
              logout={logout}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              facade={facade}
              setErrorMessage={setErrorMessage}
            />
          </Route>
          <Route path="/all-races">
            {facade.hasUserAccess("user", loggedIn) && (
              <AllRaces facade={facade} setErrorMessage={setErrorMessage} />
            )}
          </Route>
          <Route path="/ShowCars">
            {facade.hasUserAccess("user", loggedIn) && (
              <ShowCars facade={facade} setErrorMessage={setErrorMessage} />
            )}
          </Route>
          <Route path="/ShowDrivers">
            {facade.hasUserAccess("user", loggedIn) && (
              <ShowDrivers facade={facade} setErrorMessage={setErrorMessage} />
            )}
          </Route>
          <Route path="/items-edit">
            {facade.hasUserAccess("admin", loggedIn) && (
              <ItemsEdit facade={facade} setErrorMessage={setErrorMessage} />
            )}
          </Route>
          <Route path="/race-add">
            {facade.hasUserAccess("admin", loggedIn) && (
              <AddRace facade={facade} setErrorMessage={setErrorMessage} />
            )}
          </Route>
          <Route path="/all-cars">
            {facade.hasUserAccess("admin", loggedIn) && (
              <AllCars facade={facade} setErrorMessage={setErrorMessage} />
            )}
          </Route>
          <Route path="/edit-car">
            {facade.hasUserAccess("admin", loggedIn) && (
              <EditCar facade={facade} setErrorMessage={setErrorMessage} />
            )}
          </Route>
          <Route path="/signup">

              <Signup facade={facade} setErrorMessage={setErrorMessage} />
            
          </Route>

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}
export default App;
