import axios from "axios";
import authHeader from "./auth-service";

const API_URL = "http://localhost:8080/";

const create = (id, data) => {
  return axios.post(API_URL + `lines/${id}`, data, {
    headers: authHeader(),
  });
};

const getLine = (id) => {
  return axios.get(API_URL + `lines/${id}?status=false`, {
    headers: authHeader(),
  });
};

const getLine2 = (id) => {
  return axios.get(API_URL + `lines/${id}?status=true`, {
    headers: authHeader(),
  });
};

const update = (id, data) => {
  return axios.put(API_URL + `lines/${id}`, data, {
    headers: authHeader(),
  });
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create,
  getLine,
  getLine2,
  update
};
