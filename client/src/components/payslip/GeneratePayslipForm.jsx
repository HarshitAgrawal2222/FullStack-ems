import React, { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axios";

const GeneratePayslipForm = ({ employees = [], onSuccess }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return (
    <button
      onClick={() => setIsOpen(true)}
      className="btn-primary flex items-center gap-2"
    >
      <Plus className="w-4 h-4" /> Generate Payslip
    </button>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries());

    // ✅ FIX 1: convert to proper types
    const data = {
      employeeId: raw.employeeId,
      month: Number(raw.month),
      year: Number(raw.year),
      basicSalary: Number(raw.basicSalary),
      allowances: Number(raw.allowances || 0),
      deductions: Number(raw.deductions || 0),
    };

    try {
      await api.post("/payslips", data);
      toast.success("Payslip generated");   // ✅ optional improvement
      setIsOpen(false);
      onSuccess();
    } catch (err) {
      console.log("ERROR:", err.response?.data); // ✅ debug
      toast.error(err.response?.data?.error || err?.message);
    } finally {
      setLoading(false); // ✅ FIX 2 (important)
    }
  };

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      
      <div className='card max-w-lg w-full p-6 animate-slide-up'>
        
        <div className='flex justify-between items-center mb-6'>
          <h3 className='text-lg font-bold text-slate-900'>
            Generate Monthly Payslip
          </h3>
  
          <button
            onClick={() => setIsOpen(false)}
            className='text-slate-400 hover:text-slate-600 p-1'
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Employee */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Employee
            </label>

            {/* ✅ FIX 3: defaultValue required */}
            <select name="employeeId" required defaultValue="">
              <option value="" disabled>Select employee</option>

              {employees.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.firstName} {e.lastName} ({e.position})
                </option>
              ))}
            </select>
          </div>

          {/* Month & Year */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Month
              </label>

              <select name="month">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Year
              </label>

              <input
                type="number"
                name="year"
                defaultValue={new Date().getFullYear()}
              />
            </div>

          </div>

          {/* Basic Salary */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Basic Salary
            </label>

            <input
              type="number"
              name="basicSalary"
              required
              placeholder="5000"
            />
          </div>

          {/* Allowances & Deductions */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Allowances
              </label>

              <input
                type="number"
                name="allowances"
                defaultValue="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Deductions
              </label>

              <input
                type="number"
                name="deductions"
                defaultValue="0"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="btn-secondary"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              type="submit"
              className="btn-primary flex items-center"
            >
              {loading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Generate
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default GeneratePayslipForm;