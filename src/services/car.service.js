import axios from "axios";
import authHeader from "../services/auth-service";

const API_URL = "http://localhost:8080/";

const getCarList = (page) => {
  return axios.get(API_URL + `cars?page=${page}`, {
    headers: authHeader(),
  });
};

const getCar = (id) => {
  return axios.get(API_URL + `cars/${id}`, {
    headers: authHeader(),
  });
};

const create = (data) => {
  return axios.post(API_URL + "cars", data, {
    headers: authHeader(),
  });
};

const update = (id, data) => {
  return axios.put(API_URL + `cars/${id}`, data, {
    headers: authHeader(),
  });
};

const getCarListCompany = () => {
  return axios.get(API_URL + `cars/company/temp`, {
    headers: authHeader(),
  });
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCarList,
  getCar,
  create,
  update,
  getCarListCompany,
};
