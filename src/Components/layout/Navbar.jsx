"use client";
import { useState } from "react";
import { ShoppingCart, UserCircle, Search } from "lucide-react";
import Sidebar from "../Sidebar";

export default function Navbar({ onNavigate }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await fetch(`/api/search?query=${query}`);
      const json = await res.json();
      if (json.success) {
        setSearchResults(json.data);
        onNavigate("products", json.data);
      } else {
        console.error(json.error);
      }
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <>
      <nav className="w-full bg-gray-900 text-white flex flex-wrap justify-between items-center shadow-xl px-6 py-4">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
          My Shop
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-6 text-lg font-medium">
          {["home", "products", "addProduct", "about", "contact"].map(
            (section) => (
              <button
                key={section}
                onClick={() => onNavigate(section)}
                className="hover:text-teal-400 transition-all duration-300 px-2 py-1 rounded-md capitalize"
              >
                {section === "addProduct" ? "Add Product" : section}
              </button>
            )
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-4 pr-10 py-2 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-md"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1.5 text-gray-600 hover:text-black"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => onNavigate("cart")}
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-4 py-2 rounded-md shadow-md flex items-center gap-2 transition-transform hover:scale-105"
          >
            <ShoppingCart size={20} />
            Cart
          </button>

          {/* Login Button */}
          <button
            onClick={() => onNavigate("login")}
            className="bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white px-4 py-2 rounded-md shadow-md transition-transform hover:scale-105"
          >
            Login
          </button>

          {/* Profile Sidebar Button */}
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
