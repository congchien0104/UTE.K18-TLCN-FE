import axios from "axios";
import authHeader from "./auth-service";

const API_URL = "http://localhost:8080/";

const create = (id, data) => {
  return axios.post(API_URL + `lines/${id}`, data, {
    headers: authHeader(),
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create,
};
