import React from "react";
import CompanyList from "../../components/CompanyList/CompanyList";

function Companies(props) {
  return (
    <div>
      <h2 className="text-primary">Danh sách công ty</h2>
      <CompanyList />
    </div>
  );
}

export default Companies;
