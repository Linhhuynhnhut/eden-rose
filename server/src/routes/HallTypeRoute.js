import express from "express";
import hallTypeController from "../controllers/HallTypeController.js";

const hallTypeRouter = express.Router({ mergeParams: true });

// get all Type
hallTypeRouter.get("/", hallTypeController.search);

// create new type
hallTypeRouter.post("/", hallTypeController.create);

// // update 1 type
hallTypeRouter.put("/:MaLoaiSanh", hallTypeController.update);

// // delete 1 type
hallTypeRouter.delete("/:MaLoaiSanh", hallTypeController.remove);

export default hallTypeRouter;
