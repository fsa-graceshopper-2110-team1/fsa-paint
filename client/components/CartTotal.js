import React from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import NumberFormat from "react-number-format";

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
      <Box sx={{ display: "flex", alignItems: "center",columnGap:1,justifyContent:"center" }}>
        <p>{`Subtotal (${quantity} items):`}</p>
        <strong>
        <NumberFormat
          value={total / 100}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          decimalScale={2}
          fixedDecimalScale={true}
        />
        </strong>
      </Box>
      <Button variant="contained" size="small" style={{maxWidth: '200px', maxHeight: '45px', minWidth: '200px', minHeight: '45px'}}>
        <h3>Proceed to Checkout</h3>
      </Button>
    </Box>
  );
};
