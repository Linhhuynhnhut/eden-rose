import express from "express";
import dishRouter from "./DishRoute.js";

const router = express.Router();

router.use("/dish", dishRouter);

export default router;