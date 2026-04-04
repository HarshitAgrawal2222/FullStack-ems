import React, { useState } from "react";
import { format } from "date-fns";
import { Loader2, Check, X } from "lucide-react";

const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null);

  const handleStatusUpdate = async (id, status) => {
    try {
      setProcessing(id);

      // Call parent function (API call should be handled there)
      await onUpdate(id, status);

    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>
              {isAdmin && <th>Employee</th>}
              <th>Type</th>
              <th>Dates</th>
              <th>Reason</th>
              <th>Status</th>
              {isAdmin && <th className="text-center">Action</th>}
            </tr>
          </thead>

          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 4}
                  className="text-center py-12 text-slate-500"
                >
                  No Leave application found
                </td>
              </tr>
            ) : (
              leaves.map((leave) => {
                return (
                  <tr key={leave._id || leave.id}>
                    {isAdmin && (
                      <td className="text-slate-900">
                        {leave.employee?.firstName}{" "}
                        {leave.employee?.lastName}
                      </td>
                    )}

                    {/* Type */}
                    <td>
                      <span className="badge bg-slate-100 text-slate-600">
                        {leave.type}
                      </span>
                    </td>

                    {/* Dates */}
                    <td className="text-xs text-slate-500">
                      {format(new Date(leave.startDate), "MMM dd")} -{" "}
                      {format(new Date(leave.endDate), "MMM dd, yyyy")}
                    </td>

                    {/* Reason */}
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {leave.reason}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`badge ${
                          leave.status === "APPROVED"
                            ? "badge-success"
                            : leave.status === "REJECTED"
                            ? "badge-danger"
                            : "badge-warning"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    {/* Admin Actions */}
                    {isAdmin && (
                      <td>
                        {leave.status === "PENDING" && (
                          <div className="flex justify-center gap-2">
                            {/* Approve */}
                            <button
                              disabled={!!processing}
                              onClick={() =>
                                handleStatusUpdate(
                                  leave._id || leave.id,
                                  "APPROVED"
                                )
                              }
                              className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            >
                              {processing === (leave._id || leave.id) ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </button>

                            {/* Reject */}
                            <button
                              disabled={!!processing}
                              onClick={() =>
                                handleStatusUpdate(
                                  leave._id || leave.id,
                                  "REJECTED"
                                )
                              }
                              className="p-1.5 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100"
                            >
                              {processing === (leave._id || leave.id) ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;