import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompanyService from "../../services/company.service";

function CompanyList(props) {
  // const [companies, setCompanies] = useState([]);
  // useEffect(() => {
  //   retrieveCompanies();
  //   console.log(companies);
  // }, []);
  const companies = [
    {
      name: "a",
      phone: 84,
      address: "asdfghjkl",
      createdAt: "20:10:10"
    },
    {
      name: "a",
      phone: 84,
      address: "asdfghjklqưertyujjklsdfghjkl",
      createdAt: "20:10:10"
    },
    {
      name: "a",
      phone: 84,
      address: "asdfghjkl",
      createdAt: "20:10:10"
    },
    {
      name: "a",
      phone: 84,
      address: "asdfghjkl",
      createdAt: "20:10:10"
    },]
    const handleModal = (data) =>{
      console.log(data.index)
    }
  // const retrieveCompanies = () => {
  //   CompanyService.getCompanyList()
  //     .then((response) => {
  //       //setCategories(response.data);
  //       setCompanies(response.data.data.companies);
  //       console.log(response.data.data.companies);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
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
                <td>{company.createdAt}</td>
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
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={handleModal}>
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

export default CompanyList;
