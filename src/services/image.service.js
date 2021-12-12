import axios from "axios";

const API_URL = "http://localhost:8080/";

const upload = (data) => {
  return axios.post(API_URL + "upload", data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  upload,
};
