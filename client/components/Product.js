import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import { addToCart } from "../store";
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Box from '@mui/material/Box'
import {createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from "@mui/material/CssBaseline";
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import StarRateIcon from '@mui/icons-material/StarRate';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ImagesearchRollerOutlinedIcon from '@mui/icons-material/ImagesearchRollerOutlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import LandscapeIcon from '@mui/icons-material/Landscape';

export const Product = () => {
  const { productId } = useParams();
  let product =
    useSelector((state) => state.products).filter(
      (p) => p.id === productId * 1
    )[0] || [];

  const cart = useSelector((state) => state.cart);
  const hexcode = product.hexCode
  const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
        primary: {
          light: '#fafbfe',
          main: '#edf2fb'
        },
        secondary: {
          light: '#ffffff',
          main: '#000000'
          
        },
    }
  })

  return (
    <ThemeProvider theme={theme}>
    <div>
      <Grid container component="main" sx={{ height: "70vh", m:1 }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={2}
          md={4}
          sx={{
            backgroundColor: hexcode,
            border: '1px solid',
            borderColor: 'light gray',
            height: "90vh",
            display: "flex", 
            alignItems: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={8} >
          <Box
            sx={{
              //my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <h2>
                  {product.name}
                </h2>
                <StarRateIcon fontSize="small"/>
                <StarRateIcon fontSize="small"/>
                <StarRateIcon fontSize="small"/>
                <StarHalfIcon fontSize="small"/>
                <StarOutlineIcon fontSize="small" />
                <p>Benjamin Moore</p>
                <NumberFormat
                  value={product.price / 100}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />{" "}
              </Grid>
              <Grid item xs={12}>
              <p>
                  {product.description}
                </p>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => dispatch(addToCart(cart.id, product.id))}
                >
                  Add to cart
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ height: "30vh", backgroundColor: 'white' }} />
      <Grid container sx={{ height: "40vh", backgroundColor: 'primary.light', mx:"auto" }}>
          <Grid item 
            sx={{
              backgroundColor: 'primary.light',
              width: 1/4,
              m: 3,
              mx: "auto"
            }}>
            <ImagesearchRollerOutlinedIcon fontSize="large" 
              sx={{mx:"auto"}}
            />
            <h3>Two Coat Guarantee</h3>
            <p>Save time and money with our patented paint mix that not only look great but are easy to use.
              Get the color walls you desired with only two coats.
            </p>
          </Grid>
          <Grid item 
            sx={{
              backgroundColor: 'primary.light',
              m: 3,
              width: 1/4,
              mx:"auto"
            }}>
            <FormatColorFillIcon fontSize="large"/>
            <h3>Mixed In House</h3>
            <p>All of our paint is mixed in our stores to insure we produce the best product every time.
              We know our paint the best so why wouldn't we be the one to mix it.
            </p>
          </Grid>
          <Grid item 
            sx={{
              backgroundColor: 'primary.light',
              width: 1/4,
              m: 3,
              mx: "auto"
            }}>
            <LandscapeIcon fontSize="large"/>
            <h3>Sustainably Sourced</h3>
            <p>We know you care about the planet and we do to.  
              Since the beginning we have pledge to only used sustainably sourced materials that are procurred in ethically.
            </p>
          </Grid>
      </Grid>
      <Grid container sx={{ height: "20vh", backgroundColor: 'white', mx: "auto" }} />
      <Grid container sx={{ height: "50vh", backgroundColor: 'white', mx:"auto" }}>
        <Grid item textAlign="center"  sx={{mx:"auto"}}>
            <h2 sx={{mx:"auto"}}>Reviews</h2>
            <Grid item sx={{mx:"auto"}}>
              <StarRateIcon fontSize="medium" />
              <StarRateIcon fontSize="medium" />
              <StarRateIcon fontSize="medium" />
              <StarHalfIcon fontSize="medium" />
              <StarOutlineIcon fontSize="medium" />
            </Grid>
            <p sx={{mx:"auto"}}>2 Reviews</p>
        </Grid>
        <Grid item>
            <Card sx={{mx:"auto", m:2}}>
              <h5>Nancy</h5>
              <StarRateIcon fontSize="small" />
              <StarRateIcon fontSize="small" />
              <StarRateIcon fontSize="small" />
              <StarRateIcon fontSize="small" />
              <StarOutlineIcon fontSize="small" />
              <h4>Full Coverage</h4>
              <p>Only needed two coats to cover a dark colored wall. Happy with the results, it worked great in my living room.
                Make sure to test it in the light because it looks very different with natural light and artificial light.
              </p>
            </Card>
        </Grid>
      </Grid>
    </div>
    </ThemeProvider >
  );
};
export default Product;
