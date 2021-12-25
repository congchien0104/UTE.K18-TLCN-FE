import React, { useState, useEffect } from "react";
import reservationService from "../../services/reservation.service";
import Pagination from "react-responsive-pagination";

function Reservations(props) {
  const [reservations, setReservations] = useState([]);
  const [count, setCount] = useState();
  const [totalPages, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    retrieveReservations();
  }, [currentPage]);

  const retrieveReservations = () => {
    reservationService
      .getReservations(currentPage)
      .then((response) => {
        setReservations(response.data.data.reservations.rows);
        setCount(response.data.data.reservations.count);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(reservations);

  return (
    <div className="feedback-admin">
      <h1 className="title-page">Manage Feedbacks</h1>      
      {/* <div className="search-feedback">
        <form className="row justify-content-center">
          <input class="form-control col-md-3 mr-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>
      </div> */}
      <div className="feedback-table">
        <table className="table table-bordered table-hover mt-5">
          <thead className="table-primary">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Car</th>
              <th scope="col">CreatedDate</th>
            </tr>
          </thead>
          <tbody>
            {reservations &&
              reservations.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.fullname}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.carId}</td>
                  <td>{formatDate(item.createdAt)}</td>
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

  return [day, month, year].join("/");
};

export default Reservations;
