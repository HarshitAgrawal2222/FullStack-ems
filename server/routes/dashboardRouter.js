import { Router } from "express";
import { protect } from "../middleware/auth.js";
import Employee from "../models/Employee.js";

const router = Router();

router.get("/", protect, async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const departments = await Employee.distinct("department");

    res.json({
      role: req.user.role || "EMPLOYEE",
      totalEmployees,
      departments: departments.length,
      attendance: 0,
      pendingLeaves: 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router; 