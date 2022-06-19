import React, { useEffect, useState } from "react";
import reservationService from "../../services/reservation.service";
import { SuccessNotify } from "../../utils/Notify";
import { CChart } from '@coreui/react-chartjs';

function Statistical() {

    const [total, setTotal] = useState(0);
    const [totalCompanies, setTotalCompanies] = useState([]);
  
  const getTotalAmount = () => {
    reservationService.getTotal()
    .then((res) => {
        console.log(res.data);
        setTotal(res?.data?.data.total);
        setTotalCompanies(res?.data?.data?.amountOfCompany);
    })
    .catch((e) => {
        console.log(e);
    });
  }

  const labels = (totalCompanies.reverse() || []).map(item => item?.company?.name);
  const data = (totalCompanies.reverse() || []).map(item => item?.total_amount);

  useEffect(() => {
    getTotalAmount();
  }, []);
  return (
    <div className="container mt-5">
      <h2>Tổng doanh thu đạt được trên trang web: {total} VND</h2>
      <CChart
        type="bar"
        data={{
          labels: labels,
          datasets: [
            {
              label: 'Doanh Thu',
              backgroundColor: '#f87979',
              data: data,
            },
          ],
        }}
        labels="months"
      />
    </div>
  );
}

export default Statistical;
