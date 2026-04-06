import { inngest } from "../inngest/index.js";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

// ================= CLOCK IN / OUT =================
// POST /api/attendance
export const clockInOut = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      userId: req.user.userId   // ✅ FIXED
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    if (employee.isDeleted) {
      return res.status(403).json({
        error: "Your account is deactivated. You cannot clock in/out."
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      employeeId: employee._id,
      date: today
    });

    const now = new Date();

    // ================= CLOCK IN =================
    if (!existing) {
      const isLate = now.getHours() >= 9 && now.getMinutes() > 0;

      const attendance = await Attendance.create({
        employeeId: employee._id,
        date: today,
        checkIn: now,
        status: isLate ? "LATE" : "PRESENT"
      });

      // ✅ keep inngest (optional but good)
      await inngest.send({
        name: "employee/check-out",
        data: {
          employeeId: employee._id,
          attendanceId: attendance._id,
        }
      });

      return res.json({
        success: true,
        type: "CHECK_IN",
        data: attendance
      });
    }

    // ================= CLOCK OUT =================
    else if (!existing.checkOut) {
      const checkInTime = new Date(existing.checkIn).getTime();
      const diffMs = now.getTime() - checkInTime;
      const workingHours = parseFloat((diffMs / (1000 * 60 * 60)).toFixed(2));

      existing.checkOut = now;
      existing.workingHours = workingHours;

      if (workingHours >= 8) existing.dayType = "Full Day";
      else if (workingHours >= 6) existing.dayType = "Three Quarter Day";
      else if (workingHours >= 4) existing.dayType = "Half Day";
      else existing.dayType = "Short Day";

      await existing.save();

      return res.json({
        success: true,
        type: "CHECK_OUT",
        data: existing
      });
    }

    // ================= ALREADY CHECKED OUT =================
    else {
      return res.json({
        success: true,
        type: "CHECK_OUT",
        data: existing
      });
    }

  } catch (error) {
    console.error("Attendance Error:", error);
    return res.status(500).json({
      error: "Operation failed"
    });
  }
};

// ================= GET ATTENDANCE =================
// GET /api/attendance
export const getAttendance = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      userId: req.user.userId   // ✅ FIXED
    });

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found"
      });
    }

    const limit = parseInt(req.query.limit || 30);

    const history = await Attendance.find({
      employeeId: employee._id
    })
      .sort({ date: -1 })
      .limit(limit);

    // ✅ FIXED RESPONSE FORMAT
    return res.json({
      success: true,
      data: history
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to fetch attendance"
    });
  }
};