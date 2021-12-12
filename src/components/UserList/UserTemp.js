import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import Pagination from "react-responsive-pagination";

function UserList(props) {
  const [users, setUsers] = useState([]);
  const [disabled, setDisabled] = useState();
  const [count, setCount] = useState();
  const [totalPages, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  function handlePageChange(page) {
    setCurrentPage(page);
    // ... do something with `page`
  }
  console.log(search);

  useEffect(() => {
    retrieveUsers();
    console.log(users);
  }, [currentPage]);

  const retrieveUsers = () => {
    UserService.getUserList(currentPage)
      .then((response) => {
        //setCategories(response.data);
        setUsers(response.data.data.users.rows);
        setCount(response.data.data.users.count);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateDisabled = (data) => {};
  return (
    <div className="user-list-admin">
      <div className="search-user">
        <form className="row justify-content-center">
          <input class="form-control col-md-3 mr-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="users-table">
        <table className="table table-bordered table-hover user-table mt-5">
          <thead className="table-primary">
            <tr>
              <th>STT</th>
              <th>Username</th>
              <th>Email</th>
              <th>Firstname</th>
              <th>FullName</th>
              <th>Roles</th>
              <th>State</th>
              <th>CreatedDate</th>
              <th>UpdatedDate</th>
              <th>Option</th>
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
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={updateDisabled(user)}
                    >
                      {user.disabled ? "Unlock" : "Lock"}
                    </button>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>{formatDate(user.updatedAt)}</td>
                  <td>
                    <button type="button" class="btn btn-primary">
                      Edit
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger ml-2"
                      onClick={() => {
                        const confirmBox = window.confirm(
                          "Do you really want to delete this User?"
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
      <Pagination 
        total={Math.ceil(count/8)}
        current={currentPage}
        onPageChange={page => handlePageChange(page)}
      />
    </div>
  );
}

const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
};

export default UserList;
