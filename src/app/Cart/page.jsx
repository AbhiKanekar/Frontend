"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg shadow hover:shadow-lg transition duration-300 bg-white"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-4">
                <h2 className="font-semibold text-lg mb-1">{item.name}</h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {item.description || "No description"}
                </p>
                <p className="text-blue-600 font-bold mb-3">${item.price}</p>

                <button
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition duration-200"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
