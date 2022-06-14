import React, { useEffect, useState } from "react";
import reactStars from "react-rating-stars-component";
import { Link, useParams } from "react-router-dom";
import Pagination from "react-responsive-pagination";
import reservationService from "../../services/reservation.service";

function ReservationOfCar() {
  const { id } = useParams();
  const [reservations, setReservations] = useState([]);
  const [count, setCount] = useState();
  const [totalPages, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    getReservation(id);
  }, [id, currentPage]);
  const getReservation = (id) => {
    reservationService
      .getReservationList(id, currentPage)
      .then((response) => {
        setCount(response.data.data.reservation.count);
        setReservations(response.data.data.reservation.rows);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    reservationService.getSearchReservation(id, currentPage, search)
    .then((response) => {
      //setCategories(response.data);
      setCount(response.data.data.reservation.count);
      setReservations(response.data.data.reservation.rows);
    })
    .catch((e) => {
      console.log(e);
    });
  }, [id, search, currentPage]);

  // hanlde search reservation_date

  return (
    <div>
      <div className="card-body">
        <div className="search-user">
          <form className="row justify-content-center">
            <input name="search" onChange={(e)=> setSearch(e.target.value)} class="form-control col-md-3 mr-2" type="search" placeholder="Tìm kiếm" aria-label="Search" />
          </form>
        </div>
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
              <th scope="col">Bắt Đầu</th>
              <th scope="col">Kết Thúc</th>
              <th scope="col">Nơi Đón</th>
              <th scope="col">Nơi Trả</th>
              <th scope="col">Tên Xe</th>
              <th scope="col">Biển Số</th>
            </tr>
          </thead>
          <tbody>
            {reservations &&
              (reservations || []).map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.fullname}</td>
                  <td>{item.receipt_number}</td>
                  <td>{formatDate(item.reservation_date)}</td>
                  <td>{item.quantity}</td>
                  <td>{item.position}</td>
                  <td>{item.cars.lines[0].start}</td>
                  <td>{item.cars.lines[0].destination}</td>
                  <td>{item.pickup_place}</td>
                  <td>{item.dropoff_place}</td>
                  <td>{item.cars.name}</td>
                  <td>{item.cars.plate_number}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination 
        total={Math.ceil(count/8)}
        current={currentPage}
        onPageChange={page => handlePageChange(page)}
      />
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
