import React, { useState } from "react";
import logo from "../../assets/img/booknow.png";
import { Link } from "react-router-dom";

function SideBar(props) {
  const menus = [
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
      name: "Manage Cars",
      to: "/cars",
    },
    {
      id: 4,
      name: "Manage Companies",
      to: "/companies",
    },
    {
      id: 5,
      name: "Manage Reservations",
      to: "/reservations",
    },
    {
      id: 6,
      name: "Manage Feedbacks",
      to: "/feedbacks",
    },
  ];

  const [state, setState] = useState(1);
  return (
    <div>
      <img src={logo} alt="..." className="img-thumbnail" />
      <h6>
        <span className="text-primary">Booking Now Management</span>
      </h6>
      <div className="list-group" id="list-tab" role="tablist">
        {menus.map((menu, index) => (
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
      </div>
    </div>
  );
}

export default SideBar;
