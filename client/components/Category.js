import React from "react";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
let sortby = 'color'

export const Category = () => {
  const { category } = useParams();
  const products = useSelector((state) => state.products).filter(
    (p) => p.category.toLowerCase() === category && p.status === "active"
  );
  const sortColor = function (a, b) {
    return b.hexCode - a.hexCode;
  };
  const sortPrice = function (a, b) {
    return b.price - a.price;
  };
  let photo =
    "https://i.postimg.cc/Gp5w0k8W/andrew-neel-DLD5-Lvn-Fbl-U-unsplash.jpg";
  switch (category) {
    case "basic":
      photo = "https://i.postimg.cc/Gp5w0k8W/andrew-neel-DLD5-Lvn-Fbl-U-unsplash.jpg";
      break;
    case "yellow":
      photo = "https://i.postimg.cc/s1d7jpJ6/shutterstock-1166635960.jpg";
      break;
    case "brown":
      photo = "https://i.postimg.cc/c1jKGM90/1673749537-huge.jpg";
      break;
    case "orange":
      photo = "https://i.postimg.cc/QNyzGM63/Orange.jpg";
      break;
    case "pink":
      photo = "https://i.postimg.cc/Gh2ZGvd8/shutterstock-1370833175.jpg";
      break;
    case "purple":
      photo = "https://i.postimg.cc/hPgR3vht/Purple.jpg";
      break;
    case "red":
      photo = "https://i.postimg.cc/59kPcTWy/shutterstock-1437658973.jpg";
      break;
    case "blue":
      photo = "https://i.postimg.cc/qvvV4Fsf/Blue.jpg";
      break;
    case "gray":
      photo = "https://i.postimg.cc/JztDfYmr/alexandra-gorn-JIUjvqe2-ZHg-unsplash-1.jpg";
      break;
    case "green":
      photo = "https://i.postimg.cc/DZsRx3TG/Green.png";
      break;
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleShade = () => {
    setAnchorEl(null);
    sortby = "color";
  };
  const handlePrice = () => {
    setAnchorEl(null);
    sortby = "price";
  };
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
  return (
    <ThemeProvider theme={theme}>
      <Grid container
        sx={{ height: "60vh" }}
      >
        <Grid item xs={false}
          sm={12}
          md={12}
        >
          <Card>
            <CardMedia
              sx={{ height: "60vh" }}
              image={photo}
              className="individual_color_image"
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box
                  className="indiv_color_box"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h1 className="indiv_color">THE {category.toUpperCase()}S</h1>
                </Box>
              </CardContent>
            </CardMedia>
          </Card>
        </Grid>
      </Grid>
      <Grid container sx={{ height: "5vh" }}>
        <Grid item></Grid>
      </Grid>
      <Divider />
      <Grid container justifyContent="flex-end" sx={{ height: "1ovh" }}>
        <Grid item >
          <Button
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ color: "black", alignSeld: "right" }}
          >
            Sort By <KeyboardArrowDownIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleShade}>Shade</MenuItem>
            <MenuItem onClick={handlePrice}>Price</MenuItem>
          </Menu>
          
        </Grid>
      </Grid>
      <Divider />
      <Grid container sx={{ height: "10vh" }}>
        <Grid item></Grid>
      </Grid>
      <Grid container spacing={1} className="category_paintcards" >
        {products
          .sort(sortby === "price" ? sortPrice: sortColor)
          .map((product) => (
            <Grid item 
              sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              key={product.id} sm={6} md={2.4} lg={2.4}>
              <Link to={`/product/${product.id}`} key={product.id}>
                <Box
                  component={Paper}
                  elevation={4}
                  square
                  sx={{
                    height: 250,
                    width: 200,
                    backgroundColor: product.hexCode,
                  }}
                ></Box>
              </Link>
              <Box
                component={"h4"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography color="secondary" size="large" sx={{textAlign:"left"}}>
                  <b>{product.name}</b>
                </Typography>
                <Typography color="secondary" sx={{ marginTop: 0.4 }}>
                  <NumberFormat
                    value={product.price / 100}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </Typography>
              </Box>
            </Grid>
          ))}
      </Grid>
    </ThemeProvider>
  );
};
export default Category;
