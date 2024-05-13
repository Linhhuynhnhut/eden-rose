import express from "express";
import dishController from "../controllers/DishController.js";

const dishRouter = express.Router({ mergeParams: true });

dishRouter.get("/", dishController.search);

dishRouter.post("/", dishController.create);

export default dishRouter;