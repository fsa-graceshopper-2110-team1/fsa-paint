import React from "react";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid"
import Box from '@mui/material/Box'
import {createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from "@mui/material/CssBaseline";
import Card from '@mui/material/Card'
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export const Category = () => {
  const { category } = useParams();
  const products = useSelector((state) => state.products)
  .filter(
    (p) => p.category.toLowerCase() === category && p.status === "active"
  );
  const sortColor = (function(a,b){
    return b.hexCode - a.hexCode; 
  })
  const sortPrice = (function(a,b){
    return b.price - a.price; 
  })
  let photo = "https://i.postimg.cc/BnpYnnWw/six-n-five-studio-renovation-isern-serra-c-salva-lopez.jpg"
  switch(category) {
    case 'white':
      photo = 'https://i.postimg.cc/vBVwC6Wc/White.jpg'
    case 'yellow':
      photo = 'https://i.postimg.cc/52MnbQLZ/Yellow.jpg'
      break;
    case 'brown':
      photo = 'https://i.postimg.cc/0NSkm3b6/Brown.png'
      break;
    case 'orange':
      photo = 'https://i.postimg.cc/QNyzGM63/Orange.jpg'
      break;
    case 'pink':
      photo = 'https://i.postimg.cc/kGPPCXcw/Pink.jpg'
      break;
    case 'purple':
      photo = 'https://i.postimg.cc/hPgR3vht/Purple.jpg'
      break;
    case 'red':
      photo = 'https://i.postimg.cc/7YVrv4TM/Red.jpg'
      break;
    case 'blue':
      photo = 'https://i.postimg.cc/qvvV4Fsf/Blue.jpg'
      break;
    case 'gray':
      photo = 'https://i.postimg.cc/9fD6qqgJ/Gray.jpg'
      break;
    case 'green':
      photo = 'https://i.postimg.cc/DZsRx3TG/Green.png'
      break;
  }
  let sortby = 'color'
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
    sortby = 'color'
    console.log("::: " + sortby)
    console.log('bycolor')
  };
  const handlePrice = () => {
    setAnchorEl(null);
    sortby = 'price'
    console.log("::: " + sortby)
    console.log('byprice')
  };
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
    <Grid container 
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item>
      <Card sx={{width: '200vh' }}>
          <CardMedia sx ={{height: '60vh'}}
            image={photo}
            className="individual_color_image"
          >
            <CardContent  sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
              <Box className="indiv_color_box" 
                sx={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
                <h1 className="indiv_color">THE {category.toUpperCase()}S</h1>
              </Box>
            </CardContent>
          </CardMedia>
        </Card>
      </Grid>
    </Grid>
    <Grid container sx={{height:'5vh'}}>
      <Grid item></Grid>
    </Grid>
    <Divider />
    <Grid container sx={{height:'1ovh'}}>
      <Grid item>
        <Button
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{color:'black', alignSeld:"right"}}
        >
          Sort By
        </Button>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleShade}>Shade</MenuItem>
        <MenuItem onClick={handlePrice}>Price</MenuItem>
      </Menu>
      </Grid>
    </Grid>
    <Divider />
    <Grid container sx={{height:'10vh'}}>
      <Grid item></Grid>
    </Grid>
    <Grid direction="rows" container spacing={2}>
      {products.sort((sortby==='color')? sortColor : sortPrice
      ).map((product) => (
        <Grid item
            sm={6}
            md={2.4}
            lg={2.4}
            >
          <Link to={`/product/${product.id}`} key={product.id}>
            <Card sx={{height:'40vh', backgroundColor: product.hexCode,textAlign: 'left'}}>
              <Box style={{ backgroundColor: product.hexCode, textAlign: 'left' }} key={product.id}>
                <p className='paintchipname2'>{product.name}{" "}
                <NumberFormat
                  value={product.price / 100}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
                /gal
                </p>
              </Box>
          </Card>
        </Link>
        </Grid>
      ))}
    </Grid >
    </ThemeProvider>
  );
};
export default Category;
