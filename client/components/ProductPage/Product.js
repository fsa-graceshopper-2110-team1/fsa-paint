import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import { addToCart } from "../../store";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ImagesearchRollerOutlinedIcon from "@mui/icons-material/ImagesearchRollerOutlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import LandscapeIcon from "@mui/icons-material/Landscape";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ProductReviews from "./ProductReviews";
import CompanyInformation from "./CompanyInformation";

export const Product = () => {
  const { productId } = useParams();
  let product =
    useSelector((state) => state.products).filter(
      (p) => p.id === productId * 1
    )[0] || [];

  const cart = useSelector((state) => state.cart);
  const hexcode = product.hexCode;
  const gallons = product.quantity
  const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
      primary: {
        light: "#fafbfe",
        main: "#edf2fb",
      },
      secondary: {
        light: "#ffffff",
        main: "#000000",
      },
    },
  });
  const [count, setCount] = useState(1);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Grid container direction="row" spacing={2} sx={{}}>
          <Grid
            item
            xs={8}
            sm={4}
            md={5}
            lg={4}
            sx={{
              backgroundColor: hexcode,
              border: "1px solid",
              borderColor: "light gray",
              height: "50vh",
              marginLeft:4,
              marginTop:5
            }} component={Paper} elevation={3} square
          />
          <Grid item xs={12} sm={6} md={6} lg={7}sx={{ mx: "3", marginLeft:4 }}>
            <h2>{product.name}</h2>
            <StarRateIcon fontSize="small" />
            <StarRateIcon fontSize="small" />
            <StarRateIcon fontSize="small" />
            <StarHalfIcon fontSize="small" />
            <StarOutlineIcon fontSize="small" />
            <p>Grace Paint</p>
            <NumberFormat
              value={product.price / 100}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={2}
              fixedDecimalScale={true}
            />{" "}
            <p>{product.description}</p>
            <Box>
              <IconButton
                variant="contained"
                onClick={() => {
                  if (count > 1) {
                    setCount(count - 1);
                  }
                }}
              >
                <RemoveCircleIcon fontSize="medium" />
              </IconButton>
              {count}
              <IconButton
                variant="contained"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <AddCircleIcon fontSize="medium" />
              </IconButton>
            </Box>
            <Button
              sx={{ width: "20vh", my: "10" }}
              variant="contained"
              color="primary"
              onClick={() => dispatch(addToCart(cart.id, product.id, count))}
            >
              Add to cart
            </Button>
          </Grid>
        </Grid>
        <CompanyInformation />
        <ProductReviews />
      </div>
    </ThemeProvider>
  );
};
export default Product;
