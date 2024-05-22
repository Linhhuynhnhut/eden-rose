import express from "express";
import reservationFormController from "../controllers/ReservationFormController.js";
const reservationFormRouter = express.Router({ mergeParams: true });

// get all status
reservationFormRouter.get("/", reservationFormController.search);

// create new status
reservationFormRouter.post("/", reservationFormController.create);

// delete status
reservationFormRouter.delete(
  "/:MaPhieuDatTC",
  reservationFormController.remove
);

export default reservationFormRouter;
