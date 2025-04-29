"use client";
import { useState } from "react";
import { ShoppingCart, UserCircle } from "lucide-react";
import Sidebar from "../Sidebar";

export default function Navbar({ onNavigate }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="w-full bg-gray-900 text-white  flex justify-between items-center shadow-xl">
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ml-8 from-teal-400 to-cyan-500">
          My Shop
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => onNavigate("home")}
            className="hover:text-teal-400 transition-all duration-300 p-4 rounded-md text-lg font-medium"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate("products")}
            className="hover:text-teal-400 transition-all duration-300 p-4 rounded-md text-lg font-medium"
          >
            Products
          </button>
          <button
            onClick={() => onNavigate("addProduct")}
            className="hover:text-teal-400 transition-all duration-300 p-4 rounded-md text-lg font-medium"
          >
            Add Product
          </button>
          <button
            onClick={() => onNavigate("about")}
            className="hover:text-teal-400 transition-all duration-300 p-4 rounded-md text-lg font-medium"
          >
            About
          </button>
          <button
            onClick={() => onNavigate("contact")}
            className="hover:text-teal-400 transition-all duration-300 p-4 rounded-md text-lg font-medium"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-6 mr-6">
          <button
            onClick={() => onNavigate("cart")}
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white transition-all duration-300 rounded-md w-28 text-center p-3 font-medium shadow-xl transform hover:scale-105 flex justify-center gap-1"
          >
            <ShoppingCart size={20} color={"white"} />
            Cart
          </button>

          <button
            onClick={() => onNavigate("login")}
            className="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white transition-all duration-300 rounded-md w-28 text-center p-3 font-medium shadow-xl transform hover:scale-105"
          >
            Login
          </button>
          
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="hover:scale-110 transition-transform duration-300"
          >
            <UserCircle size={36} />
          </button>
        </div>
      </nav>

      <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
    </>
  );
}
