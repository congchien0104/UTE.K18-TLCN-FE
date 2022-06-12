import React, { useEffect, useState } from "react";
import reservationService from "../../services/reservation.service";
import { SuccessNotify } from "../../utils/Notify";

function Statistical() {

    const [total, setTotal] = useState(0);
    const [totalCars, setTotalCars] = useState([]);
  
  const getTotalAmount = () => {
    reservationService.getTotal()
    .then((res) => {
        console.log(res.data);
        setTotal(res?.data?.data.total);
        setTotalCars(res?.data?.data?.totalAmountOfCar);
    })
    .catch((e) => {
        console.log(e);
    });
  }

  useEffect(() => {
    getTotalAmount();
  }, []);
  return (
    <div className="container mt-5">
      <h2>Tổng doanh thu đạt được trên trang web: {total} VND</h2>
      <h3>Thứ hạng bán vé của từng xe:</h3>
      <div class="tickets-list row" style={{ "height": "44rem", "overflow": "hidden", "overflowY": "scroll" }}>
        {
            ( totalCars.reverse()|| []).map((item, index) => (
              <div class="col-6 mt-0 mb-4">
                <div class="card">
                  <div class="card-body">
                    <figure style={{ "width": "20rem", "height": "10rem", "overflow": "hidden", "marginLeft": "auto", "marginRight": "auto" }}>
                      <img src={item.cars.image} style={{ "width": "100%", "height": "100%", "objectFit": "cover" }} alt="..." />
                    </figure>
                    <p className="card-title fs-4 text-center fw-bolder mb-2">Nhà xe {item.total_amount}</p>
                    {/* <p className="card-text mb-2">Tuyến: {item?.cars?.station} - {item?.cars.station_to}</p>
                    <p className="card-text mb-2">Ngày đi: {formatDate(item.reservation_date, 1)}</p>
                    <p className="card-text mb-2">Người đặt vé: {item.fullname}</p>
                    <p className="card-text mb-2">Số điện thoại: {item.phone}</p>
                    <p className="card-text mb-2">Tổng Tiền: {moneyFormatter(item.amount)}</p>
                    <div>
                      <button className="btn-danger" onClick={ () => handleCancel(item.id)}>Huy</button>
                    </div> */}
                  </div>
                </div>
              </div>
            ))
            }
        </div>
    </div>
  );
}

export default Statistical;
