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

export const Category = () => {
  const { category } = useParams();
  const products = useSelector((state) => state.products).filter(
    (p) => p.category.toLowerCase() === category && p.status === "active"
  );
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
  console.log(photo)
  console.log(category)

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
          >
            <CardContent  sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
              <Box sx={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
                <h1 className="indiv_color">THE {category.toUpperCase()}S</h1>
              </Box>
            </CardContent>
          </CardMedia>
        </Card>
      </Grid>
    </Grid>
    <Grid container sx={{height:'10vh'}}>
      <Grid item></Grid>
    </Grid>
    <Grid direction="rows" container spacing={2}>
      {products.map((product) => (
        <Grid item
            sm={6}
            md={2.4}
            lg={2.4}
            >
          <Link to={`/product/${product.id}`} key={product.id}>

          <Card sx={{height:'30vh', backgroundColor: product.hexCode}}>
        <div style={{ backgroundColor: product.hexCode }} key={product.id}>
          {product.name}{" "}
          <NumberFormat
            value={product.price / 100}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
          /gal
        </div>
        </Card>
        </Link>
        </Grid>
      ))}
    </Grid >
    </ThemeProvider>
  );
};
export default Category;
