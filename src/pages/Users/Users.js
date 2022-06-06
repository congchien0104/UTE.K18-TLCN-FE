import React from "react";
import UserList from "../../components/UserList/UserList";

function Users(props) {
  return (
    <div className="container-fluid">
      <h2 className="text-center mb-4">Danh sách người dùng</h2>
      <UserList />
    </div>
  );
}

export default Users;
