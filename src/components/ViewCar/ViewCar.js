import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import CompanyService from "../../services/company.service";

function ViewCar(props) {
  const [cars, setCars] = useState([]);
  const { id } = useParams();
  let history = useHistory();
  const getCompany = (id) => {
    CompanyService.getCompany(id)
      .then((response) => {
        setCars(response.data.data.company.cars);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCompany(id);
  }, [id]);
  return (
    <div>
      {cars.map((car, index) => (
        <p key={index}>{car.name}</p>
      ))}
    </div>
  );
}

export default ViewCar;

