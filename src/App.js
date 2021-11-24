import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TopBar from "./components/TopBar/TopBar";
import { Switch, Route, Link } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Cars from "./pages/Cars/Cars";
import Reservations from "./pages/Reservations/Reservations";
import Feedbacks from "./pages/Feedbacks/Feedbacks";
import Login from "./components/Login/Login";
import Companies from "./pages/Companies/Companies";
import AddCar from "./components/AddCar/AddCar";
import EditCar from "./components/EditCar/EditCar";
import EditCompany from "./components/EditCompany/EditCompany";
import ViewCar from "./components/ViewCar/ViewCar";

function App() {
  return (
    <div className="container-fluid">
      <TopBar />
      <div className="row">
        <div className="col-sm-2">
          <SideBar />
        </div>
        <div className="col-sm-10">
          <Switch>
            <Route exact path={["/", "/home"]} component={() => <Home />} />
            <Route exact path="/users" component={() => <Users />} />
            <Route exact path="/cars" component={() => <Cars />} />
            <Route
              exact
              path="/companies/cars/:id"
              component={() => <AddCar />}
            />
            <Route exact path="/cars/:id" component={() => <EditCar />} />
            <Route exact path="/companies" component={() => <Companies />} />
            <Route
              exact
              path="/companies/:id"
              component={() => <EditCompany />}
            />
            <Route
              exact
              path="/companies/view/:id"
              component={() => <ViewCar />}
            />
            <Route
              exact
              path="/reservations"
              component={() => <Reservations />}
            />
            <Route exact path="/feedbacks" component={() => <Feedbacks />} />
            <Route exact path="/login" component={() => <Login />} />
            <Route path="*" component={() => <div>404 Not Found!</div>} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
