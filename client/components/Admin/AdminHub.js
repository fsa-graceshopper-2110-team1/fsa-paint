import React from "react";
import ProductHub from "./ProductHub";
import { Link } from "react-router-dom";

const AdminHub = () => {
  return (
    <div>
      <h3>Admin Hub</h3>
      <Link to="/product-hub">Manage Products</Link>
      <Link to="/user-hub">View Users</Link>
      <Link to="/order-hub">View Orders</Link>
    </div>
  );
};

export default AdminHub;
