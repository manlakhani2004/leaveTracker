"use client";
import { useRouter } from "next/navigation";
import LeaveList from "../_components/LeaveList";
import { useEffect } from "react";

export default function page() {
   const router = useRouter();
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("currentuser"));
      if (!user) {
         router.push("/auth/login");
      }
      if(user.role != "admin")
      {
         router.push("/leavetracker");
      }
   }, [router])
   return (<div className=" w-full ">
      <div>
         <h2 className=" font-semibold  text-4xl ">All Leave Requests</h2>

      </div>
      <LeaveList />
   </div>)
}