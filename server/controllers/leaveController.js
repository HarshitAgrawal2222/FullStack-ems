import { inngest } from "../inngest/index.js";
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";


// Create leave
// POST /api/leaves
export const createLeave = async (req, res) => {
    try {
      const employee = await Employee.findOne({
        userId: req.user.userId
      });
  
      if (!employee) {
        return res.status(404).json({
          error: "Employee not found"
        });
      }
  
      if (employee.isDeleted) {
        return res.status(403).json({
          error: "Your account is deactivated. You cannot apply for leave."
        });
      }
  
      const { type, leaveType, startDate, endDate, reason } = req.body;
      const finalType = type || leaveType;
  
      if (!finalType || !startDate || !endDate || !reason) {
        return res.status(400).json({
          error: "Missing fields"
        });
      }
  
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      if (
        new Date(startDate) <= today ||
        new Date(endDate) <= today
      ) {
        return res.status(400).json({
          error: "Leave dates must be in the future"
        });
      }
  
      if (new Date(endDate) < new Date(startDate)) {
        return res.status(400).json({
          error: "End date cannot be before start date"
        });
      }
  
      const leave = await LeaveApplication.create({
        employeeId: employee._id,
        type: finalType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        status: "PENDING"
      });
  
      return res.json({
        success: true,
        data: leave
      });
  
    } catch (error) {
      console.error("LEAVE ERROR:", error);
      return res.status(500).json({
        error: "Failed"
      });
    }
  };

// Get leaves
// GET /api/leaves
export const getLeaves = async (req, res) => {
    try {
  
      // ✅ ADMIN → get all leaves with employee details
      if (req.user.role === "ADMIN") {
        const leaves = await LeaveApplication.find()
          .populate({
            path: "employeeId",
            populate: {
              path: "userId",
              select: "name email"
            }
          })
          .sort({ createdAt: -1 });
  
        return res.json({
          success: true,
          data: leaves
        });
      }
  
      // 👇 EMPLOYEE logic (keep same)
      const employee = await Employee.findOne({
        userId: req.user.userId
      });
  
      if (!employee) {
        return res.status(404).json({
          error: "Employee not found"
        });
      }
  
      const leaves = await LeaveApplication.find({
        employeeId: employee._id
      }).sort({ createdAt: -1 });
  
      return res.json({
        success: true,
        data: leaves
      });
  
    } catch (error) {
      console.error("GET LEAVES ERROR:", error);
      return res.status(500).json({
        error: error.message
      });
    }
  };
  // Update leave status
// PATCH /api/leaves/:id
export const updateLeaveStatus = async (req, res) => {
    try {
      const { status } = req.body;
  
      if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
        return res.status(400).json({
          error: "Invalid status"
        });
      }
  
      const leave = await LeaveApplication.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }   // ✅ FIXED
      );
  
      if (!leave) {
        return res.status(404).json({
          error: "Leave not found"
        });
      }
  
      return res.json({
        success: true,
        data: leave
      });
  
    } catch (error) {
      console.error("UPDATE ERROR:", error); // ✅ ADD THIS
      return res.status(500).json({
        error: "Failed"
      });
    }
  };