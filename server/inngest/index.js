import { Inngest } from "inngest";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";
import sendEmail from "../config/nodemailer.js";

export const inngest = new Inngest({ id: "fullstack-ems22" });

/* =========================================================
   1. AUTO CHECKOUT
========================================================= */
const autoCheckOut = inngest.createFunction(
  {
    id: "auto-check-out",
    triggers: [{ event: "employee/check-out" }],
  },
  async ({ event, step }) => {
    const { employeeId, attendanceId } = event.data;

    await step.sleepUntil(
      "wait-9-hours",
      new Date(Date.now() + 9 * 60 * 60 * 1000)
    );

    let attendance = await Attendance.findById(attendanceId);

    if (!attendance?.checkOut) {
      
        const employee = await Employee.findById(employeeId)

        await sendEmail({
            to: employee.email,
            subject: "Attendence Check-Out Remainder",
            body: `<div style="max-width: 600px;">
              <h2>Hi ${employee.firstName}, 👋</h2>
          
              <p style="font-size: 16px;">
                You have a check-in in ${employee.department} today:
              </p>
          
              <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">
                ${attendance?.checkIn?.toLocaleTimeString()}
              </p>
          
              <p style="font-size: 16px;">
                Please make sure to check-out in one hour.
              </p>
          
              <p style="font-size: 16px;">
                If you have any questions, please contact your admin.
              </p>
          
              <br />
          
              <p style="font-size: 16px;">Best Regards,</p>
              <p style="font-size: 16px;">EMS</p>
            </div>`
          });
      
      
        await step.sleepUntil(
        "wait-1-hour",
        new Date(Date.now() + 1 * 60 * 60 * 1000)
      );
    }

    attendance = await Attendance.findById(attendanceId);

    if (!attendance?.checkOut) {
      attendance.checkOut = new Date(
        new Date(attendance.checkIn).getTime() + 4 * 60 * 60 * 1000
      );

      attendance.workingHours = 4;
      attendance.dayType = "Half Day";
      attendance.status = "LATE";

      await attendance.save();
    }
  }
);

/* =========================================================
   2. LEAVE REMINDER
========================================================= */
const leaveApplicationReminder = inngest.createFunction(
  {
    id: "leave-application-reminder",
    triggers: [{ event: "leave/pending" }],
  },
  async ({ event, step }) => {
    const { leaveApplicationId } = event.data;

    await step.sleepUntil(
      "wait-24-hours",
      new Date(Date.now() + 24 * 60 * 60 * 1000)
    );

    const leaveApplication = await LeaveApplication.findById(
      leaveApplicationId
    );

    if (leaveApplication?.status === "PENDING") {
      // TODO: send email
      const employee = await Employee.findById(leaveApplication.employeeId)

      await sendEmail({
        to: employee.email,
        subject: "Attendence Check-Out Remainder",
        body: `<div style="max-width: 600px;">
          <h2>Hi ${employee.firstName}, 👋</h2>
      
          <p style="font-size: 16px;">
            You have a check-in in ${employee.department} today:
          </p>
      
          <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">
            ${attendance?.checkIn?.toLocaleTimeString()}
          </p>
      
          <p style="font-size: 16px;">
            Please make sure to check-out in one hour.
          </p>
      
          <p style="font-size: 16px;">
            If you have any questions, please contact your admin.
          </p>
      
          <br />
      
          <p style="font-size: 16px;">Best Regards,</p>
          <p style="font-size: 16px;">EMS</p>
        </div>`
      });


    }
  }
);

/* =========================================================
   3. ATTENDANCE CRON (FIXED PROPERLY)
========================================================= */
const attendanceReminderCron = inngest.createFunction(
  {
    id: "attendance-reminder-cron",
    triggers: [{ cron: "0 6 * * *" }],
  },
  async ({ step }) => {
    const today = await step.run("get-date", () => {
      const startUTC = new Date();
      startUTC.setUTCHours(0, 0, 0, 0);

      const endUTC = new Date(startUTC.getTime() + 24 * 60 * 60 * 1000);

      return { startUTC, endUTC };
    });

    const activeEmployees = await step.run("employees", async () => {
      const employees = await Employee.find({
        isDeleted: false,
        employmentStatus: "ACTIVE",
      }).lean();

      return employees.map((e) => ({
        _id: e._id.toString(),
        email: e.email,
        firstName: e.firstName,
      }));
    });

    const onLeaveIds = await step.run("leave", async () => {
      const leaves = await LeaveApplication.find({
        status: "APPROVED",
        startDate: { $lte: today.endUTC },
        endDate: { $gte: today.startUTC },
      }).lean();

      return leaves.map((l) => l.employeeId.toString());
    });

    const checkedInIds = await step.run("attendance", async () => {
      const records = await Attendance.find({
        date: {
          $gte: today.startUTC,
          $lt: today.endUTC,
        },
      }).lean();

      return records.map((r) => r.employeeId.toString());
    });

    const absentEmployees = activeEmployees.filter(
      (emp) =>
        !onLeaveIds.includes(emp._id) &&
        !checkedInIds.includes(emp._id)
    );

    if (absentEmployees.length > 0) {
      await step.run("send-emails", async () => {
       const emailPromises = absentEmployees.map((emp)=>{
        // send email
        sendEmail({
            to:emp.email,
            subject:`Attendance Reminder - Please mark your attendance `,
            body:`<div style="max-width: 600px;">
          <h2>Hi ${employee.firstName}, 👋</h2>
      
          <p style="font-size: 16px;">
            You have a check-in in ${employee.department} today:
          </p>
      
          <p style="font-size: 18px; font-weight: bold; color: #007bff; margin: 8px 0;">
            ${attendance?.checkIn?.toLocaleTimeString()}
          </p>
      
          <p style="font-size: 16px;">
            Please make sure to check-out in one hour.
          </p>
      
          <p style="font-size: 16px;">
            If you have any questions, please contact your admin.
          </p>
      
          <br />
      
          <p style="font-size: 16px;">Best Regards,</p>
          <p style="font-size: 16px;">EMS</p>
        </div>`
        })
       })
          
        
      });
    }
    await Promise.all(emailPromises)
    return {
      totalActive: activeEmployees.length,
      absent: absentEmployees.length,
    };
  }
);

/* =========================================================
   EXPORT
========================================================= */
export const functions = [
  autoCheckOut,
  leaveApplicationReminder,
  attendanceReminderCron,
];