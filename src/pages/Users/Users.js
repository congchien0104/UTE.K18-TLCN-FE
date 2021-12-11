import React from "react";
import UserList from "../../components/UserList/UserList";

function Users(props) {
  return (
    <div className="users-admin">
      <h1 className="title-page">User List</h1>
      <UserList />
    </div>
  );
}

export default Users;
