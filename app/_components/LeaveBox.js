import { FcLeave } from "react-icons/fc";
export default function LeaveBox({ leaveBalance }) {
  const LeaveProvided = {
    sickLeave: 20,
    casualLeave: 20,
    earnedLeave: 20,
  };

  return (
    <div className="flex flex-wrap gap-4 sm:gap-6">
      {leaveBalance.map((leave) => {
        const booked = LeaveProvided[leave.leaveType] - leave.balance;

        return (
          <div
            key={leave.leaveType}
            className="flex-1 min-w-[200px] bg-slate-800 border border-slate-700 rounded-xl px-6 py-5 flex flex-col items-center justify-center gap-3 shadow-lg hover:bg-slate-700/50 transition-colors"
          >
            <p className="text-blue-300 font-semibold text-lg capitalize">
              {leave.leaveType.replace(/([A-Z])/g, ' $1').trim()}
            </p>
            <p className="text-4xl">
              <FcLeave />
            </p>
            <p className="text-white font-medium">
              {leave.balance} days available
            </p>
            <p className="text-slate-400 text-sm">
              {booked} days taken
            </p>
          </div>
        );
      })}
    </div>
  );
}
