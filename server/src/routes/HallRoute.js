import express from "express";
import hallController from "../controllers/HallController.js";
const hallRouter = express.Router({ mergeParams: true });

// get all hall
hallRouter.get("/", hallController.search);

// create new hall
hallRouter.post("/", hallController.create);

export default hallRouter;
