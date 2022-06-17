import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import companyService from "../../services/company.service";

function CompanyCarList(props) {
  const { id } = useParams();
  const [company, setCompany] = useState([]);
  useEffect(() => {
    retrieveCars();
  }, [id]);

  const retrieveCars = () => {
    companyService.getCompanyCarList(id)
      .then((response) => {
        setCompany(response.data.data.cars);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="car-list">
      <div className="container">
        <h1 className="heading-title">Nhà Xe {company.name}</h1>
        <div className="page-body">
          <div className="row">
            { (company?.cars || []).map((car, index) => (
              <div key={index} className="col-lg-3 col-md-4 mb-5">
                <div className="card">
                  <div className="carlist-img">
                    <img
                      className="card-img-top"
                      src={car.image}
                      alt={car.name}
                    />
                  </div>
                  <div className="card-body">
                    <div className="text-center">
                      <h2 className="car-name">{car?.plate_number}</h2>
                      <p1>Loại Xe: {car?.type}</p1><br/>
                      <p1>Số Chỗ: {car?.capacity}</p1><br/>
                      <p1>Tên XE: {car?.name}</p1><br/>
                    </div>
                  </div>
                  <div className="card-footer pb-4 border-top-0 bg-transparent">
                    <div className="text-center">
                      <Link to={`/cars/${car.id}`} className="btn btn-success">
                        Cập Nhật
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>        
        </div>
      </div>  
    </div>
  );
}

export default CompanyCarList;
