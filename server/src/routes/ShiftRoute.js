import express from "express";
import shiftController from "../controllers/ShiftController.js";
const shiftRouter = express.Router({ mergeParams: true });

// get all shift
shiftRouter.get("/", shiftController.search);

// create new shift
shiftRouter.post("/", shiftController.create);

// put shift
shiftRouter.put("/:MaCa", shiftController.update);

export default shiftRouter;
