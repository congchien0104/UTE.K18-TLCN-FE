import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";

function UserList(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    retrieveUsers();
    console.log(users);
  }, []);

  const retrieveUsers = () => {
    UserService.getUserList()
      .then((response) => {
        //setCategories(response.data);
        setUsers(response.data.data.users.rows);
        console.log(response.data.data.users.rows);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <table className="table mt-5">
        <thead className="thead-dark">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Firstname</th>
            <th scope="col">FullName</th>
            <th scope="col">Roles</th>
            <th scope="col">State</th>
            <th scope="col">CreatedDate</th>
            <th scope="col">UpdatedDate</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.firstname || "Null"}</td>
                <td>{user.fullname || "Null"}</td>
                <td>{user.roles || "Null"}</td>
                <td>{user.state || "Null"}</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
                <td>
                  <button type="button" class="btn btn-primary">
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger ml-2"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        "Do you really want to delete this Category?"
                      );
                      if (confirmBox === true) {
                        alert("okkk");
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
