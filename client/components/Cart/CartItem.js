import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import {
  addToCart,
  removeItemFromCart,
  removeProductFromCart,
} from "../../store";

//so when you hit the + sign it adds another product to the cart
//

export const CartItem = (props) => {
  const dispatch = useDispatch();
  const { cartId, productId, hexCode, name, gallons, price, quantity } = props;
  return (
    <Grid container spacing={3} component="main">
      <Grid item xs={11} sm={11} md={11} sx={{ marginLeft: 3 }}>
        <Box
          sx={{
            marginBottom: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to={`/product/${productId}`} key={productId}>
            <Box
              component={Paper}
              elevation={3}
              square
              style={{ backgroundColor: hexCode, height: 140, width: 100 }}
            ></Box>
          </Link>
          <Grid item xs={12} sm={12} md={7}>
            <Box sx={{ marginLeft: 2 }}>
              <Box
                sx={{ marginLeft: 1, display: "flex", alignItems: "center" }}
                xs={12}
                sm={12}
              >
                <Box component={"h3"} sx={{marginTop:4}}> {name} </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "flex" }} alignItems="center">
                  <IconButton
                    variant="contained"
                    disabled={quantity === 1}
                    onClick={() =>
                      dispatch(removeItemFromCart(cartId, productId))
                    }
                  >
                    <RemoveIcon fontSize="medium" />
                  </IconButton>
                  <Box>{gallons}</Box>
                  <IconButton
                    disabled={quantity === gallons}
                    variant="contained"
                    onClick={() => dispatch(addToCart(cartId, productId))}
                  >
                    <AddIcon fontSize="medium" />
                  </IconButton>
                </Box>
                <Box sx={{ marginLeft: "15%" }}>
                  <p>Per Gallon </p>
                  <NumberFormat
                    value={price / 100}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </Box>

                <Box sx={{ marginLeft: "15%" }}>
                  <p>Total </p>
                  <NumberFormat
                    value={(price * gallons) / 100}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <IconButton
                  variant="contained"
                  sx={{ marginLeft: "auto" }}
                  onClick={() =>
                    dispatch(removeProductFromCart(cartId, productId))
                  }
                >
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Box>
        <Divider />
      </Grid>
    </Grid>
  );
};

//click call your add based on the productId
//add gets disabled if inventory is exceeded
//cartId and ProductId

//subtract gets disabled if item count is 0
//only needs the cartItem object
//should have the delete functionality.

//Trash=cartId and productId
//deletes all cart itmes
