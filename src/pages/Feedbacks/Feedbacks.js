import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import feedbackService from "../../services/feedback.service";
import Pagination from "react-responsive-pagination";

function Feedbacks(props) {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    retrieveFeedbacks();
    console.log(feedbacks);
  }, []);

  const retrieveFeedbacks = () => {
    feedbackService
      .getFeedbacks()
      .then((response) => {
        //setCategories(response.data);
        setFeedbacks(response.data.data.feedbacks);
        console.log(response.data.data.feedbacks);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h2>Manage Feedbacks</h2>
      <form class="form-inline">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      <table className="table mt-5">
        <thead className="thead-dark">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Name</th>
            <th scope="col">Content</th>
            <th scope="col">Rating</th>
            <th scope="col">Car</th>
            <th scope="col">CreatedDate</th>
            <th scope="col">UpdatedDate</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks &&
            feedbacks.map((feedback, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{feedback.userId}</td>
                <td>{feedback.content}</td>
                <td>
                  <ReactStars
                    count={5}
                    value={feedback.rating}
                    size={24}
                    activeColor="#ffd700"
                  />
                </td>
                <td>{feedback.carId}</td>
                <td>{formatDate(feedback.createdAt)}</td>
                <td>{formatDate(feedback.updatedAt)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination total={5} current={2} />
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

export default Feedbacks;
