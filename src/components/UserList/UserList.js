import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service";

function UserList(props) {
  const [users, setUsers] = useState([]);
  const [disabled, setDisabled] = useState();

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    UserService.getUserList()
      .then((response) => {
        //setCategories(response.data);
        setUsers(response.data.data.users.rows);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(users);
  const updateDisabled = (data) => { };
  return (
    <div>
      <table className="table table-hover">
        <thead className="table-dark text-center" style={{ "display": "table", "width": "100%", "tableLayout": "fixed" }}>
          <tr>
            <th scope="col" style={{"width": "10%"}}>STT</th>
            <th scope="col" style={{"width": "20%"}}>Họ và tên</th>
            <th scope="col" style={{"width": "20%"}}>Email</th>
            <th scope="col" style={{"width": "15%"}}>Roles</th>
            <th scope="col" style={{"width": "10%"}}>Ngày tạo</th>
            <th scope="col" style={{"width": "25%"}}>Tùy chọn</th>
          </tr>
        </thead>
        <tbody style={{ "display": "block", "maxHeight": "80vh", "overflowY": "scroll" }}>
          {users &&
            users.map((user, index) => (
              <tr key={index} style={{ "display": "table", "width": "100%", "tableLayout": "fixed" }}>
                <th className="text-center" style={{"width": "10%"}} scope="row">{index + 1}</th>
                <td style={{"width": "20%"}}>{user.fullname || "Chưa cập nhật"}</td>
                <td data-bs-toggle="modal" data-bs-target={`#details${user.username}`} style={{ "cursor": "pointer", "width": "20%" }}>{user.email}</td>
                <td style={{"width": "15%"}}>{user.roles || "Chưa cập nhật"}</td>
                <td className="text-center" style={{"width": "15%"}}>{formatDate(user.createdAt, 1) || "Chưa cập nhật"}</td>
                <td className="text-center" style={{"width": "20%"}}>
                  <button type="button" class="btn btn-primary" style={{ "marginRight": "1rem" }}>
                    Sửa
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    style={{ "marginRight": "1rem" }}
                    onClick={updateDisabled(user)}
                  >
                    {user.disabled ? "Mở khóa" : "Khóa"}
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        "Do you really want to delete this User?"
                      );
                      if (confirmBox === true) {
                        alert("okkk");
                      }
                    }}
                  >
                    Xóa
                  </button>
                </td>
                <div class="modal fade" id={"details" + user.username} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Chi tiết người dùng</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p className="modal-text"><strong>Họ và tên:</strong> {user.fullname || "Chưa cập nhật"}</p>
                        <p className="modal-text"><strong>Username:</strong> {user.username}</p>
                        <p className="modal-text"><strong>Số điện thoại:</strong> {user.phone || "Chưa cập nhật"}</p>
                        <p className="modal-text"><strong>Email:</strong> {user.email}</p>
                        <p className="modal-text"><strong>Địa chỉ:</strong> {user.address || "Chưa cập nhật"}</p>
                        <p className="modal-text"><strong>Roles:</strong> {user.roles || "Chưa cập nhật"}</p>
                        <p className="modal-text"><strong>Ngày tạo:</strong> {formatDate(user.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
const formatDate = (date, option = 0) => {
  var d = new Date(date),
    minute = "" + (d.getMinutes() + 1),
    hours = "" + (d.getHours() + 1),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return option === 1 ? [day, month, year].join("-") : [hours, minute].join(":") + " ngày " + [day, month, year].join("-");
};
export default UserList;
