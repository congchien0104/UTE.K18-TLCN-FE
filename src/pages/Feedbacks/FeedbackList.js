import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import feedbackService from "../../services/feedback.service";

function FeedbackList() {
  const { id } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    getFeedback(id);
  }, [id]);
  const getFeedback = (id) => {
    feedbackService
      .getFeedbackListCompany()
      .then((response) => {
        console.log(response.data);
        setFeedbacks(response.data.data.feedbackList.rows);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(feedbacks);
  return (
    <div>
      <div className="card-body">
        <div className="list-group list-group-flush">
          <table className="table table-bordered table-hover mt-5">
            <thead className="table-primary">
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Name</th>
                <th scope="col">Content</th>
                <th scope="col">Rating</th>
                <th scope="col">CreatedDate</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks &&
                feedbacks.map((feedback, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{feedback.feedbacks.username}</td>
                    <td>{feedback.content}</td>
                    <td>
                      <ReactStars
                        count={5}
                        value={feedback.rating}
                        size={24}
                        activeColor="#ffd700"
                      />
                    </td>
                    <td>{formatDate(feedback.createdAt)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
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

export default FeedbackList;
