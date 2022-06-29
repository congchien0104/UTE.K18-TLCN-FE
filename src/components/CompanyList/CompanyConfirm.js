import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import companyService from "../../services/company.service";
import authService from "../../services/auth.service";
import { SuccessNotify } from "../../utils/Notify";

function CompanyConfirm(props) {
    
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
      retrieveCompanies();
      console.log(companies);
    }, []);
  
    const retrieveCompanies = () => {
      companyService.getCompanyList()
        .then((response) => {
          //setCategories(response.data);
          setCompanies(response.data.data.listConfirm);
          console.log(response.data.data.listConfirm);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const handleConfirm = (id) => {
        companyService.accept(id)
        .then((response) => {
            SuccessNotify("Xét duyệt thành công")
            retrieveCompanies()
            console.log(response.data.data);
        })
        .catch((e) => {
        console.log(e);
        });
    }

  return (
    <div className="car-list">
      <div className="container">
        <h1 className="heading-title">Danh sách nhà xe chờ xét duyện</h1>
        <div className="page-body">
          <div className="row">
            { (companies || []).map((item, index) => (
              <div key={index} className="col-lg-3 col-md-4 mb-5">
                <div className="card">
                  <div className="carlist-img">
                    <img
                      className="card-img-top"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="card-body">
                    <div className="text-center">
                      <h2 className="car-name">{item.name}</h2>
                      <p1>Số điện thoại: 0{item?.phone}</p1><br/>
                      <p1>Email: {item?.email}</p1><br/>
                      <p1>Địa chỉ: {item?.address}</p1><br/>
                    </div>
                  </div>
                  <div className="card-footer pb-4 border-top-0 bg-transparent">
                    <div className="text-center">
                        <button type="button" class="btn btn-success" onClick={() => handleConfirm(item.id)}>
                         Xác Nhận
                        </button>
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

export default CompanyConfirm;
