import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

const TopBar = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };
  console.log("Current user: ",currentUser);
  return (
    <nav className="navbar navbar-dark bg-secondary">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <p className="fs-4 fw-bolder text-white mb-0" style={{"marginRight":"4.6rem"}}>Adminstrator</p>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        {currentUser ? (
          <div className="d-flex align-items-center">
            <p className="text-white fst-italic fw-bolder fs-5 mb-0">Xin chào {currentUser.username}</p>
            <Link to={"/login"} className="nav-link text-white fs-5 fw-bolder ml-auto" onClick={logOut}>
              Đăng xuất
            </Link>
          </div>
        ) : (
          <Link to={"/login"} className="nav-link text-white fs-5 fw-bolder ml-auto">
            Đăng nhập
          </Link>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
