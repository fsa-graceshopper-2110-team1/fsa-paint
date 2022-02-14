import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSelector, useDispatch } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
});

// {
//     "line_items":
//     [
//         {
//             "quantity":1,
//             "price_data":{
//                 "currency":"usd",
//                 "unit_amount":2800,
//                 "product_data":{
//                     "name":"Cumulus",
//                     "description":"Light as air."
//                 }
//             }
//         }
//     ],
//     "customer_email": "abdi@gmail.com"
// }

export const ShippingForm = () => {
  const { register: register4, handleSubmit: handleSubmit4, formState: {errors}} = useForm();
    const cartItems = useSelector((state)=>state.cart.cartItems)
    const email = useSelector((state)=>state.auth.username)
    const allProducts = useSelector((state) => state.products);

      //CartItems is set up so it allows for duplicates if you add the same item twice
  //This filter checks if the productId already exists and removes it if it does
  //Result is a pure cart to map over
    let cart;
    cartItems
    ? (cart = cartItems.filter(
        (v, i, a) => a.findIndex((t) => t.productId === v.productId) === i
      ))
    : null;

    let line_items;
    cart ? 
    (line_items = cart.map(item=>{
        return{
            quantity:cartItems.reduce((accum, elem) => {
                if (elem.productId === item.productId) {
                  accum++;
                  return accum;
                } else {
                  return accum;
                }
              }, 0),
            price_data:{
                currency:'usd',
                unit_amount: item.price,
                product_data:{
                    name:allProducts.filter((paint) => {
                        if (paint.id === item.productId) {
                          return paint;
                        }
                      })[0].name,
                    description: allProducts.filter((paint) => {
                        if (paint.id === item.productId) {
                          return paint;
                        }
                      })[0].description,
                }
            }
        }
    })): null;

    console.log("THIS IS THE CART OBJECT--->", line_items)

    // const response= await fetchFromAPI('create-checkout-session', {
    //     body:{line_items, customer_email: email},
    // });

    // const {sessionId} = response;
    // const {error} = await stripe.redirectToCheckout({
    //     sessionId
    // });

    // if(error){
    //     console.log(error);
    // }

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://i.postimg.cc/vZ3YkhBJ/Shipping-Side-Pic.jpg)",

            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
            }}
            component="form"
            onSubmit={handleSubmit4(onSubmit)}
            key={3}
          >
            <h2>Shipping Information</h2>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  autoFocus
                  {...register4("firstName", { required: true })}
                  id="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  {...register4("lastName", { required: true })}
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  {...register4("address1", { required: true })}
                  label="Address line 1"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  {...register4("address2")}
                  label="Address line 2"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  {...register4("city", { required: true })}
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  {...register4("state", { required: true })}
                  label="State/Province/Region"
                  fullWidth
                  required
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  {...register4("zip", { required: "Required field",
                pattern:{
                    value:/^[0-9]{5}(?:-[0-9]{4})?$/i,
                    message: "Invalid Zip Code"
                } })}
                error={!!errors?.zip}
                helperText={errors?.zip ? errors.zip.message : null}
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  {...register4("country", { required: true })}
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="saveAddress"
                      value={false}
                    />
                  }
                  label="Use this address for payment details"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
