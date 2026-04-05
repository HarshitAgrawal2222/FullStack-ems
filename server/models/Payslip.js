import mongoose from "mongoose";
import { type } from "os";

const PayslipSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  month: {type:Number,required:true},
  year: {type:Number,required:true},
  basicSalary: {type:Number,required:true},
  allowances: {type:Number,default:0},
  deductions: {type:Number,default:0},
  netSalary:{type:Number ,required:true }
  

}, { timestamps: true });



const Payslip =
  mongoose.models.Attendance ||
  mongoose.models("Payslip", PayslipSchema);

export default Payslip;