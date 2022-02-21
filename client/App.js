import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";

import {
  me,
  fetchProducts,
  fetchCart,
  createCart,
  addLocalStorageToCart,
} from "./store";

import RequireAuth from "./components/Auth/RequireAuth";
import RequireAdminAuth from "./components/Auth/RequireAdminAuth";
import Home from "./components/Home";
import { ShippingForm } from "./components/ShippingForm";
import Browse from "./components/Browse";
import Category from "./components/Category";
import Product from "./components/Product";
import { CartPage } from "./components/Cart/CartPage";
import Navbar from "./components/Navbar";
import { LoginModal } from "./components/Auth/LoginModal";
import { NavbarTwo } from "./components/NavbarTwo";
import { MyAccount } from "./components/MyAccount";
import { FlashMessage } from "./components/FlashMessage";
import AdminHub from "./components/Admin/AdminHub";
import { MyOrders } from "./components/Orders/MyOrders";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  useEffect(async () => {
    const user = await dispatch(me());
  }, []);

  useEffect(async () => {
    if (user?.id) {
      //try to fetch cart & creates new cart if one is not found
      const cart = await dispatch(fetchCart(user.id));
    } else {
      //if user not signed in, look for local storage
      let localCart = window.localStorage.getItem("cart");
      if (!localCart) {
        //if no local storage cart, create a cart in storage
        localCart = JSON.stringify({ id: -1, cartItems: [] });
        localStorage.setItem("cart", localCart);
      }
      dispatch(addLocalStorageToCart(JSON.parse(localCart)));
    }
  }, [JSON.stringify(user)]);

  // fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  //Modal state for login modal in /login route
  const [showModal, setShowModal] = useState(true);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div>
      <BrowserRouter>
        <NavbarTwo />
        <FlashMessage />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              path="login"
              element={
                <LoginModal showModal={showModal} setShowModal={setShowModal} />
              }
            />
          </Route>
          <Route path="home" element={<Home />} />
          <Route path="browse/:category" element={<Category />} />
          <Route path="browse" element={<Browse />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="cart" element={<CartPage />}>
            <Route
              path="login"
              element={
                <LoginModal showModal={showModal} setShowModal={setShowModal} />
              }
            />
          </Route>
          <Route
            path="my-account"
            element={
              <RequireAuth>
                <MyAccount />
              </RequireAuth>
            }
          />
          <Route
            path="shipping"
            element={
              <RequireAuth>
                <ShippingForm />
              </RequireAuth>
            }
          />
          <Route
            path="admin-hub"
            element={
              <RequireAdminAuth>
                <AdminHub />
              </RequireAdminAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
