import React, { useEffect, useState } from "react";
import reactStars from "react-rating-stars-component";
import { Link, useParams } from "react-router-dom";
import Pagination from "react-responsive-pagination";
import reservationService from "../../services/reservation.service";
import authService from "../../services/auth.service";

function ReservationList() {

  const [reservations, setReservations] = useState([]);
  const [count, setCount] = useState();
  const [totalPages, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    getReservation(currentPage, search);
  }, [currentPage, search]);
  const getReservation = (currentPage) => {
    reservationService
      .getReservationList(currentPage, search)
      .then((response) => {
        setCount(response.data.data.reservationList.count);
        setReservations(response.data.data.reservationList.rows);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

//   useEffect(() => {
//     reservationService.getSearchReservation(id, currentPage, search)
//     .then((response) => {
//       //setCategories(response.data);
//       setCount(response.data.data.reservation.count);
//       setReservations(response.data.data.reservation.rows);
//     })
//     .catch((e) => {
//       console.log(e);
//     });
//   }, [id, search, currentPage]);

  // hanlde search reservation_date

  return (
    <div>
      <div className="card-body">
        <div className="search-user">
          <form className="row justify-content-center">
            <input name="search" onChange={(e)=> setSearch(e.target.value)} class="form-control col-md-3 mr-2" type="search" placeholder="Tìm kiếm" aria-label="Search" />
          </form>
        </div>
        {/* <Link to={`ticketbooking/${car.id}?date=${date}`}>
                                <button className="btn btn-primary fw-bolder">Đặt ngay</button>
                              </Link> */}
        {/* <p>Số lượng vé đã bán: {reservations.length}</p> */}
        <table className="table table-bordered table-hover car-table mt-5" style={{"height":"auto"}}>
          <thead className="table-primary">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Họ và Tên</th>
              <th scope="col">Mã Vé</th>
              <th scope="col">Ngày Đặt</th>
              <th scope="col">Số Lượng</th>
              <th scope="col">Vị Trí</th>
              <th scope="col">Mốc thời gian</th>
              <th scope="col">Nơi Đón Trả</th>
              <th scope="col">Tên Xe</th>
              <th scope="col">Biển Số</th>
              <th scope="col">Số Tiền</th>
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
                  <td>{item.cars.lines[0].start} - {item.cars.lines[0].destination}</td>
                  <td>{item.pickup_place} - {item.dropoff_place}</td>
                  <td>{item.cars.name}</td>
                  <td>{item.cars.plate_number}</td>
                  <td>{moneyFormatter(item.paid_amount)}</td>
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

const moneyFormatter = (money) => {
  if (!money) money = 0;
  const result = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
  }).format(money);
  return result;
};

export default ReservationList;
