import React, { useEffect, useState } from "react";
import reservationService from "../../services/reservation.service";
import { SuccessNotify } from "../../utils/Notify";
import { CChart } from '@coreui/react-chartjs';

function StatisticalCompany() {

    const [total, setTotal] = useState(0);
    const [totalListCar, setTotalListCar] = useState([]);
  
  const getTotalAmount = () => {
    reservationService.getTotalCompanyOfCar()
    .then((res) => {
        console.log(res.data);
        setTotal(res?.data?.data?.total);
        setTotalListCar(res?.data?.data?.totalListCar);
    })
    .catch((e) => {
        console.log(e);
    });
  }

  const labels = (totalListCar.reverse() || []).map(item => item?.cars.plate_number);
  const data = (totalListCar.reverse() || []).map(item => item?.total_amount);

  useEffect(() => {
    getTotalAmount();
  }, []);
  return (
    <div className="container mt-5">
      <h2 className="text-primary fw-bold">Tổng doanh thu đạt của nhà xe trên website: { moneyFormatter(total) }</h2>
      <CChart
        type="bar"
        data={{
          labels: labels,
          datasets: [
            {
              label: 'Doanh Thu',
              backgroundColor: 'green',
              data: data,
            },
          ],
        }}
        labels="months"
      />
    </div>
  );
}

const moneyFormatter = (money) => {
  if (!money) money = 0;
  const result = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
  }).format(money);
  return result;
};

export default StatisticalCompany;
