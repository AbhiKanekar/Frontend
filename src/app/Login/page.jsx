'use client'
import Navbar from "@/Components/layout/Navbar";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credential");
      }

      toast.success("Login Successful!!");
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-500">
            Login
          </h2>

          {error && (
            <p className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-lg text-center shadow-md">
              {error}
            </p>
          )}
          {success && (
            <p className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded-lg text-center shadow-md">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-b-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-b-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              onSubmit={handleSubmit}
              type="submit"
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-3 rounded-lg text-white w-full mt-6 shadow-lg hover:scale-105 transition-all duration-300 transform"
            >
              Login
            </button>
          </form>

          <div className="flex justify-center mt-5">
            <Link href="/SignIn">
              <h3 className="text-sm font-semibold text-blue-600 hover:underline hover:underline-offset-2 hover:text-blue-700 w-full text-center p-2 cursor-pointer rounded-full">
                Don't have an account? Sign Up
              </h3>
            </Link>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
