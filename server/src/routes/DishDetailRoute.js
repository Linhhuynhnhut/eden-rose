import express from "express";
import dishDetailController from "../controllers/DishDetailController.js";

const dishDetailRouter = express.Router({ mergeParams: true });

dishDetailRouter.get("/", dishDetailController.search);

dishDetailRouter.post("/", dishDetailController.create);

dishDetailRouter.delete("/", dishDetailController.remove);

export default dishDetailRouter;
