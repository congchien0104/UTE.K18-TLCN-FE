import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import Pagination from "react-responsive-pagination";
import UserModal from "../../Modals/UserModal";
import userService from "../../services/user.service";
import { SuccessNotify } from "../../utils/Notify";

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

  useEffect(() => {
    UserService.getSearchUser(currentPage, search)
    .then((response) => {
      //setCategories(response.data);
      setUsers(response.data.data.users.rows);
      setCount(response.data.data.users.count);
    })
    .catch((e) => {
      console.log(e);
    });
  }, [search]);

  const handleDisabled = (user) => {
    var temp = {
      disabled: !user.disabled
    };
    userService.disabledUser(user.id, temp)
    .then((response) => {
      retrieveUsers();
      SuccessNotify("Thành Công");
    })
    .catch((e) => {
      console.log(e);
    });
  };
  return (
    <div className="user-list-admin">
      <div className="search-user">
        <form className="row justify-content-center">
          <input name="search" onChange={(e)=> setSearch(e.target.value)} class="form-control col-md-3 mr-2" type="search" placeholder="Search" aria-label="Search" />
        </form>
      </div>
      <div className="users-table">
        <table className="table table-bordered table-hover user-table mt-5">
          <thead className="table-primary">
            <tr>
              <th>STT</th>
              <th>Username</th>
              <th>Email</th>
              <th>FullName</th>
              <th>CreatedDate</th>
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
                  <td>{user.fullname || ""}</td>
                  {/* <td>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={updateDisabled(user)}
                    >
                      {user.disabled ? "Unlock" : "Lock"}
                    </button>
                  </td> */}
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    {/* <button type="button" class="btn btn-primary">
                      Edit
                    </button> */}
                    <button
                      type="button"
                      class={user.disabled ? "btn btn-success ml-2": "btn btn-danger ml-2"}
                      onClick={() => handleDisabled(user)}
                    >
                      {user.disabled ? "Unlock" : "Lock"}
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
