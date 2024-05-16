import express from "express";
import dishRouter from "./DishRoute.js";
import dishTypeRouter from "./DishTypeRoute.js";

const router = express.Router();

router.use("/dish", dishRouter);
router.use("/dish-type", dishTypeRouter);

export default router;
