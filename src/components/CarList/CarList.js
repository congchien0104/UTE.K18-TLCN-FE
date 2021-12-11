import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarService from "../../services/car.service";
import Pagination from "react-responsive-pagination";

function CarList(props) {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    retrieveCars();
    console.log(cars);
  }, []);

  const retrieveCars = () => {
    CarService.getCarList()
      .then((response) => {
        //setCategories(response.data);
        setCars(response.data.data.cars);
        console.log(response.data.data.cars);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="car-list-admin">
      <div className="car-top-admin row">
        <div className="button-top col-md-2">
          <Link to={"/cars/add"} className="btn btn-primary">
            <i class="fas fa-plus"></i>  Create Car
          </Link>
        </div>
        <div className="search-top col-md-10">
          <form className="row">
            <input
              className="form-control offset-3 col-md-3 mr-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>          
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
            <th scope="col">UpdatedDate</th>
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
                <td>{formatDate(car.updatedAt)}</td>
                <td>
                  <Link to={`/cars/${car.id}`}>
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
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination total={5} current={2} />
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
