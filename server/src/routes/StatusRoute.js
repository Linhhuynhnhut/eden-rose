import express from "express";
import statusController from "../controllers/StatusController.js";
const statusRouter = express.Router({ mergeParams: true });

// get all status
statusRouter.get("/", statusController.search);

// create new status
statusRouter.post("/", statusController.create);

// delete status
statusRouter.delete("/:MaTinhTrang", statusController.remove);

export default statusRouter;
