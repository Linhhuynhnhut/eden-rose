import express from "express";
import reportController from "../controllers/ReportController.js";

const reportRouter = express.Router({ mergeParams: true });

reportRouter.get("/", reportController.search);

reportRouter.post("/", reportController.create);

reportRouter.put("/:MaHoaDon", reportController.update);

reportRouter.delete("/:MaHoaDon", reportController.remove);

export default reportRouter;
