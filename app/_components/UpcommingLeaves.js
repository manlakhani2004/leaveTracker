"use client";
import { useEffect, useState } from "react";

export default function UpcommingLeaves({ upcomingLeavesHandler, upcomingLeaves, setUpcomingLeaves,employee }) {

  const allLeavesRequests = JSON.parse(localStorage.getItem("leaveRequests"));
  // console.log(allLeavesRequests);
  useEffect(() => {
    setUpcomingLeaves(upcomingLeavesHandler(allLeavesRequests,employee));
  }, [])
  return (
    <div className="overflow-x-auto bg-slate-800 rounded-xl shadow-xl border border-slate-700">
      <table className="w-full">
        <thead className=" bg-gray-700 border-b border-slate-700">
          <tr>
            <th className="px-4 py-4 text-left text-sm font-semibold text-blue-300">
              Leave Type
            </th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-blue-300">
              Days
            </th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-blue-300">
              Reason
            </th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-blue-300">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {upcomingLeaves.map((leave) => (
            <tr
              key={leave.id}
              className="border-t border-slate-700 hover:bg-slate-700/50 transition-colors"
            >
              <td className="px-4 py-4 font-medium text-white capitalize">
                {leave.leaveType}
              </td>
              <td className="px-4 py-4 text-slate-300">
                {leave.days} days
              </td>
              <td className="px-4 py-4 text-slate-300">
                {leave.reason}
              </td>
              <td className="px-4 py-4">
                <span
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full uppercase
                ${leave.status === "Approved"
                      ? " text-green-400 border border-green-500/50"
                      : leave.status === "Rejected"
                        ? " text-red-400 border border-red-500/50"
                        : " text-yellow-400 border border-yellow-500/50"
                    }`}
                >
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}