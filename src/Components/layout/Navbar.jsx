"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className="w-full bg-gray-900 text-white p-4 flex justify-between items-center shadow-xl">
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ml-8 from-teal-400 to-cyan-500">
          My Shop
        </div>

        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="hover:text-teal-400 transition-all duration-300 p-4 rounded-md text-lg font-medium"
          >
            Home
          </Link>
          <Link
            href="Product"
            className="hover:text-teal-400 transition-all duration-300 p-4 rounded-md text-lg font-medium"
          >
            Products
          </Link>
          <Link
            href="About"
            className="hover:text-teal-400 transition-all duration-300 p-4 rounded-md text-lg font-medium"
          >
            About
          </Link>
          <Link
            href="Contact"
            className="hover:text-teal-400 transition-all duration-300 p-4 rounded-md text-lg font-medium"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-10">
          <Link
            href="Cart"
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white transition-all duration-300 rounded-md w-28 text-center p-3 font-medium shadow-xl transform hover:scale-105"
          >
            Cart
          </Link>
          <Link
            href="Login"
            className="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white transition-all duration-300 rounded-md w-28 text-center p-3 font-medium shadow-xl transform hover:scale-105"
          >
            Login
          </Link>
        </div>
      </nav>
    </>
  );
}
