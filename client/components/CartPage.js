import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CartItem } from "./CartItem";
import { useSelector } from "react-redux";
import { CartTotal } from "./CartTotal";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
});

export const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  //counts the number of items in the cart
  let quantity;
  cartItems ? (quantity = cartItems.length) : null;

  //CartItems is set up so it allows for duplicates if you add the same item twice
  //This filter checks if the productId already exists and removes it if it does
  //Result is a pure cart to map over
  let cart;
  cartItems
    ? (cart = cartItems.filter(
        (v, i, a) => a.findIndex((t) => t.productId === v.productId) === i
      ))
    : null;

  console.log(cartItems);
  return (
    //takes a moment to load so this ternary is used to make sure it loaded
    //should probably put the loading page here

    <>
      {cartItems ? (
        <ThemeProvider theme={theme}>
          <Grid container>
            {/* <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          > */}

              <Grid
                item
                xs={12}
                sm={7}
                md={7}

              >
                <Box component="h1" sx={{marginLeft:10}}>Shopping Cart</Box>
                {cartItems.length === 0 ? (
                  <div>Your Cart is Empty</div>
                ) : (
                  <>
                    <Box>
                      {cart.map((item) => (
                        <CartItem {...item} key={item.id} />
                      ))}
                    </Box>
                  </>
                )}
              </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              xl={2}
              lg={3}
            >
              <CartTotal quantity={quantity} />
            </Grid>
            {/* </Box> */}
          </Grid>
        </ThemeProvider>
      ) : (
        <h1>Shopping Cart is Empty!</h1>
      )}
    </>
  );
};
