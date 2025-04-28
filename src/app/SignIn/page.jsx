"use client";
import Navbar from "@/Components/layout/Navbar";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { userExists } = await resUserExists.json();
      if (userExists) {
        setError("User already exists");
        toast.error("User already exists!");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        toast.success("User created successfully");
        router.push("/login"); // Redirect to login page after successful registration
      } else {
        toast.error("Error registering user");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 relative">
        <div
          className="bg-white shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4 w-[400px] mt-10 transform transition-all duration-500"
          style={{
            opacity: 0,
            animation: "fadeIn 1s ease-out forwards",
          }}
        >
          <div className="flex flex-col items-center gap-[20px] w-full">
            <h2 className="font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-500">
              Sign Up
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <label className="font-mono text-sm text-gray-600">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-b-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md transition-all duration-300 transform focus:scale-105 focus:ring-opacity-100"
              />

              <label className="font-mono text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md transition-all duration-300 transform focus:scale-105 focus:ring-opacity-100"
              />

              <label className="font-mono text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md transition-all duration-300 transform focus:scale-105 focus:ring-opacity-100"
              />

              <label className="font-mono text-sm text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-b-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md transition-all duration-300 transform focus:scale-105 focus:ring-opacity-100"
              />

              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-3 rounded-lg text-white w-full font-medium shadow-md transform hover:scale-110 hover:translate-y-1 transition-all duration-300"
                >
                  Submit
                </button>
              </div>
            </form>

            <Link href="/Login">
              <h3 className="text-sm font-medium hover:underline hover:underline-offset-2 hover:text-pink-500 w-[100px] text-center mt-4 p-2 cursor-pointer">
                Already have an account? Login
              </h3>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>

      <Toaster />
    </>
  );
}
