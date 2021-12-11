import React from "react";
import CompanyList from "../../components/CompanyList/CompanyList";

function Companies(props) {
  return (
    <div className="companies-admin">
      <h1 className="title-page">Company List</h1>
      <CompanyList />
    </div>
  );
}

export default Companies;
