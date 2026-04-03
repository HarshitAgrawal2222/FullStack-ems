import { Calendar, FileText, DollarSign, ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const EmployeeDashboard = ({ data }) => {
  const emp = data.employee;

  const cards = [
    {
      icon: Calendar,
      value: data.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This month",
    },
    {
      icon: FileText,
      value: data.pendingLeave,
      title: "Pending Leaves",
      subtitle: "Awaiting Approval",
    },
    {
      icon: DollarSign,
      value: data.latestPayslip
        ? `₹${data.latestPayslip.netSalary?.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Most recent payout",
    },
  ];

  return (
    <div className="animate-fade-in">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Welcome, {emp?.firstName} 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {emp?.position} - {emp?.department || "No Department"}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative p-5 sm:p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition flex items-center justify-between group"
          >
            {/* Left Content */}
            <div>
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-300 group-hover:bg-indigo-500 transition" />

              <p className="text-sm text-slate-500">{card.title}</p>
              <p className="text-xl font-semibold text-slate-800 mt-1">
                {card.value}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {card.subtitle}
              </p>
            </div>

            {/* Icon */}
            <card.icon className="w-10 h-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition" />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Link
          to="/attendance"
          className="btn-primary text-center inline-flex items-center justify-center gap-2"
        >
          Mark Attendance <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          to="/leave"
          className="btn-secondary text-center"
        >
          Apply for Leave
        </Link>
      </div>

    </div>
  );
};

export default EmployeeDashboard;