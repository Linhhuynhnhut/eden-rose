import express from "express";
import serviceDetailController from "../controllers/ServiceDetailController.js";
const serviceDetailRouter = express.Router({ mergeParams: true });

serviceDetailRouter.get("/", serviceDetailController.search);

serviceDetailRouter.post("/", serviceDetailController.create);

serviceDetailRouter.delete("/", serviceDetailController.remove);

export default serviceDetailRouter;
