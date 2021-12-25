import React, { useEffect, useState } from 'react';
import reactStars from 'react-rating-stars-component';
import { useParams } from 'react-router-dom';
import feedbackService from '../../services/feedback.service';

function FeedbackOfCar() {
    const { id } = useParams();
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        getFeedback(id);
      }, [id]);
    const getFeedback = (id) => {
        feedbackService.getFeedbackOfCar(id)
        .then((response) => {
            console.log(response.data)
            setFeedbacks(response.data.data.feedback.feedbacks)
        })
        .catch((e) => {
            console.log(e);
        });
    }
    console.log(feedbacks)
    return (
        <div>
             <div className="card-body">
                  <div className="list-group list-group-flush">
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
                  </div>
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

export default FeedbackOfCar;