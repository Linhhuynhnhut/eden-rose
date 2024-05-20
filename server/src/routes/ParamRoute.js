import express from "express";
import paramController from "../controllers/ParamController.js";
const paramRouter = express.Router({ mergeParams: true });

// get all param
paramRouter.get("/", paramController.search);

// create new param
paramRouter.post("/", paramController.create);

// update new param
paramRouter.put("/:MaThamSo", paramController.update);

export default paramRouter;
