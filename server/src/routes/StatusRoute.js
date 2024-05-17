import express from "express";
import statusController from "../controllers/StatusController.js";
const statusRouter = express.Router({ mergeParams: true });

// get all hall
statusRouter.get("/", statusController.search);

// create new hall
statusRouter.post("/", statusController.create);

export default statusRouter;
