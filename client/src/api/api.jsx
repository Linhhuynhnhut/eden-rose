import axiosClient from "./axiosClient";

export const api = {
  //GET
  getMenu: (params) => {
    const url = "dish";
    return axiosClient.get(url, params);
  },
  getDishTypes: (params) => {
    const url = "dish-type";
    return axiosClient.get(url, params);
  },
  getHallTypes: (params) => {
    const url = "hall-type";
    return axiosClient.get(url, params);
  },

  //POST******************************************************
  postHallType: (payload) => {
    const url = "hall-type";
    return axiosClient.post(url, payload);
  },
  postShift: (payload) => {
    const url = "shift";
    return axiosClient.post(url, payload);
  },
  postDishType: (payload) => {
    const url = "dish-type";
    return axiosClient.post(url, payload);
  },
  postDish: (payload) => {
    const url = "dish";
    return axiosClient.post(url, payload);
  },

  //PUT***************************
  putHallType: (id, payload) => {
    const url = "hall-type/" + String(id);
    return axiosClient.put(url, payload);
  },
  putShift: (id, payload) => {
    const url = "shift/" + String(id);
    return axiosClient.put(url, payload);
  },
  putDishType: (id, payload) => {
    const url = "dish-type/" + String(id);
    return axiosClient.put(url, payload);
  },
  putParam: (id, payload) => {
    const url = "param/" + String(id);
    return axiosClient.put(url, payload);
  },
  putDish: (id, payload) => {
    const url = "dish/" + String(id);
    return axiosClient.put(url, payload);
  },

  //DELETE*****************************
  deleteSubject: (id) => {
    const url = "subject/" + String(id);
    return axiosClient.delete(url);
  },
};
