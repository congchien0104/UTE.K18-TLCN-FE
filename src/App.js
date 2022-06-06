import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AddCar from "./components/AddCar/AddCar";
import EditCar from "./components/EditCar/EditCar";
import EditCompany from "./components/EditCompany/EditCompany";
import Login from "./components/Login/Login";
import SideBar from "./components/SideBar/SideBar";
import TopBar from "./components/TopBar/TopBar";
import ViewCar from "./components/ViewCar/ViewCar";
import Cars from "./pages/Cars/Cars";
import Companies from "./pages/Companies/Companies";
import Feedbacks from "./pages/Feedbacks/Feedbacks";
import Home from "./pages/Home/Home";
import Reservations from "./pages/Reservations/Reservations";
import Users from "./pages/Users/Users";

function App() {
  return (
    <div className="booknow-dashboard" style={{ "height": "100vh" }}>
      <TopBar />
      <div className="sidebar" style={{ "height": "calc(100% - 62px)" }}>
        <div className="main d-flex">
          <div className="collapse collapse-horizontal show" id="collapseWidthExample" style={{ "height": "calc(100vh - 62px)", "borderRight":"1px solid #ccc"}}>
            <SideBar />
          </div>
          <div className="" style={{ "width": "100%" }}>
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
    </div>
  );
}

export default App;
