import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import feedbackService from "../../services/feedback.service";
import Pagination from "react-responsive-pagination";

function Feedbacks(props) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [count, setCount] = useState();
  const [totalPages, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(page) {
    setCurrentPage(page);
    // ... do something with `page`
  }
  
  useEffect(() => {
    retrieveFeedbacks();
    console.log(feedbacks);
  }, [currentPage]);

  const retrieveFeedbacks = () => {
    feedbackService
      .getFeedbacks(currentPage)
      .then((response) => {
        //setCategories(response.data);
        setFeedbacks(response.data.data.feedbacks.rows);
        setCount(response.data.data.feedbacks.count);
        console.log(response.data.data.feedbacks.count);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

export default Feedbacks;
