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

  const handleAccept = (id) => {
    const data = new FormData();
    data.append("disabled", false);
    CompanyService.accept(id, data)
      .then((response) => {
        retrieveCompanies();
        console.log(response.data.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div className="company-list-admin">
      <Link to={"/company/add"} className="btn btn-primary btn-create">
        <i class="fas fa-plus"></i>  Create Company
      </Link>
      <table className="table table-bordered table-hover company-table">
        <thead className="table-primary">
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Image</th>
            <th>State</th>
            <th>CreatedDate</th>
            <th>Car List</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {companies &&
            companies.map((company, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{company.name}</td>
                <td>{company.phone}</td>
                <td>{company.address}</td>
                <td>
                  <div className="carlist-img"><img src={company.image} alt={company.name} /></div>
                </td>
                <td>
                  {company.disabled ? ( <button className="btn btn-warning" onClick={ ()=> handleAccept(company.id)}>Accept</button> ) : 
                    (
                      <button className="btn btn-primary">Confirmed</button>
                    )
                  }
                </td>
                <td>{formatDate(company.createdAt)}</td>
                <td>
                  <Link to={`/companies/view/${company.id}`}>
                    <button
                      type="button"
                      class="btn btn-warning">
                      View
                    </button>
                  </Link>
                </td>
                <td>
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                    Details {index + 1}
                  </button>
                  
                  <Link to={`/companies/cars/${company.id}`}>
                    <button
                      type="button"
                      class="btn btn-success ml-2">
                      Create
                    </button>
                  </Link>
                  <Link to={`/companies/${company.id}`}>
                    <button
                      type="button"
                      class="btn btn-primary ml-2">
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
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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

export default CompanyList;
