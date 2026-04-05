import "dotenv/config";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const TemporaryPassword = "admin123";

async function registerAdmin() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    // Check env variable
    if (!ADMIN_EMAIL) {
      console.error("Missing ADMIN_EMAIL env variable");
      process.exit(1);
    }

    // Connect DB
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

    if (existingAdmin) {
      console.log(
        "User already exists as role",
        existingAdmin.role
      );
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(TemporaryPassword, 10);

    // Create admin user
    const admin = await User.create({
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "ADMIN",
    });

    console.log("Admin user created");
    console.log("\nemail:", admin.email);
    console.log("password:", TemporaryPassword);
    console.log("\nchange the password after login.");

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

// Run function
registerAdmin();