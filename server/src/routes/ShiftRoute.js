import express from "express";
import shiftController from "../controllers/ShiftController.js";
const shiftRouter = express.Router({ mergeParams: true });

// get all hall
shiftRouter.get("/", shiftController.search);

// create new hall
shiftRouter.post("/", shiftController.create);

export default shiftRouter;
