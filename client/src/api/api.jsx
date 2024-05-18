import axiosClient from "./axiosClient";

export const api = {
  //GET
  getAStudentInfo: (ID, params) => {
    const url = "student/" + String(ID);
    return axiosClient.get(url, params);
  },
  getStudentInfoArr: (params) => {
    const url = "student";
    return axiosClient.get(url, params);
  },
  getDishes: (params) => {
    const url = "dish";
    return axiosClient.get(url, params);
  },
  getHallTypes: (params) => {
    const url = "hall-type";
    return axiosClient.get(url, params);
  },

  //POST******************************************************
  postStudentInfo: (payload) => {
    const url = "student";
    return axiosClient.post(url, payload);
  },

  //PUT***************************
  putSubject: (id, payload) => {
    const url = "subject/" + String(id);
    return axiosClient.put(url, payload);
  },

  //DELETE*****************************
  deleteSubject: (id) => {
    const url = "subject/" + String(id);
    return axiosClient.delete(url);
  },
};
