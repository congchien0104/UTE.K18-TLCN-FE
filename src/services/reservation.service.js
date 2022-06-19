import axios from "axios";
import authHeader from "../services/auth-service";

const API_URL = "http://localhost:8080/";

const getReservations = (page) => {
  return axios.get(API_URL + `reservations?page=${page}`, {
    headers: authHeader(),
  });
};

const getReservationsOfCar = (id) => {
  return axios.get(API_URL + `reservations/${id}`, {
    headers: authHeader(),
  });
};

const getTotal = () => {
  return axios.get(API_URL + 'payments/total', {
    headers: authHeader(),
  });
}

const getReservationList = (page) => {
  return axios.get(API_URL + `reservations?page=${page}`, {
    headers: authHeader(),
  });
};

const getSearchReservation = (id, page,search) => {
  return axios.get(API_URL + `reservations/${id}?page=${page}&search=${search}`, {
    headers: authHeader(),
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getReservations,
  getReservationsOfCar,
  getTotal,
  getReservationList,
  getSearchReservation,
};
