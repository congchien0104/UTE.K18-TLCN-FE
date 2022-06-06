import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarService from "../../services/car.service";

function CarList(props) {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    retrieveCars();
  }, []);
  // console.log(cars.rows)
  const retrieveCars = () => {
    CarService.getCarList()
      .then((response) => {
        //setCategories(response.data);
        setCars(response.data.data.cars);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <Link to={"/cars/add"} className="nav-link">
        Create Car
      </Link>
      <table className="table mt-5">
        <thead className="thead-dark">
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
          {cars.rows &&
            cars.rows.map((car, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{car.name}</td>
                <td>{car.plate_number}</td>
                <td>{car.capacity}</td>
                <td>{car.station}</td>
                <td>{car.createdAt}</td>
                <td>{car.updatedAt}</td>
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
    </div>
  );
}

export default CarList;
