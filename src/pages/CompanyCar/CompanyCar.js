import React, { useEffect, useState } from 'react';
import companyService from '../../services/company.service';

function CompanyCar() {
    const [cars, setCars] = useState([]);
  useEffect(() => {
    retrieveCompanies();
  }, []);

  const retrieveCompanies = () => {
    companyService.getCompany()
      .then((response) => {
        //setCategories(response.data);
        setCars(response.data.data.companies.cars);
        console.log(response.data.data.companies.cars);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(cars);
    return (
        <div>
            OKK em ơi
        </div>
    );
}

export default CompanyCar;