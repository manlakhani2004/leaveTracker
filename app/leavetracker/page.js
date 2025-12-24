"use client";

import { useEffect, useState } from "react";
import Header from "../_components/Header";
import LeaveBox from "../_components/LeaveBox";
import UpcommingLeaves from "../_components/UpcommingLeaves";
import Modal from "../_components/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { calculateDays } from "../_lib/utilities"
import { useRouter } from "next/navigation";


export default function LeaveTracker() {
    const [employee, setEmployee] = useState(null);
    const [open, setopen] = useState(false);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [leaveType, setLeaveType] = useState("sickLeave");
    const [reason, setReason] = useState("");
    const [upcomingLeaves, setUpcomingLeaves] = useState([]);
    const router = useRouter();
    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("currentuser"));
        if (!user) {
            router.push("/auth/login");
        }
        if (user.role != "employee") {
            router.push("/dashboardadmin");
        }
        setEmployee(user);
    }, [router]);

    if (!employee) return null;

    function handleSubmit(e) {
        e.preventDefault();

        const currentuser = JSON.parse(localStorage.getItem("currentuser"));
        const days = calculateDays(fromDate, toDate);

        // find leave type index
        const leaveIndex = currentuser.leaveBalance.findIndex(
            (leave) => leave.leaveType === leaveType
        );

        if (leaveIndex === -1) {
            toast.error("Invalid leave type")
            return;
        }

        const availableBalance = currentuser.leaveBalance[leaveIndex].balance;
        const remainingBalance = availableBalance - days;

        if (remainingBalance < 0) {

            toast.error("Insufficient leave balance")
            return;
        }

        //Update leave balance
        currentuser.leaveBalance[leaveIndex].balance = remainingBalance;
        localStorage.setItem("currentuser", JSON.stringify(currentuser));
        setEmployee({ ...currentuser });
        //create leave request
        const leaveRequest = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            employeeName: currentuser.username,
            leaveType,
            fromDate,
            toDate,
            reason,
            status: "Pending",
            days
        };

        // save leave requests
        const leaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];
        leaves.push(leaveRequest);
        localStorage.setItem("leaveRequests", JSON.stringify(leaves));
        setUpcomingLeaves(getUpcommingLeaves());
        toast.success("Leave Requested Successfully..")
        setopen(false);
    }
    const getUpcommingLeaves = () => {
    const allLeavesRequests = JSON.parse(localStorage.getItem("leaveRequests"));
    const filterByUser = allLeavesRequests.filter((leave) => leave.employeeName == employee.username)
    // console.log(filterByUser);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingLeaves = filterByUser.filter(leave => {
        const fromDate = new Date(leave.fromDate);
        fromDate.setHours(0, 0, 0, 0);
        return fromDate >= today;
    });

    return upcomingLeaves;
}

    return (
        <div className="min-h-screen bg-slate-800">
            <Header employee={employee} />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-4">
                    <LeaveBox leaveBalance={employee.leaveBalance} />

                    <button
                        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-6 rounded-lg font-medium transition-colors shadow-lg"
                        onClick={() => setopen(true)}
                    >
                        Apply Leave
                    </button>
                </div>

                <div className="my-6">
                    <h2 className="font-semibold text-2xl sm:text-3xl py-3 text-blue-300">
                        Upcoming Leaves
                    </h2>
                    <UpcommingLeaves upcomingLeavesHandler={getUpcommingLeaves} upcomingLeaves={upcomingLeaves} setUpcomingLeaves={setUpcomingLeaves}  />
                </div>
            </div>

            {open && (
                <Modal isOpen={open} onClose={() => setopen(false)}>
                    <div className="text-white">
                        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-5 max-w-md border border-slate-700">
                            <h3 className="text-2xl font-bold text-blue-300 mb-4">Apply for Leave</h3>


                            <div className="flex flex-col gap-2">
                                <label htmlFor="leavetype" className="text-sm font-medium text-slate-300">
                                    Leave Type
                                </label>
                                <select
                                    name="leavetype"
                                    id="leavetype"
                                    required
                                    onChange={(e) => setLeaveType(e.target.value)}
                                    className="bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                    <option value="sickLeave">Sick Leave</option>
                                    <option value="casualLeave">Casual Leave</option>
                                    <option value="earnedLeave">Earned Leave</option>
                                </select>
                            </div>


                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-300">Date Range</label>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <DatePicker
                                        required
                                        selected={fromDate}
                                        minDate={new Date()}
                                        onChange={(date) => setFromDate(date)}
                                        className="bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholderText="From date"
                                    />
                                    <DatePicker
                                        required
                                        selected={toDate}
                                        minDate={fromDate}
                                        onChange={(date) => setToDate(date)}
                                        className="bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholderText="To date"
                                    />
                                </div>
                            </div>


                            <div className="flex flex-col gap-2">
                                <label htmlFor="reason" className="text-sm font-medium text-slate-300">
                                    Reason
                                </label>
                                <input
                                    type="text"
                                    name="reason"
                                    required
                                    onChange={(e) => setReason(e.target.value)}
                                    className="bg-slate-700 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-400"
                                    placeholder="Enter reason for leave"
                                />
                            </div>


                            <button
                                type="submit"
                                className=" cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors font-semibold shadow-lg mt-6"
                            >
                                Submit Request
                            </button>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    )
}