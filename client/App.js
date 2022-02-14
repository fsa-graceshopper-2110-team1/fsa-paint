import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { fetchProducts, fetchCart } from "./store";

import Home from "./components/Home";
import { ShippingForm } from "./components/ShippingForm";
import Browse from "./components/Browse";
import Category from "./components/Category";
import Product from "./components/Product";
import { CartPage } from "./components/CartPage";
import RequireAuth from "./components/Auth/RequireAuth";
import Navbar from "./components/Navbar";
import { LoginModal } from "./components/Auth/LoginModal";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  // fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // fetch user's cart if available. If not, cart will remain an empty object until first item added to cart
  useEffect(() => {
    if (user.id) dispatch(fetchCart(user.id));
  }, [{}]);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div>
      {/* TODO (REACT-ROUTER V6): 
        1. useHistory to useNavigate and changing the history.push or history.replace
        2. remove "/" from Links
      */}
      <BrowserRouter>
        <Navbar />
        <Button onClick={openModal}>Modal Toggle</Button>
        <LoginModal showModal={showModal} setShowModal={setShowModal} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Home />} />
          <Route path="signup" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="browse" element={<Browse />}>
            <Route path=":category" element={<Category />} />
          </Route>
          <Route path="product/:productId" element={<Product />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="shipping" element={<ShippingForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
