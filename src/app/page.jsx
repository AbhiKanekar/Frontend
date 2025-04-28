"use client";
import Navbar from "@/Components/layout/Navbar";
import {
  FaShoppingCart,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Navbar />
      <section
        className="relative bg-cover bg-center text-white py-24"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1051070/pexels-photo-1051070.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to Our E-Commerce Store
          </h1>
          <p className="text-xl mb-6">
            Your one-stop shop for all things amazing!
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-yellow-500 transition-all duration-300">
            Shop Now
          </button>
        </div>
      </section>

      <section className="p-8 bg-gray-50">
        <h2 className="text-4xl font-semibold text-center mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Sample Product */}
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
            <img
              src="https://images.pexels.com/photos/1051070/pexels-photo-1051070.jpeg"
              alt="Product"
              className="w-full h-64 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Product Name</h3>
            <p className="text-gray-600 mb-4">
              Description of the product goes here.
            </p>
            <p className="text-lg font-bold text-blue-600 mb-4">$49.99</p>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-pink-400">E-Store</h3>
            <p className="text-gray-400 mb-4">
              The best online shopping experience, just a click away!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/shop" className="hover:text-pink-400">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-pink-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-pink-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 E-Store. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
