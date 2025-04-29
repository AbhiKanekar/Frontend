"use client";
import { useState } from "react";
import Navbar from "@/Components/layout/Navbar";
import HomePage from "./Home/page";
import Product from "./Product/page";
import About from "./About/page";
import Contact from "./Contact/page";
import Cart from "./Cart/page";
import Login from "./Login/page";
import AddProduct from "./AddProduct/page";

export default function PageRouter() {
  const [currentPage, setCurrentPage] = useState("home");

  const pages = {
    home: <HomePage />,
    products: <Product />,
    about: <About />,
    contact: <Contact />,
    cart: <Cart />,
    login: <Login />,
    addProduct :<AddProduct/>
  }

  return (
    <>
      <Navbar onNavigate={setCurrentPage} />
      <div className="page-content">{pages[currentPage] || <HomePage />}</div>
    </>
  );
}
