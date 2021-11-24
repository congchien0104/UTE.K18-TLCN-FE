import axios from "axios";
import authHeader from "../services/auth-service";

const API_URL = "http://localhost:8080/";

const getCompanyList = () => {
  return axios.get(API_URL + "companies", {
    headers: authHeader(),
  });
};

const createCar = (id, data) => {
  console.log(id);
  return axios.post(API_URL + `companies/cars/${id}`, data, {
    headers: authHeader(),
  });
};

const getCompany = (id) => {
  return axios.get(API_URL + `companies/${id}`, {
    headers: authHeader(),
  });
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCompanyList,
  createCar,
  getCompany,
};
