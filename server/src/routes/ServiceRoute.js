import express from "express";
import serviceController from "../controllers/ServiceController.js";
const serviceRouter = express.Router({ mergeParams: true });

// get all hall
serviceRouter.get("/", serviceController.search);

// create new hall
serviceRouter.post("/", serviceController.create);

export default serviceRouter;