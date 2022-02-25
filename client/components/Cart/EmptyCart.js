import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const EmptyCart = () => {
  return (
      <div>
        <h1>Your Cart Is Empty</h1>
        <Link to={`/browse`}>
            <Button>Shop Now</Button>
        </Link>
      </div>
  )
}