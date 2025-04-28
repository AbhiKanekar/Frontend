"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/Components/layout/Navbar";

export default function AddProduct() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!formData.name || !formData.description || !formData.price) {
      setError("Name, description, and price are required");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess("✅ Product added successfully!");
      setError("");
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
      });

      // Redirect to the products page after 1 second
      setTimeout(() => {
        router.push("/products"); // Navigate to the product list page
      }, 1000);
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-2.5 p-8 bg-white rounded-3xl shadow-2xl mb-2.5">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Add New Product
        </h1>

        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {["name", "description", "price", "image", "category", "stock"].map(
            (field) => (
              <div key={field}>
                <label className="block text-gray-700 font-semibold mb-2 capitalize">
                  {field}
                </label>
                <input
                  type={
                    field === "price" || field === "stock" ? "number" : "text"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required={field !== "image"}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Enter ${field}`}
                />
              </div>
            )
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}
