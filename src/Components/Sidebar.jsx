"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      const res = await fetch("/api/profile");

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user profile");
      }
    }

    if (isOpen) {
      fetchUserProfile();
    }
  }, [isOpen]);

  const getInitial = (name) => name?.charAt(0).toUpperCase() || "?";

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white text-gray-900 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out shadow-lg z-50`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-300">
        <h2 className="text-xl font-semibold">User Profile</h2>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <div className="p-4 flex flex-col items-center">
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 object-cover border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-3xl mb-4">
            {getInitial(user?.name)}
          </div>
        )}

        <h3 className="text-lg font-bold">{user?.name || "Unknown User"}</h3>
        <p className="text-sm text-gray-500">{user?.email || "No Email"}</p>
      </div>

      <ul className="mt-8 space-y-3 px-6">
        <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
          Dashboard
        </li>
        <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
          Settings
        </li>
        <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">Logout</li>
      </ul>
    </div>
  );
}
