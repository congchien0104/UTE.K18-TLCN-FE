import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import companyService from '../../services/company.service';

function ReservationHome() {
    const [cars, setCars] = useState([]);
  //const [count, setCount] = useState();
  // const [totalPages, setTotalPage] = useState();
  // const [currentPage, setCurrentPage] = useState(1);

  // function handlePageChange(page) {
  //   setCurrentPage(page);
  //   // ... do something with `page`
  // }
  const id = 37;
  useEffect(() => {
    retrieveCars();
  }, []);

  const retrieveCars = () => {
    companyService.getCompany(id)
      .then((response) => {
        setCars(response.data.data.result.company.cars);
        console.log(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(cars);
    return (
        <div className='container'>
            <div className='row'>
            {
                cars.length > 0 ? (
                    (cars || []).map((car, index) => (
                        <div className='col-md-6'>
                            <div className="card" key={index}>
                                <img className="card-img-top" src={car.image} alt="ok"/>
                                <div className="card-body">
                                    <h5 className="card-title">{car.name}</h5>
                                    <Link to={`/company/reservations/${car.id}`} className="btn btn-primary">Xem Vé Đặt Của Xe</Link>
                                    <Link to={`/company/reservations/${car.id}`} className="btn btn-warning">Tạo Vé Đặt OFFLINE</Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Chưa có xe</p>
                )
            }
            </div>
        </div>
    );
}

export default ReservationHome;