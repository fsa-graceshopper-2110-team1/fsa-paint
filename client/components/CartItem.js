import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import Paper from "@mui/material/Paper";

//so when you hit the + sign it adds another product to the cart
//

export const CartItem = (product) => {
  const { price, productId } = product;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const allProducts = useSelector((state) => state.products);

  //get the product using the productId
  const paint = allProducts.filter((paint) => {
    if (paint.id === productId) {
      return paint;
    }
  })[0];
  //deconstruct name and imageUrl
  const { name, hexCode } = paint;
  console.log("this is the paint!!!", paint);

  //get the quantity of each product from cartItems
  const quantity = cartItems.reduce((accum, elem) => {
    if (elem.productId === productId) {
      accum++;
      return accum;
    } else {
      return accum;
    }
  }, 0);

  return (
    <Grid container spacing={3} component="main">
      <Grid item xs={11} sm={11} md={11}>
        <Box
          sx={{
            borderTop: "1px solid black",
            borderBottom: "0.5px solid black",
            marginLeft: 10,
            marginBottom: 2,
          }}
        >
          <Box
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={3}
            square
            style={{ backgroundColor: hexCode, height: 200, width: 100 }}
          ></Box>
          <Grid item xs={12} sm={8} md={5}>
            <Box>
              <h4>{name}</h4>
              <NumberFormat
                value={price / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </Box>
            <Box>
              <p>{`Quantity: ${quantity}`}</p>
            </Box>
            <Box>
              <IconButton variant="contained">
                <AddCircleIcon fontSize="medium" />
              </IconButton>

              <IconButton variant="contained">
                <RemoveCircleIcon fontSize="medium" />
              </IconButton>

              <IconButton variant="contained">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
