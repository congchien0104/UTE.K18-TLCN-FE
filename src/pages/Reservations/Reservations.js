import React, { useState, useEffect } from "react";
import reservationService from "../../services/reservation.service";

function Reservations(props) {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    retrieveReservations();
  }, []);

  const retrieveReservations = () => {
    reservationService
      .getReservations()
      .then((response) => {
        setReservations(response.data.data.reservations);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(reservations);

  return (
    <div>
      <h2>Reservations</h2>
    </div>
  );
}

export default Reservations;
