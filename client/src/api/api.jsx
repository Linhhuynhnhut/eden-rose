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
  getHalls: (params) => {
    const url = "hall";
    return axiosClient.get(url, params);
  },
  getShifts: (params) => {
    const url = "shift";
    return axiosClient.get(url, params);
  },
  getHallTypes: (params) => {
    const url = "hall-type";
    return axiosClient.get(url, params);
  },
  getStatuses: (params) => {
    const url = "status";
    return axiosClient.get(url, params);
  },
  getServices: (params) => {
    const url = "service";
    return axiosClient.get(url, params);
  },

  //POST******************************************************
  postHall: (payload) => {
    const url = "hall";
    return axiosClient.post(url, payload);
  },
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
  postService: (payload) => {
    const url = "service";
    return axiosClient.post(url, payload);
  },

  //PUT***************************
  putHall: (id, payload) => {
    const url = "hall/" + String(id);
    return axiosClient.put(url, payload);
  },
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
  putService: (id, payload) => {
    const url = "service/" + String(id);
    return axiosClient.put(url, payload);
  },

  //DELETE*****************************
  deleteSubject: (id) => {
    const url = "subject/" + String(id);
    return axiosClient.delete(url);
  },
};
