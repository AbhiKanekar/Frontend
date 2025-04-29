'use client'
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "react-hot-toast";

export const AppProviders = ({ children }) => {
  return (
    <SessionProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster className="top-center"/>
          {children}
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
};