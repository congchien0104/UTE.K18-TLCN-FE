import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      {/* <Link to={"/company/add"} className="nav-link">
        Create Company
      </Link> */}
      <table className="table mt-5">
        <thead className="thead-dark">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">CreatedDate</th>
            <th scope="col">Car List</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {companies &&
            companies.map((company, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{company.name}</td>
                <td>0{company.phone}</td>
                <td>{company.address}</td>
                <td>{company.createdAt}</td>
                <td>
                  <Link to={`/companies/view/${company.id}`}>
                    <button type="button" class="btn btn-warning">
                      View
                    </button>
                  </Link>
                </td>
                <td>
                  <Link to={`/company/cars/${company.id}`}>
                    <button type="button" class="btn btn-success">
                      Create
                    </button>
                  </Link>
                  {/* <Link to={`/companies/${company.id}`}>
                    <button type="button" class="btn btn-primary">
                      Edit
                    </button>
                  </Link>
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
                  </button> */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompanyList;