import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ImagesearchRollerIcon from "@mui/icons-material/ImagesearchRoller";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { LoginModal } from "./Auth/LoginModal";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#edf2fb",
    },
    secondary: {
      main: "#000000",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 333,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const NavbarTwo = () => {
  //CART ITEM COUNT AND AUTH VERIFICATION
  const cartItems = useSelector((state) => state.cart);
  let cart;
  cartItems ? (cart = cartItems.cartItems) : null;

  const auth = useSelector((state) => state.auth);
  let totalItemsInCart;
  cart ? (totalItemsInCart = cart.length) : null;
  const name = auth.firstName;

  //MODAL
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  //DROPDOWN MENU FOR LOGGED IN USER
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={{ height: "70px" }}>
            <Toolbar>
              <Link to="home">
                <Box
                  component={"img"}
                  src={"https://i.postimg.cc/dQpc1HbS/grace-paint.png"}
                  sx={{
                    height: 70,
                    width: 130,
                    marginTop: 0.2,
                    marginLeft: -2.5,
                  }}
                />
              </Link>
              
              
                <Link to="browse">
                  <IconButton size="large" color="secondary">
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ marginLeft: 2.5, marginRight:1 }}
                      >
                        Paints
                      </Typography>
                      <ImagesearchRollerIcon/>
                  </IconButton>
                </Link>
                <Box sx={{ flexGrow: 1 }} />
                <Box
                sx={{
                  display: { xs: "none", sm: "flex", md: "flex" },
                  marginRight: 5,
                  alignItems: "center",
                }}
              >
                
                <Link to="cart">
                  <IconButton size="large" color="secondary">
                    <Badge badgeContent={totalItemsInCart} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Link>
                {name ? (
                  <>
                    <IconButton
                      size="large"
                      edge="end"
                      color='secondary'
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <AccountCircle />
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ marginLeft: 0.5 }}
                      >
                        {name}
                      </Typography>
                    </IconButton>

                    {/* //this is the dropdown menu after you click the button */}
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <Link to="my-account">
                        <MenuItem>
                          <Avatar /> My account
                        </MenuItem>
                      </Link>
                      <MenuItem>
                        <Avatar /> My orders
                      </MenuItem>
                      <Divider />
                      <MenuItem>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <IconButton
                    size="large"
                    edge="end"
                    onClick={openModal}
                    color="secondary"
                  >
                    <AccountCircleIcon />
                  </IconButton>
                )}
              </Box>
            </Toolbar>
          </AppBar>
          <Box component={"div"} sx={{ height: "70px" }} />
        </Box>
      </ThemeProvider>
      <LoginModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};
