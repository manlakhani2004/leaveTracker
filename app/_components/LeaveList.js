"use client"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function LeaveList() {

  const [leaveRequests, setLeaveRequests] = useState(null);
  useEffect(() => {
    setLeaveRequests(JSON.parse(localStorage.getItem("leaveRequests")))
  }, [])
  if (!leaveRequests) {
    return null;
  }

  function handleLeaveAprove(id) {
    const notRequested = leaveRequests.filter((leave) => leave.id !== id)
    const Requseted = leaveRequests.filter((leave) => leave.id == id)
    Requseted[0].status = "Approved";
    // console.log(Requseted);
    notRequested.push(Requseted[0]);
    // console.log(notRequested);
    setLeaveRequests(notRequested);
    localStorage.setItem("leaveRequests", JSON.stringify(notRequested));
    toast.success("Leave Approved Successfully...")
  }
  function handleLeaveReject(id) {
    const notRequested = leaveRequests.filter((leave) => leave.id !== id)
    const Requseted = leaveRequests.filter((leave) => leave.id == id)
    Requseted[0].status = "Rejected";
    // console.log(Requseted);
    notRequested.push(Requseted[0]);
    // console.log(notRequested);
    setLeaveRequests(notRequested);
    localStorage.setItem("leaveRequests", JSON.stringify(notRequested));
    toast.success("Leave Rejected Successfully...")
  }
  return (
    <div className="overflow-x-auto mt-6 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
      <p className="pl-4 pt-4 pb-2 text-slate-300 font-medium">
        {leaveRequests.length} Requests
      </p>

      <table className="w-full">
        <thead className="bg-slate-900 border-b border-slate-700">
          <tr>
            <th className="text-left px-4 py-4 font-semibold text-blue-300">
              Leave Requests
            </th>
            <th className="text-left px-4 py-4 font-semibold text-blue-300">
              Status
            </th>
            <th className="text-left px-4 py-4 font-semibold text-blue-300">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {leaveRequests.map((leave) => (
            <tr
              key={leave.id}
              className="border-t border-slate-700 hover:bg-slate-700/50 transition-colors"
            >
              <td className="px-4 py-4">
                <div className="font-medium text-white">
                  {leave.employeeName} is Requesting {leave.leaveType} from{" "}
                  {leave.fromDate.split("T")[0]} to {leave.toDate.split("T")[0]}
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  {leave.days} days for {leave.reason}
                </div>
              </td>

              <td className="px-4 py-4">
                <span
                  className={`px-3 uppercase py-1.5 text-xs rounded-full font-semibold
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

              <td className="px-4 py-4">
                {leave.status === "Pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => handleLeaveAprove(leave.id)} className=" cursor-pointer text-sm rounded-2xl border-2 border-green-700 text-gray-300 py-2 px-3    transition">
                      Approve
                    </button>
                    <button onClick={() => handleLeaveReject(leave.id)} className=" cursor-pointer py-2 px-3 text-sm rounded-2xl border-2 border-red-400 text-red-500 transition">
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}