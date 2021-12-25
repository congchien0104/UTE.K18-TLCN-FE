import axios from "axios";
import authHeader from "../services/auth-service";

const API_URL = "http://localhost:8080/api/admin/";

const getUserList = (page) => {
  return axios.get(API_URL + `users?page=${page}`, {
    headers: authHeader(),
  });
};

const getSearchUser = (page,search) => {
  return axios.get(API_URL + `users/search?page=${page}&search=${search}`, {
    headers: authHeader(),
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUserList,
  getSearchUser,
};
