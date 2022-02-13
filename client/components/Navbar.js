import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'
import {createTheme, ThemeProvider } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';
import ImagesearchRollerOutlinedIcon from '@mui/icons-material/ImagesearchRollerOutlined';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useHistory } from "react-router-dom";
import PaletteIcon from '@mui/icons-material/Palette';


const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id)
  const dispatch = useDispatch()
  const firstname = useSelector((state) => state.auth.firstname)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const theme = createTheme({
    palette: {
        primary: {
            light: '#ffffff',
            main: '#edf2fb'
        },
        secondary: {
          main: '#000000'
        },
    }
  })
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handlePaintMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const history = useHistory();

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  function loginButton() {
    setAnchorEl(null);
    history.push("/login");
  }
  function signUpButton() {
    setAnchorEl(null);
  }
  function logoutButton() {
    setAnchorEl(null);
    dispatch(logout())
    history.push("/")
  }
  function profileButton() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderNonLoggedInMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >  
      <MenuItem onClick={loginButton}>Log In</MenuItem>
      <MenuItem onClick={signUpButton}>Sign Up</MenuItem>
      <MenuItem onClick={logoutButton}>Profile</MenuItem>
      <MenuItem onClick={profileButton}>Log Out</MenuItem>
    </Menu>
  );
  const renderLoggedInMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >  
      <MenuItem onClick={logoutButton}>Profile</MenuItem>
      <MenuItem onClick={profileButton}>Log Out</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <ImagesearchRollerOutlinedIcon />
          </IconButton>
        <p>Paint</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
        >
          <Badge badgeContent={3} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <PersonIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <NavLink exact to="/home">
            <img src = {'https://i.postimg.cc/1X61z5Jh/Grace-Paints-logo.png'}
                width="100"
              />
          </NavLink>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavLink exact to="/browse">
              <IconButton size="large" color="secondary" /*onClick={handlePaintMenuOpen} aria-controls={paintMenuId}*/>
                <ImagesearchRollerOutlinedIcon />
            </IconButton>
            </NavLink>
            <NavLink exact to="/shipping">
              <IconButton
                size="large"
                color="secondary"
              >
                <Badge badgeContent={3} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </NavLink>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="secondary"
            >
              <PersonIcon />
            </IconButton>
            {isLoggedIn ? <Typography>{firstname}</Typography> : <Typography></Typography>}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="secondary"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar> 
      {renderNonLoggedInMenu}
      {renderMobileMenu}
    </Box>
    </ThemeProvider>
  );
  //{renderPaintMenu}
  /*
  const paintMenuId = 'primary-search-paint-menu';

  const renderPaintMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={paintMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >  
      <MenuItem onClick={handleMenuClose}>All Paint</MenuItem>
      <MenuItem onClick={handleMenuClose}>By Color</MenuItem>
    </Menu>
  );
  */
 /*
  
  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div>
            <Link to="/home">Home</Link>
            <a href="#" onClick={()=> dispatch(logout())}>
              Logout
            </a>
          </div>
        ) : (
          <div>
         <Link to="/login">Login</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
  
}
*/


}
export default Navbar
