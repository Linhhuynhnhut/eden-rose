import express from "express";
import reservationFormController from "../controllers/ReservationFormController.js";
const reservationFormRouter = express.Router({ mergeParams: true });

// get all status
reservationFormRouter.get("/", reservationFormController.search);

//get by id
reservationFormRouter.get(
  "/:MaPhieuDatTC",
  reservationFormController.searchById
);

// create new status
reservationFormRouter.post("/", reservationFormController.create);

// update status
reservationFormRouter.put("/:MaPhieuDatTC", reservationFormController.update);

// delete status
reservationFormRouter.delete(
  "/:MaPhieuDatTC",
  reservationFormController.remove
);

export default reservationFormRouter;
