import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {useSelector, useDispatch} from 'react-redux'

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
});

//so when you hit the + sign it adds another product to the cart
//

export const CartItem = (product) => {
  const { price, productId } = product;
  const cartItems = useSelector(state => state.cart.cartItems)
  const allProducts = useSelector(state => state.products)
  //get the product name using the productId

  //get the product imageUrl using the productId

  
  return (
    <div>
      <Box>
        <img src={imageUrl} alt="product" />
      </Box>
      <Box>
        <h4>TITLE</h4>
        <p>{price}</p>
      </Box>
      <Box>
        <p>{`Quantity: QUANTITY`}</p>
      </Box>
      <Box>
        <Button>
          <AddCircleIcon fontSize="large" />
        </Button>
        {quantity > 1 && (
          <Button>
            <RemoveCircleIcon fontSize="large" />
          </Button>
        )}
        <Button>
            <DeleteIcon fontSize="large"/>
        </Button>
      </Box>
    </div>
  );
};
