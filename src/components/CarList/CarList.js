import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarService from "../../services/car.service";
import Pagination from "react-responsive-pagination";
import CarModal from "../../Modals/CarModal";
import companyService from "../../services/company.service";

function CarList(props) {
  const [cars, setCars] = useState([]);
  const [line, setLine] = useState([]);
  //const [count, setCount] = useState();
  // const [totalPages, setTotalPage] = useState();
  // const [currentPage, setCurrentPage] = useState(1);

  // function handlePageChange(page) {
  //   setCurrentPage(page);
  //   // ... do something with `page`
  // }
  //const id = 37;
  useEffect(() => {
    retrieveCars();
  }, []);

  const retrieveCars = () => {
    companyService.getCompany()
      .then((response) => {
        //setCategories(response.data);
        setCars(response.data.data.result.company.cars);
        setLine(response.data.data.company.company.cars.lines);
        console.log(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(cars);
  return (
    <div className="car-list-admin">
      <div className="car-top-admin row">
        <div className="button-top col-md-2">
          <Link to={"/company/cars/2"} className="btn btn-primary">
            <i class="fas fa-plus"></i>  Tạo Xe
          </Link>
        </div>
      </div>
      <table className="table table-bordered table-hover car-table mt-5">
        <thead className="table-primary">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Name</th>
            <th scope="col">Plate Number</th>
            <th scope="col">Capacity</th>
            <th scope="col">Station</th>
            <th scope="col">CreatedDate</th>
            <th scope="col">Image</th>
            {/* <th scope="col">Details</th> */}
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {cars &&
            cars.map((car, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{car.name}</td>
                <td>{car.plate_number}</td>
                <td>{car.capacity}</td>
                <td>{car.station}</td>
                <td>{formatDate(car.createdAt)}</td>
                <td>
                  <div className="carlist-img"><img src={car.image} alt={car.name} /></div>
                </td>
                {/* <td><CarModal data={car}/></td> */}
                <td>
                  <Link to={`/cars/${car.id}`}>
                    <button type="button" class="btn btn-primary">
                      Cập Nhật Xe
                    </button>
                  </Link >
                  <Link to={`/company/cars/line/edit/${car.id}`}>
                    <button type="button" class="btn btn-warning">
                      Tuyến
                    </button>
                  </Link >
                  <Link to={`/company/cars/line2/edit/${car.id}`}>
                    <button type="button" class="btn btn-warning">
                      Tuyến Khứ Hồi
                    </button>
                  </Link >
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* <Pagination 
        total={Math.ceil(count/8)}
        current={currentPage}
        onPageChange={page => handlePageChange(page)}
      /> */}
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
export default CarList;
