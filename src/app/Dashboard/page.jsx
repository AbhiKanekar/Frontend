'use client'
import Navbar from "@/Components/layout/Navbar";
import { FaUsers, FaDollarSign, FaChartLine } from "react-icons/fa";

export default function Dashboard() {


  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-50">
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Users Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="text-pink-500 text-4xl">
                <FaUsers />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  Users
                </h2>
                <p className="text-gray-600">120 Active Users</p>
              </div>
            </div>
          </div>

          {/* Sales Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="text-blue-500 text-4xl">
                <FaDollarSign />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  Sales
                </h2>
                <p className="text-gray-600">$8,400 This Month</p>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="text-green-500 text-4xl">
                <FaChartLine />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  Revenue
                </h2>
                <p className="text-gray-600">$52,000 Total</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
