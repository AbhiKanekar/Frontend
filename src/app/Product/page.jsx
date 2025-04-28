"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/Components/layout/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { gsap } from "gsap";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    gsap.from(".product-card", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart! 🛒`);
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-gradient bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
          Products
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="product-card border p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="w-full h-48 mb-4">
                {/* Image inside product card */}
                <img
                  src={product.imageUrl} // Make sure 'imageUrl' is present in the product object
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-green-600 font-bold mt-2">${product.price}</p>
              <button
                className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full transform transition-transform hover:scale-110"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </>
  );
}
