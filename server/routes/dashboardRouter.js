import { Router } from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.js";

const dashboardRouter = Router();

dashboardRouter.get("/", protect, getDashboardData);

export default dashboardRouter;