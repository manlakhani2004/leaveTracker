"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react"
import { toast } from "react-toastify";
import { leaveBalance } from "../../data/data";
export default function Page() {

    const [signUpData, setSignUpData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        leaveBalance
    })


    function handleChange(e) {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        });

    }

    function handleSignUp(e) {
        e.preventDefault();
        if (signUpData.username == "" || signUpData.email == "" || signUpData.password == "" || signUpData.confirmPassword == "") {
            toast.warn("Please enter all field");
            return;
        }
        if (signUpData.password != signUpData.confirmPassword) {
            toast.warn("Password and Conform Password should be same");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (!users) {
            users.push(signUpData);
        } else {
            const user = users.find((user) => user.email == signUpData.email);
            if (user) {
                toast.warn("User Already Exits..")
                return;
            } else {
                users.push(signUpData);
            }
            localStorage.setItem("users", JSON.stringify(users));
            // console.log(users);
            toast.success("User Created Succesfully...")
            redirect("/auth/login")
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen px-4 bg-slate-900">
            <form
                onSubmit={handleSignUp}
                className="flex flex-col items-center w-full max-w-md mx-auto gap-5 p-8 bg-slate-800 rounded-2xl shadow-xl"
            >
                <h2 className="text-blue-300 font-bold text-2xl sm:text-3xl mb-2">
                    Sign Up
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                    required
                    onChange={handleChange}
                />

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                    required
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                    required
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                    required
                    onChange={handleChange}
                />

                <select
                    id="role"
                    name="role"
                    onChange={handleChange}
                    className="py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg w-full text-white focus:outline-none focus:border-blue-400 transition-colors"
                >
                    <option className="text-slate-900" value="">Select Role</option>
                    <option className="text-slate-900" value="admin">Admin</option>
                    <option className="text-slate-900" value="employee">Employee</option>
                </select>

                <button
                    type="submit"
                    className="w-full cursor-pointer py-3 px-6 bg-blue-500 rounded-lg font-semibold text-white hover:bg-blue-600 transition-colors"
                >
                    Sign Up
                </button>

                <Link href={"/auth/login"} className="text-slate-400 text-sm">
                    Already have an account?
                </Link>
            </form>
        </div>
    )
}