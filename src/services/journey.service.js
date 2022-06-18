import axios from "axios";
import authHeader from "./auth-service";

const API_URL = "http://localhost:8080/";

const create = (data) => {
  return axios.post(API_URL + `journeys`, data, {
    headers: authHeader(),
  });
};

const createJourney = (data) => {
    return axios.post(API_URL + `journeys/add`, data, {
      headers: authHeader(),
    });
};

const updateJourney = (id, data) => {
    return axios.put(API_URL + `journeys/${id}`, data, {
      headers: authHeader(),
    });
};

const getJourneys = (id) => {
    return axios.get(API_URL + `journeys/${id}`, {
      headers: authHeader(),
    });
};

const deleteJourney = (id) => {
    return axios.delete(API_URL + `journeys/${id}`, {
      headers: authHeader(),
    });
};




// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getJourneys,
  create,
  createJourney,
  updateJourney,
  deleteJourney,
};
