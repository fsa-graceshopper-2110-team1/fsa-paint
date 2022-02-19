import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import NumberFormat from "react-number-format";
import Typography from "@mui/material/Typography";
import { LoginModal } from "../Auth/LoginModal";

export const CartTotal = ({ total, quantity, isLoggedIn }) => {
  return (
    <Box
      sx={{
        height: 120,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "5px solid black",
      }}
      my={10}
      component={Paper}
      elevation={3}
      square
    >
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          component={"h3"}
          sx={{ marginRight: 1 }}
        >{`Subtotal (${quantity} items):`}</Box>
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
      <Button
        variant="contained"
        size="small"
        style={{
          maxWidth: "200px",
          maxHeight: "45px",
          minWidth: "200px",
          minHeight: "45px",
        }}
      >
        {isLoggedIn ? (
          <Link to={`/shipping`}>
            <h3>Proceed to Checkout</h3>
          </Link>
        ) : (
          <Link to={`/cart/login`} state={{ path: location.pathname }}>
            <h3>Login to Checkout</h3>
          </Link>
        )}
      </Button>
    </Box>
  );
};
