import express from "express";
import hallTypeController from "../controllers/HallTypeController.js";

const hallTypeRouter = express.Router({ mergeParams: true });

// get all dish Type
hallTypeRouter.get("/", hallTypeController.search);

// create new type
hallTypeRouter.post("/", hallTypeController.create);

// // update 1 type
// hallTypeRouter.put("/", hallTypeController.update);

// // delete 1 type
// hallTypeRouter.delete("/:id", hallTypeController.remove);

export default hallTypeRouter;
