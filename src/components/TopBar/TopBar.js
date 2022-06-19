import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

const TopBar = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showCompany, setShowCompany] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowCompany(user.roles.includes("ROLE_COMPANY"));
    }
    console.log(user);
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  console.log(currentUser);
  return (
    <nav className="navbar-admin navbar navbar-dark bg-primary">
      <Link to={"/"} className="navbar-brand" style={{ paddingLeft: "15px" }}>
        { showCompany ? `Xin Chào ${currentUser?.username}`: "ADMIN"}
      </Link>
      {currentUser ? (
        <ul className="navbar-nav navbar-register">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link" onClick={logOut}>
              <i class="fas fa-sign-out-alt"></i>Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav navbar-register">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              <i class="fas fa-user-circle"></i> Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default TopBar;
