import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import NumberFormat from "react-number-format";
import Typography from "@mui/material/Typography";
import { LoginModal } from "../Auth/LoginModal";
import { createOrder } from "../../store";

export const CartTotal = ({ total, quantity, isLoggedIn, cartId, userId }) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        height: 150,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
      my={10}
      elevation={3}
      square
    >
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      > 
        <Box component = {"h2"}
          sx={{ marginRight: 1 }}
        >Order summary</Box>
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 3 }}
      > 
        <Box
          component={"h3"}
          sx={{ marginRight: 2}}
        >Subtotal: </Box>
        <h3>
          <NumberFormat
            value={total / 100}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </h3>
      </Box>
      
      {isLoggedIn ? (
        <Button
          variant="contained"
          size="small"
          style={{
            maxWidth: "200px",
            maxHeight: "45px",
            minWidth: "200px",
            minHeight: "45px",
          }}
          disabled={quantity === 0}
          // onClick={()=> dispatch(createOrder(cartId, userId))
          // }
        >
          <Link to={`/shipping`} style={{ color: "black" }}>
            <h3>Checkout</h3>
          </Link>
        </Button>
      ) : (
        <Button
          variant="contained"
          size="small"
          style={{
            maxWidth: "200px",
            maxHeight: "45px",
            minWidth: "200px",
            minHeight: "45px",
          }}
          disabled={quantity === 0}
        >
          <Link
            to={`/cart/login`}
            state={{ path: location.pathname }}
            style={{ color: "black" }}
          >
            <h3>Login to Checkout</h3>
          </Link>
        </Button>
      )}
    </Box>
  );
};
