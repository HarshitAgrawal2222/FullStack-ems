import Employee from "../models/Employee.js";


// ================= GET PROFILE =================
// GET /api/profile
export const getProfile = async (req, res) => {
    try {
      console.log("REQ.USER:", req.user); // 🔥 DEBUG
  
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      const employee = await Employee.findOne({
        userId: req.user.userId
      });
  
      if (!employee) {
        return res.json({
          firstName: "Admin",
          lastName: "",
          email: req.user.email
        });
      }
  
      return res.json(employee);
  
    } catch (error) {
      console.error("PROFILE ERROR:", error); // 🔥 IMPORTANT
      return res.status(500).json({
        error: "Failed to fetch profile"
      });
    }
  };


// ================= UPDATE PROFILE =================
// PUT /api/profile
export const updateProfile = async (req, res) => {
  try {
    const session = req.session;

    const employee = await Employee.findOne({
      userId: session.userId
    });

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found"
      });
    }

    if (employee.isDeleted) {
      return res.status(403).json({
        error: "Your account is deactivated. You cannot update your profile."
      });
    }

    await Employee.findByIdAndUpdate(employee._id, {
      bio: req.body.bio
    });

    return res.json({ success: true });

  } catch (error) {
    return res.status(500).json({
      error: "Failed to update profile"
    });
  }
};