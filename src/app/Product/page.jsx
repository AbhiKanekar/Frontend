"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 12;
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?limit=${limit}&page=${page}`);
        const json = await res.json();
        if (json.success) {
          setProducts(json.data);
          setPagination(json.pagination);
        } else {
          console.error("Fetch error:", json.error);
        }
      } catch (err) {
        console.error("Network error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Product Catalog</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded mb-3 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600 text-sm">
                {product.description || "No description"}
              </p>
              <p className="text-blue-600 font-bold mt-2">${product.price}</p>
              <button
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page <= 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {pagination.page} of {pagination.pages}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={pagination.page >= pagination.pages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
