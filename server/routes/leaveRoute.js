import { Router } from "express";
import { protect, protectAdmin } from "../middleware/auth.js";
import { createLeave, getLeaves, updateLeaveStatus } from "../controllers/leaveController.js";




const leaveRouter = Router();

leaveRouter.post("/",protect,createLeave);
leaveRouter.get("/session", protect, getLeaves);
leaveRouter.put("/id", protect ,protect,protectAdmin,updateLeaveStatus);


export default leaveRouter;