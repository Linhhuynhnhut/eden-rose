import express from "express";
import dishTypeController from "../controllers/DishTypeController.js";

const dishTypeRouter = express.Router({ mergeParams: true });

// get all dish Type
dishTypeRouter.get("/", dishTypeController.search);

// create new type
dishTypeRouter.post("/", dishTypeController.create);

// // update 1 type
dishTypeRouter.put("/:MaPhanLoai", dishTypeController.update);

// // delete 1 type
dishTypeRouter.delete("/:MaPhanLoai", dishTypeController.remove);

export default dishTypeRouter;
