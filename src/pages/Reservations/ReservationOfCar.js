import React, { useEffect, useState } from 'react';
import reactStars from 'react-rating-stars-component';
import { useParams } from 'react-router-dom';
import reservationService from '../../services/reservation.service';

function ReservationOfCar() {
    const { id } = useParams();
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        getReservation(id);
      }, [id]);
    const getReservation = (id) => {
        reservationService.getReservationsOfCar(id)
        .then((response) => {
            console.log(response.data)
        })
        .catch((e) => {
            console.log(e);
        });
    }

    return (
        <div>
             <div className="card-body">
                 con chien hoang minh
                  {/* <div className="list-group list-group-flush">
                    {feedbacks && (
                      feedbacks.map((feedback, index) => (
                        <a key={index} href="/" className="list-group-item list-group-item-action flex-column align-items-start">
                          <p className="feedback-username">{feedback.feedbacks.username}</p>
                          <reactStars
                            count={5}
                            value={feedback.rating}
                            size={18}
                            activeColor="#fb6e2e"
                          />
                          <p className="feedback-content">{feedback.content}</p>
                          <small className="feedback-time text-muted">{formatDate(feedback.createdAt)}</small>
                        </a>
                      ))
                    ) }
                  </div> */}
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