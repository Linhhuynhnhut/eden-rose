import express from "express";
import billRouter from "./BillRoute.js";
import dishRouter from "./DishRoute.js";
import hallRouter from "./HallRoute.js";
import dishTypeRouter from "./DishTypeRoute.js";
import hallTypeRouter from "./HallTypeRoute.js";
import statusRouter from "./StatusRoute.js";
import shiftRouter from "./ShiftRoute.js";
import serviceRouter from "./ServiceRoute.js";
import paramRouter from "./ParamRoute.js";
import reservationFormRouter from "./ReservationFormRoute.js";
import dishDetailRouter from "./DishDetailRoute.js";
import serviceDetailRouter from "./ServiceDetailRoute.js";
import reportRouter from "./ReportRoute.js";

const router = express.Router();

router.use("/bill", billRouter);
router.use("/dish", dishRouter);
router.use("/dish-detail", dishDetailRouter);
router.use("/dish-type", dishTypeRouter);
router.use("/hall-type", hallTypeRouter);
router.use("/hall", hallRouter);
router.use("/status", statusRouter);
router.use("/shift", shiftRouter);
router.use("/service", serviceRouter);
router.use("/service-detail", serviceDetailRouter);
router.use("/param", paramRouter);
router.use("/reservationForm", reservationFormRouter);
router.use("/report", reportRouter);

export default router;
