import React, { useEffect, useState } from "react";
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
  const userCart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products) || [];
  const cartItems = userCart?.cartItems || [];

  //calculate how many of each product are in cart
  const gallons = cartItems
    .map((ci) => ci.productId)
    .reduce((acc, prodId) => {
      if (prodId in acc) {
        acc[prodId]++;
      } else {
        acc[prodId] = 1;
      }
      return acc;
    }, {});

  //CartItems is set up so it allows for duplicates if you add the same item twice
  //This set looks for unique products
  const productsInCart = [
    ...new Set(cartItems.map((cartItem) => cartItem.productId)),
  ];

  const [cart, setCart] = useState([]);

  useEffect(() => {
    //get the product info and consolidate into one object
    setCart(
      productsInCart
        .map((p) => {
          const product = products.find((product) => product.id === p) || {};
          return {
            productId: p,
            name: product.name,
            hexCode: product.hexCode,
            quantity: product.quantity,
            price: product.price,
            gallons: gallons[p],
          };
        })
        .sort((a, b) => a.productId - b.productId)
    );
  }, [JSON.stringify(userCart)]);

  //get total cost and quantity of the cart
  const [total, quantity] = cart.reduce(
    (acc, product) => {
      const total = acc[0] + product.gallons * product.price;
      const quantity = acc[1] + product.gallons;
      return [total, quantity];
    },
    [0, 0]
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item xs={12} sm={7} md={7}>
            <Box component="h1" sx={{ marginLeft: 10 }}>
              Shopping Cart
            </Box>
            {cartItems.length === 0 ? (
              <div>Your Cart is Empty</div>
            ) : (
              <>
                <Box>
                  {cart.map((product) => (
                    <CartItem
                      {...product}
                      cartId={userCart.id}
                      key={product.productId}
                    />
                  ))}
                </Box>
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={5} md={4} xl={2} lg={3}>
            <CartTotal total={total} quantity={quantity} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
