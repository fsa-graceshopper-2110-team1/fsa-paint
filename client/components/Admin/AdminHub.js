import React from "react";
import ProductHub from "./ProductHub";
import { Link } from "react-router-dom";

const AdminHub = () => {
  return (
    <div>
      <h3>Admin Hub</h3>
      <ul>
        <li>
          <Link to="/product-hub">Manage Products</Link>{" "}
        </li>
        <li>
          <Link to="/user-hub">View Users</Link>{" "}
        </li>
        <li>
          <Link to="/order-hub">View Orders</Link>{" "}
        </li>
      </ul>
    </div>
  );
};

export default AdminHub;
