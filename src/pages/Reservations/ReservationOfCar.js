import React, { useEffect, useState } from "react";
import reactStars from "react-rating-stars-component";
import { Link, useParams } from "react-router-dom";
import reservationService from "../../services/reservation.service";

function ReservationOfCar() {
  const { id } = useParams();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getReservation(id);
  }, [id]);
  const getReservation = (id) => {
    reservationService
      .getReservationsOfCar(id)
      .then((response) => {
        setReservations(response.data.data.reservation);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="card-body">
        <p>Số lượng vé đã bán: {reservations.length}</p>
        <table className="table table-bordered table-hover car-table mt-5">
          <thead className="table-primary">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Họ và Tên</th>
              <th scope="col">Mã Vé</th>
              <th scope="col">Ngày Đặt</th>
              <th scope="col">Số Lượng</th>
              <th scope="col">Vị Trí</th>
            </tr>
          </thead>
          <tbody>
            {reservations &&
              reservations.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.fullname}</td>
                  <td>{item.receipt_numbe}</td>
                  <td>{formatDate(item.reservation_date)}</td>
                  <td>{item.quantity}</td>
                  <td>{item.position}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
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

  return [year, month, day].join("-");
};

export default ReservationOfCar;
