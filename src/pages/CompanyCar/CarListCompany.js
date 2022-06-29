import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import carService from '../../services/car.service';

function CarListCompany() {
    const [cars, setCars] = useState([]);
    const [company, setCompany] = useState([]);
  useEffect(() => {
    retrieveCarList();
  }, []);

  const retrieveCarList = () => {
    carService.getCarListCompany()
      .then((response) => {
        setCars(response.data.data.carList);
        setCompany(response.data.data.company);
        console.log(response.data.data.carList);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(cars);
    return (
      <div className="car-list">
      <div className="container">
        <h1 className="heading-title text-primary">Nhà Xe {company?.name}</h1>
        <Link className="btn btn-success" to={`/company/cars/${company.id}`}>
            Tạo Xe
        </Link>
        <div className="page-body">
          <div className="row">
            { (cars || []).map((car, index) => (
              <div key={index} className="col-lg-3 col-md-4 mb-5">
                <div className="card">
                  <div className="card-body">
                    <figure style={{"minHeight":"10rem"}}>
                      <img
                        width="100%"
                        src={car.image}
                        alt={car.name}
                      />
                    </figure>
                    <div>
                      <h4 className="text-center text-primary">{car?.plate_number}</h4>
                      <p>Loại Xe: {car?.type}</p>
                      <p>Số Chỗ: {car?.capacity}</p>
                      <p>Tên Xe: {car?.name}</p>
                    </div>
                  </div>
                  <div className="card-footer pb-4 border-top-0 bg-transparent">
                    <div className="text-center">
                      <Link to={`/cars/${car.id}`} className="btn btn-success">
                        Cập Nhật
                      </Link>
                      <Link to={`ticketbooking/${car.id}`}>
                        <button className="btn btn-primary fw-bolder ms-3">Đặt ngay</button>
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

export default CarListCompany;