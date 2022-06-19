import axios from "axios";
import authHeader from "../services/auth-service";

const API_URL = "http://localhost:8080/";

const getFeedbacks = (page) => {
  return axios.get(API_URL + `feedbacks?page=${page}`, {
    headers: authHeader(),
  });
};

const getFeedbackListCompany = () => {
  return axios.get(API_URL + `feedbacks`, {
    headers: authHeader(),
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getFeedbacks,
  getFeedbackListCompany
};
