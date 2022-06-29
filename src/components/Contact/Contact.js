import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import contactService from "../../services/contact.service";
import feedbackService from "../../services/feedback.service";

function Contact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getFeedback();
  }, []);
  const getFeedback = () => {
    contactService.getContactList()
      .then((response) => {
        setContacts(response.data.data.contactList);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <div className="card-body">
        <div className="list-group list-group-flush">
          <table className="table table-bordered table-hover mt-5">
            <thead className="table-primary">
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Họ và Tên</th>
                <th scope="col">Chủ Đề</th>
                <th scope="col">Nội Dung</th>
                <th scope="col">Ngày Đến</th>
              </tr>
            </thead>
            <tbody>
              {contacts &&
                contacts.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.fullname}</td>
                    <td>{item.subject}</td>
                    <td>{item.message}</td>
                    <td>{formatDate(item.createdAt)}</td>
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

  return [day, month, year].join("-");
};

export default Contact;
