import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logout from "@mui/icons-material/Logout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { LoginModal } from "../Auth/LoginModal";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import MoreIcon from "@mui/icons-material/MoreVert";
import { MobileCart } from "./MobileCart";
import { MobileBrowse } from "./MobileBrowse";
import { UserDropdown } from "./UserDropdown";
import { LogoutUser } from "./LogoutUser";
import { CategoryList } from "./CategoryList";

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
      sm: 200,
      md: 450,
      lg: 900,
      xl: 1536,
    },
  },
});

export const NavbarTwo = () => {

  //CART ITEM COUNT
  const cart = useSelector((state) => state.cart);

  //AUTH VERIFICATION
  const user = useSelector((state) => state.auth);

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

  //DROPDOWN MENU FOR PRODUCTS
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const products = useSelector((state) => state.products)
    .filter((p) => p.status)
    .sort(function (a, b) {
      if (a.category > b.category) {
        return 1;
      }
      if (a.category < b.category) {
        return -1;
      }
      return 0;
    });
  const categories = [...new Set(products.map((product) => product.category))];

  //MOBILE DROPDOWN MENU
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <MobileCart cart={cart ? cart : null} />
      </MenuItem>
      <Divider />
      <MenuItem>
        <MobileBrowse />
      </MenuItem>
      <Divider />
      {user.firstName ? (
        <div>
          <UserDropdown user={user} />
          <Divider />
          <LogoutUser/>
        </div>
      ) : (
        <MenuItem>
          <IconButton
            size="large"
            edge="end"
            onClick={openModal}
            color="secondary"
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <Typography
              sx={{
                fontFamily: "raleway",
                marginLeft: 0.5,
                color: "black",
              }}
            >
              Log in
            </Typography>
          </IconButton>
        </MenuItem>
      )}
    </Menu>
  );

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
                    height: 60,
                    width: 120,
                    marginTop: 0.5,
                    marginLeft: 2,
                  }}
                />
              </Link>
              <Box sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  color="secondary"
                  sx={{ borderRadius: 2 }}
                  aria-controls={open2 ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open2 ? "true" : undefined}
                  onClick={handleClick2}
                >
                  <Typography
                    variant="p"
                    component="div"
                    sx={{
                      fontSize: "16px",
                      marginLeft: 1,
                      marginRight: 1,
                      fontFamily: "raleway",
                      letterSpacing: "0.1rem",
                    }}
                  >
                    PRODUCTS
                  </Typography>
                </IconButton>
              </Box>
              <Menu
                anchorEl={anchorEl2}
                id="account-menu"
                open={open2}
                onClose={handleClose2}
                onClick={handleClose2}
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
                <Link to="browse">
                  <MenuItem>
                    <Typography
                      sx={{
                        fontFamily: "raleway",
                        color: "black",
                        marginLeft: 0.5,
                      }}
                    >
                      Browse All
                    </Typography>
                  </MenuItem>
                </Link>
                <Divider />
                <CategoryList categories={categories}/>
              </Menu>
              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  display: { xs: "none", sm: "none", md: "flex" },
                  marginRight: 2,
                  alignItems: "center",
                }}
              >
                {user.firstName ? (
                  <>
                    <Box
                      sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
                    >
                      <IconButton
                        size="large"
                        edge="end"
                        color="secondary"
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        sx={{ borderRadius: 2 }}
                      >
                        <AccountCircle />
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{
                            marginLeft: 0.5,
                            fontSize: "15px",
                            fontFamily: "raleway",
                            letterSpacing: "0.1rem",
                          }}
                        >
                          {user.firstName.toUpperCase()}
                        </Typography>
                      </IconButton>
                    </Box>
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
                      <UserDropdown user={user} />
                      <Divider />
                      <LogoutUser/>
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
                <Box sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
                  <Link to="cart">
                    <IconButton size="large" color="secondary">
                      <Badge
                        badgeContent={cart?.cartItems?.length}
                        color="error"
                      >
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                  </Link>
                </Box>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          <Box component={"div"} sx={{ height: "70px" }} />
        </Box>
      </ThemeProvider>
      <LoginModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

