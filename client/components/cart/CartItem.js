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
      <Grid item xs={11} sm={11} md={11}>
        <Box
          sx={{
            borderTop: "3px solid black",
            borderBottom: "3px solid black",
            marginLeft: 8,
            marginBottom: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={3}
            square
            style={{ backgroundColor: hexCode, height: 140, width: 100 }}
          ></Box>
          <Grid item xs={12}>
            <Box sx={{ marginLeft: 2 }}>
              <Box component={"h2"} sx={{ marginLeft: 1 }}>
                {name}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component={"p"}
                  sx={{ marginLeft: 1 }}
                >{`Gallons: ${gallons}`}</Box>
                <Box sx={{ marginLeft: "25%" }}>
                  {"Price:    "}
                  <NumberFormat
                    value={price / 100}
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
                  disabled={quantity === gallons}
                  variant="contained"
                  onClick={() => dispatch(addToCart(cartId, productId))}
                >
                  <AddCircleIcon fontSize="medium" />
                </IconButton>

                <IconButton
                  variant="contained"
                  disabled={quantity === 1}
                  onClick={() =>
                    dispatch(removeItemFromCart(cartId, productId))
                  }
                >
                  <RemoveCircleIcon fontSize="medium" />
                </IconButton>

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
