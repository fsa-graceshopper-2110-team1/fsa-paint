import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCart } from "./store";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Button from "@mui/material/Button";
import { LoginModal } from "./components/LoginModal";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  //fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  //fetch user's cart if available. If not, cart will remain an empty object until first item added to cart
  useEffect(() => {
    if (user.id) dispatch(fetchCart(user.id));
  }, [{}]);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div>
      <Navbar />
      <Button onClick={openModal}>Modal Toggle</Button>
      <LoginModal showModal={showModal} setShowModal={setShowModal} />
      <Routes />
    </div>
  );
};

export default App;
