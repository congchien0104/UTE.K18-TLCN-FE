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
import FeedbackHome from "./pages/Feedbacks/FeedbackHome";
import FeedbackOfCar from "./pages/Feedbacks/FeedbackOfCar";
import ReservationOfCar from "./pages/Reservations/ReservationOfCar";
import ReservationHome from "./pages/Reservations/ReservationHome";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddLine2 from "./components/Lines/AddLine2";
import AddLine from "./components/Lines/AddLine";
import EditLine from "./components/Lines/EditLine";
import EditLine2 from "./components/Lines/EditLine2";
import AddJourney from "./components/Journeys/AddJourney";
import Statistical from "./components/Statistical/Statistical";
import CompanyCarList from "./components/CompanyList/CompanyCarList";
import LineList from "./components/Lines/LineList";
import EditJourney from "./components/Journeys/EditJourney";
import ReservationList from "./pages/Reservations/ReservationList";
import FeedbackList from "./pages/Feedbacks/FeedbackList";
import CarListCompany from "./pages/CompanyCar/CarListCompany";
import StatisticalCompany from "./components/Statistical/StatisticalCompany";

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
            <Route exact path="/company/cars" component={() => <CarListCompany />} />
            <Route
              exact
              path="/company/cars/:id"
              component={() => <AddCar />}
            />
            <Route
              exact
              path="/company/cars/line/:id"
              component={() => <AddLine />}
            />
            <Route
              exact
              path="/company/cars/line2/:id"
              component={() => <AddLine2 />}
            />
            <Route
              exact
              path="/company/cars/line/edit/:id"
              component={() => <EditLine />}
            />
            <Route
              exact
              path="/company/cars/line2/edit/:id"
              component={() => <EditLine2 />}
            />
            <Route
              exact
              path="/company/feedbacks"
              component={() => <FeedbackList />}
            />
            <Route
              exact
              path="/company/feedbacks/:id"
              component={() => <FeedbackOfCar />}
            />
            <Route
              exact
              path="/company/reservations"
              component={() => <ReservationList />}
            />
            <Route
              exact
              path="/company/statistical"
              component={() => <StatisticalCompany />}
            />
            <Route
              exact
              path="/company/reservations/:id"
              component={() => <ReservationOfCar />}
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
              component={() => <CompanyCarList />}
            />
            <Route
              exact
              path="/reservations"
              component={() => <Reservations />}
            />
            <Route exact path="/feedbacks" component={() => <Feedbacks />} />
            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/lines/journeys/:id" component={() => <AddJourney />} />
            <Route exact path="/lines/journeys/edit/:id" component={() => <EditJourney />} />
            <Route exact path="/company/lines" component={() => <LineList />} />

            <Route path="*" component={() => <div>404 Not Found!</div>} />
          </Switch>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
