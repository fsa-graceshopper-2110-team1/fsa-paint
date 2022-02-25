import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";

export const MobileCart = (props) =>{
    const {cart}=props
    return(
        <Link to="cart">
          <Box component="div" sx={{ display: "flex" }}>
            <Badge
              sx={{ marginRight: 4 }}
              badgeContent={cart?.cartItems?.length}
              color="error"
            >
              <ShoppingCartIcon style={{ color: "black" }} />
            </Badge>
            <Typography
              sx={{
                fontFamily: "raleway",
                color: "black",
                marginLeft: 0.5,
              }}
            >
              Cart
            </Typography>
          </Box>
        </Link>
    )
}