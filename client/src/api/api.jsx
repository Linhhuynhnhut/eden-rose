import axiosClient from "./axiosClient";

export const api = {
  //GET
  getBill: (params) => {
    const url = "bill";
    return axiosClient.get(url, params);
  },
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
  getReservations: (params) => {
    const url = "reservationForm";
    return axiosClient.get(url, params);
  },
  getReservationsById: (id, payload) => {
    const url = "reservationForm/" + String(id);
    return axiosClient.get(url, payload);
  },
  getParams: (params) => {
    const url = "param";
    return axiosClient.get(url, params);
  },
  getFoodDetails: (params) => {
    const url = "dish-detail";
    return axiosClient.get(url, params);
  },
  getServiceDetails: (params) => {
    const url = "service-detail";
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
  postDishDetail: (payload) => {
    const url = "dish-detail";
    return axiosClient.post(url, payload);
  },
  postService: (payload) => {
    const url = "service";
    return axiosClient.post(url, payload);
  },
  postServiceDetail: (payload) => {
    const url = "service-detail";
    return axiosClient.post(url, payload);
  },
  postReservations: (params) => {
    const url = "reservationForm";
    return axiosClient.post(url, params);
  },
  postBill: (payload) => {
    const url = "bill";
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
  putServiceDetail: (id, payload) => {
    const url = "service-detail/";
    return axiosClient.put(url, payload);
  },

  putReservationForm: (id, payload) => {
    const url = "reservationForm/" + String(id);
    return axiosClient.put(url, payload);
  },

  //DELETE*****************************
  deleteShift: (id) => {
    const url = "shift/" + String(id);
    return axiosClient.delete(url);
  },
  deleteHall: (id) => {
    const url = "hall/" + String(id);
    return axiosClient.delete(url);
  },
  deleteHallType: (id) => {
    const url = "hall-type/" + String(id);
    return axiosClient.delete(url);
  },
  deleteDish: (id) => {
    const url = "dish/" + String(id);
    return axiosClient.delete(url);
  },
  deleteService: (id) => {
    const url = "service/" + String(id);
    return axiosClient.delete(url);
  },
  deleteDishType: (id) => {
    const url = "dish-type/" + String(id);
    return axiosClient.delete(url);
  },
  deleteReservationForm: (id) => {
    const url = "reservationForm/" + String(id);
    return axiosClient.delete(url);
  },
  deleteDishDetail: (dishId, resId) => {
    const url = "dish-detail/" + String(dishId) + "/" + String(resId);
    return axiosClient.delete(url);
  },
  deleteServiceDetail: (serviceId, resId) => {
    const url = "service-detail/" + String(serviceId) + "/" + String(resId);
    return axiosClient.delete(url);
  },
};
