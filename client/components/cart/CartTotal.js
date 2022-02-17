import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import NumberFormat from "react-number-format";
import Typography from "@mui/material/Typography";

export const CartTotal = ({ quantity }) => {
  const total = useSelector((state) => state.cart.total);

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
        <Link to={`/checkout`}>
          <h3>Proceed to Checkout</h3>
        </Link>
      </Button>
    </Box>
  );
};
