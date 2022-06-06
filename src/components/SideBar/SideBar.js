import React, { useState } from "react";
import logo from "../../assets/img/booknow.png";
import { Link } from "react-router-dom";

function SideBar(props) {
  const menus = [
    {
      id: 1,
      name: "Trang chủ",
      to: "/",
    },
    {
      id: 2,
      name: "Quản lý người dùng",
      to: "/users",
    },
    {
      id: 3,
      name: "Quản lý xe",
      to: "/cars",
    },
    {
      id: 4,
      name: "Quản lý nhà xe",
      to: "/companies",
    },
    {
      id: 5,
      name: "Quản lý vé",
      to: "/reservations",
    },
    {
      id: 6,
      name: "Quản lý phản hồi",
      to: "/feedbacks",
    },
  ];
  // const styles = {
  //   "border":"none"
  // }
  const [state, setState] = useState(1);
  return (
    <div style={{ "width": "18rem", }}>
      <ul className="list-group sidebar-list text-white" id="list-tab" role="tablist" style={{ "borderRadius": "0" }}>
        {menus.map((menu, index) => (
          <Link
            to={menu.to}
            style={{ "padding": ".5rem 1rem", "border": "none", "marginBottom": "1rem" }}
            className={
              menu.id === state
                ? "list-group-item sidebar-item fs-5 text-decoration-none fw-bolder active"
                : "list-group-item sidebar-item fs-5 text-decoration-none fw-bolder"
            }
            key={index}
            onClick={() => setState(menu.id)}
          >
            {menu.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
