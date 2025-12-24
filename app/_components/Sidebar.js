"use client";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
export default function Sidebar({ data }) {
    function handleSignOut() {
        localStorage.removeItem("currentuser");
        toast.success("Log Out Successfully");
        redirect('/auth/login');
    }
    return (
        <div className="h-screen w-[200px] sm:w-[240px] border-r-2 border-slate-700 bg-slate-950 flex flex-col gap-3 pt-8 px-4 shadow-xl">
            <p className="font-bold text-2xl sm:text-3xl text-blue-300 mb-4">Admin</p>

            <div className="cursor-pointer flex gap-2 items-center justify-start bg-slate-800 hover:bg-slate-700 w-full rounded-lg px-4 py-3 text-white transition-colors border border-slate-700 hover:border-blue-500" >
                <div className=" text-2xl">
                    <MdOutlineDashboardCustomize />
                </div>
                <p>Dashboard</p>
            </div>


            <div onClick={() => handleSignOut()} className="cursor-pointer flex gap-2 items-center justify-start bg-slate-800 hover:bg-slate-700 w-full rounded-lg px-4 py-3 text-white transition-colors border border-slate-700 hover:border-blue-500" >
                <div className=" text-2xl" >
                    <FaSignOutAlt />
                </div>
                <p>Log Out</p>
            </div>
        </div>
    )
}