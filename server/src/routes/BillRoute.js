import express from "express";
import billController from "../controllers/BillController.js";

const billRouter = express.Router({ mergeParams: true });

billRouter.get("/", billController.search);

billRouter.post("/", billController.create);

billRouter.put("/:MaHoaDon", billController.update);

billRouter.delete("/:MaHoaDon", billController.remove);

export default billRouter;
