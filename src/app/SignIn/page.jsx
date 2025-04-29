"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError("");

   // Validation
   if (
     !formData.name ||
     !formData.email ||
     !formData.password ||
     !formData.confirmPassword
   ) {
     toast.error("Please fill in all fields");
     setLoading(false);
     return;
   }

   if (formData.password !== formData.confirmPassword) {
     setError("Passwords do not match");
     toast.error("Passwords do not match");
     setLoading(false);
     return;
   }

   try {
     const registerRes = await fetch("/api/register", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         name: formData.name,
         email: formData.email,
         password: formData.password,
       }),
     });

     let registerData = {};
     try {
       registerData = await registerRes.json();
     } catch (jsonError) {
       console.warn("Failed to parse JSON response:", jsonError);
     }

     if (!registerRes.ok) {
       const errorMessage =
         registerData.message ||
         registerData.error ||
         `Registration failed with status ${registerRes.status}`;
       throw new Error(errorMessage);
     }

     // Clear form and redirect
     setFormData({
       name: "",
       email: "",
       password: "",
       confirmPassword: "",
     });
     toast.success("Registration successful!");
     router.push("/");
   } catch (error) {
     console.error("Registration error:", error);
     setError(error.message);
     toast.error(error.message);
   } finally {
     setLoading(false);
   }
 };

  return (
    <>
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
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="border-b-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md transition-all duration-300 transform focus:scale-105 focus:ring-opacity-100"
                required
              />

              <label className="font-mono text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="border-b-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md transition-all duration-300 transform focus:scale-105 focus:ring-opacity-100"
                required
              />

              <label className="font-mono text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="border-b-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md transition-all duration-300 transform focus:scale-105 focus:ring-opacity-100"
                required
                minLength="8"
              />

              <label className="font-mono text-sm text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border-b-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md transition-all duration-300 transform focus:scale-105 focus:ring-opacity-100"
                required
                minLength="8"
              />

              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-3 rounded-lg text-white w-full font-medium shadow-md transform hover:scale-110 hover:translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing up..." : "Submit"}
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
