import React from 'react'

const PayslipList = ({payslips,isAdmin}) => {
  return (
    <div className="card overflow-hidden ">

    {/* Header */}
    <div className="px-6 py-4 border-b">
      <h3 className="font-semibold text-lg">Leave History</h3>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-sm">

        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Employee</th>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-left">From</th>
            <th className="px-6 py-3 text-left">To</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {leaves.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-10 text-gray-500">
                No records found
              </td>
            </tr>
          ) : (
            leaves.map((leave) => (
              <tr key={leave._id || leave.id} className="hover:bg-gray-50">

                <td className="px-6 py-4 font-medium">
                  {leave.employeeName || "John Doe"}
                </td>

                <td className="px-6 py-4">{leave.type}</td>
                <td className="px-6 py-4">{leave.fromDate}</td>
                <td className="px-6 py-4">{leave.toDate}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      leave.status === "APPROVED"
                        ? "bg-green-100 text-green-600"
                        : leave.status === "REJECTED"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>

              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>

  </div>
  )
}

export default PayslipList