import axios from "axios";
import authHeader from "../services/auth-service";

const API_URL = "http://localhost:8080/";

const getReservations = (page) => {
  return axios.get(API_URL + `reservations?page=${page}`, {
    headers: authHeader(),
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getReservations,
};
