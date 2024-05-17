import express from "express";
import dishRouter from "./DishRoute.js";
import hallRouter from "./HallRoute.js";
import dishTypeRouter from "./DishTypeRoute.js";
import hallTypeRouter from "./HallTypeRoute.js";
import statusRouter from "./StatusRoute.js";
import shiftRouter from "./ShiftRoute.js";
import serviceRouter from "./ServiceRoute.js";

const router = express.Router();

router.use("/dish", dishRouter);
router.use("/dish-type", dishTypeRouter);
router.use("/hall-type", hallTypeRouter);
router.use("/hall", hallRouter);
router.use("/status", statusRouter);
router.use("/shift", shiftRouter);
router.use("/service", serviceRouter);

export default router;
