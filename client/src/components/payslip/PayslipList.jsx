
import React, { useState } from "react";
import { format } from "date-fns";
import { Loader2, Check, X, Download } from "lucide-react";

const PayslipList = ({ isAdmin,payslips=[] }) => {
 
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>
              {isAdmin && <th>Employee</th>}
              <th>Period</th>
              <th>Basic Salary</th>
              <th>Net Salary</th>
               <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {payslips.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="text-center py-12 text-slate-500"
                >
                  No payslips found
                </td>
              </tr>
            ) : (
              payslips.map((payslip) => {
                return (
                  <tr key={payslip._id || payslip.id}>
                    {isAdmin && (
                      <td className="text-slate-900">
                        {payslip.employee?.firstName}{" "}
                        {payslip.employee?.lastName}
                      </td>
                    )}

                    {/* Type */}
                    <td className='text-slate-500'>
                      {format(new Date(payslip.year,payslip.month - 1),"MMMM yyyy")}
                    </td>

                    {/* Dates */}
                    <td className="text-slate-500">
  ${payslip.basicSalary?.toLocaleString()}
</td>

<td className="font-medium text-slate-800">
  ${payslip.netSalary?.toLocaleString()}
</td>

                    {/* Reason */}
                    <td className="text-centre" >
                    <button
    onClick={() =>
      window.open(`/print/payslips/${payslip._id || payslip.id}`)
    }
    className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors ring-1 ring-blue-600/10"
  >
    <Download className="w-3 h-3 mr-1.5" />
    Download
  </button>
                    </td>

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



export default PayslipList