import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import carService from '../../services/car.service';

function CarListCompany() {
    const [cars, setCars] = useState([]);
  useEffect(() => {
    retrieveCarList();
  }, []);

  const retrieveCarList = () => {
    carService.getCarListCompany()
      .then((response) => {
        setCars(response.data.data.carList);
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
        <h1 className="heading-title">Nhà Xe ...</h1>
        <div className="page-body">
          <div className="row">
            { (cars || []).map((car, index) => (
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

export default CarListCompany;