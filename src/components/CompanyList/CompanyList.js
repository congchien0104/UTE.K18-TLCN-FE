import React, { useState, useEffect } from "react";
import CompanyService from "../../services/company.service";

function CompanyList(props) {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    retrieveCompanies();
    console.log(companies);
  }, []);

  const retrieveCompanies = () => {
    CompanyService.getCompanyList()
      .then((response) => {
        //setCategories(response.data);
        setCompanies(response.data.data.companies);
        console.log(response.data.data.companies);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <h2>Company List</h2>
    </div>
  );
}

export default CompanyList;
