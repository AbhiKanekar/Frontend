"use client";
import {
  FaShoppingCart,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products"); // NEW route
        const json = await res.json();
        if (json.success) {
          setProducts(json.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
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

      <section className="py-12 bg-gradient-to-b from-white to-gray-100">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          <div className="bg-[#f7f7ff] border rounded-xl p-4 text-center shadow hover:shadow-lg transition-all duration-300">
            <Image
              src={"/personal_care.jpg"}
              alt="personal care image"
              width={30}
              height={30}
              className="w-24 h-24 object-cover rounded-full border p-1 bg-gray-50 transition-transform duration-300 group-hover:scale-110"
              priority
            />
          </div>
        </div>
      </section>

      <section className="p-8 bg-gray-50">
        <h2 className="text-4xl font-semibold text-center mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">
                  {product.description || "No description."}
                </p>
                <p className="text-lg font-bold text-blue-600 mb-4">
                  ${product.price}
                </p>
                <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              Loading products...
            </p>
          )}
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
