"use client";

import Navbar from "@/Components/layout/Navbar";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <>
    <Navbar/>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="border p-4 rounded shadow">
                <h2 className="text-xl">{item.name}</h2>
                <p>{item.description}</p>
                <p className="font-bold">${item.price}</p>
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
