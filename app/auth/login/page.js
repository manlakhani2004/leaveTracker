"use client"

import { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
export default function Page() {
    const router = useRouter();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        const currentuser = JSON.parse(localStorage.getItem("currentuser"));

        if (currentuser) {
            if (currentuser.role === "admin") {
                router.push("/dashboardadmin");
            } else {
                router.push("/leavetracker");
            }
        }
    }, [router]);

    function hanleChange(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });

    }
    function handleSubmit(e) {
        e.preventDefault();

        let users = JSON.parse(localStorage.getItem("users"));
        let user = users.find((user) => user.email == loginData.email && user.password == loginData.password)

        if (user) {
            const role = user.role;
            toast.success("Login Successfully..", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    fontWeight: "500",
                },
            });

            localStorage.setItem("currentuser", JSON.stringify(user));
            if (role == "admin") {
                redirect("/dashboardadmin");
            } else {
                redirect("/leavetracker");
            }

        } else {

            toast.error("email or password incorrect!", {
                position: "bottom-center",
                autoClose: 2000,
                theme: "colored",
            });
        }


        // console.log("objext",JSON.parse(obj));
        // console.log(loginData)

    }
    return (
        <div className="flex justify-center items-center min-h-screen px-4 bg-slate-900">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-full max-w-md mx-auto gap-5 p-8 bg-slate-800 rounded-2xl shadow-xl"
            >
                <h2 className="text-blue-300 font-bold text-2xl sm:text-3xl mb-2">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                    required
                    onChange={hanleChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                    required
                    onChange={hanleChange}
                />

                <button
                    type="submit"
                    className="w-full py-3 px-6 bg-blue-500 rounded-lg font-semibold text-white hover:bg-blue-600 transition-colors"
                >
                    Log In
                </button>

                <Link href={"/auth/signup"} className="text-slate-400 text-sm" >
                    Don't have an account?
                </Link>
            </form>
        </div>
    )
}