import React, { useEffect, useState } from "react";
import logo from "../../assets/img/booknow.png";
import { Link, useLocation } from "react-router-dom";
import authService from "../../services/auth.service";

function SideBar(props) {
  const location = useLocation();
  
  const [showCompany, setShowCompany] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowCompany(user.roles.includes("ROLE_COMPANY"));
      setShowAdmin(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);
  console.log(showAdmin);
  const initialMenus = [
    {
      id: 1,
      name: "Home",
      to: "/",
    },
    {
      id: 2,
      name: "Manage Users",
      to: "/users",
    },
    {
      id: 3,
      name: "Manage Companies",
      to: "/companies",
    },
  ];
  const [menus, setMenus] = useState(initialMenus);

  useEffect(() => {
    if (location.pathname.includes("/")) setState(1);
    if (location.pathname.includes("/users")) setState(2);
    //if (location.pathname.includes("/cars")) setState(3);
    if (location.pathname.includes("/companies")) setState(4);
    //if (location.pathname.includes("/reservations")) setState(5);
    //if (location.pathname.includes("/feedbacks")) setState(6);
  }, [location]);
  useEffect(() => {
    if (props.type != null && props.type !== 2) {
      setMenus(menus.slice(0, 1));
    }
  }, [props]);

  const [state, setState] = useState(1);
  return (
    <div className="side-bar">
      <img src={logo} alt="side_bar_logo" className="img-thumbnail" />
      <p className="sb-title">Booking Now Management</p>
      <div className="list-group" id="list-tab" role="tablist">
        {showAdmin && menus.map((menu, index) => (
          <Link
            to={menu.to}
            className={
              menu.id === state
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }
            key={index}
            onClick={() => setState(menu.id)}
          >
            {menu.name}
          </Link>
        ))}
        {
          showCompany && (
            <ul class="list-group">
              <Link
                to="/company/statistical"
                className="list-group-item list-group-item-action"
              >
                Trang Chủ
              </Link>
              <Link
                to="/company/lines"
                className="list-group-item list-group-item-action"
              >
                Quản Lý Hành Trình
              </Link>
              <Link
                to="/company/cars"
                className="list-group-item list-group-item-action"
              >
                Quản Lý Các Xe
              </Link>
              <Link
                to="/company/reservations"
                className="list-group-item list-group-item-action"
              >
                Quản Lý Đặt Vé
              </Link>
              <Link
                to="/company/feedbacks"
                className="list-group-item list-group-item-action"
              >
                Quản Lý Phản Hồi
              </Link>
            </ul>
          )
        }
      </div>
    </div>
  );
}

export default SideBar;
