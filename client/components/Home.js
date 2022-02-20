import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid'
import { LoginModal } from "./Auth/LoginModal";
import {BrowserRouter as Router, Link } from "react-router-dom";
import { ExternalLink } from 'react-external-link';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
import Paper from "@mui/material/Paper"
import NumberFormat from "react-number-format";



export const Home = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products);
  products.forEach(p=> console.log(p.category))
  let fp = products.filter((p) => p.category === 'Basic')
  console.log("FP", fp)

  useEffect(() => {
    //using products as a proxy for whether state has already been loaded
    //show modal if state has loaded and user is not logged in
    if (!user.id && products.length > 0) {
      navigate("/login");
    }
  }, [products]);

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
  });

  const NextArrow = ({ onClick }) => {
    return (
      <div className="go_after" onClick={onClick}>
        <ArrowForwardIosIcon />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="go_last" onClick={onClick}>
        <ArrowBackIosIcon />
      </div>
    );
  };

  const settings = {
    infinite: false,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 8,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    height: 2,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
      <ThemeProvider theme={theme}>
        <Card className="main_page_top">
          <CardMedia
            image={
              "https://i.postimg.cc/BnpYnnWw/six-n-five-studio-renovation-isern-serra-c-salva-lopez.jpg"
            }
            className="living_room_image"
          >
            <CardContent>
              <Typography component="p">Color Your World</Typography>
              <Box textAlign="center">
                <Link to={`/browse`}>
                <Button variant="outlined" color="primary">
                  Shop
                </Button>
                </Link>
              </Box>
            </CardContent>
          </CardMedia>
        </Card>
        <Grid container sx={{ height: "5vh", backgroundColor: "white" }} />
        <Divider>
            <h2>Our Most Popular Colors</h2>
        </Divider>
        <Slider {...settings}>
                {products
                  .filter((p) => p.category === 'Basic')
                  .map((product) => (
                    <Box
                      sx={{ display: "flex", marginLeft: 10, marginRight: 20 }}
                      component={"div"} key={product.id}
                    >
                      <Link to={`/product/${product.id}`} key={product.id}>
                        <Box
                          component={Paper}
                          elevation={4}
                          square
                          sx={{
                            height: 250,
                            width: 160,
                            backgroundColor: product.hexCode,
                            textAlign: "left",
                          }}
                        ></Box>
                      </Link>
                      <Box
                        component={"h4"}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                        }}
                      >
                        <Typography color="secondary" size="large">
                          <b>{product.name}</b>
                        </Typography>
                        
                        <Typography color="secondary" sx={{marginTop: 0.4}}>
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
                    </Box>
                  ))}
              </Slider>
        <Grid container sx={{ height: "5vh", backgroundColor: "white" }} />
        <Divider />
        <Grid container sx={{ height: "5vh", backgroundColor: "white" }} />
        <Grid container sx={{height:"60vh"}}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://i.postimg.cc/zDLdX2dc/top-colors-2020-1574699363.jpg)",

              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
            <Grid item
              xs={false}
              sm={false}
              md={0.5}
            />
            <Grid pt={7} item >
              <h2>Top Colors of 2022</h2>
              <ExternalLink href="https://porchdaydreamer.com/2022-paint-color-trends-best-picks/">
              <Button variant="outlined" sx={{color:"black"}}>Learn More</Button>
              </ExternalLink>
            </Grid>
        </Grid>
        <Grid container sx={{ height: "5vh", backgroundColor: "white" }} />
        <Divider />
        <Grid container sx={{ height: "5vh", backgroundColor: "white" }} />
        <Grid container sx={{height:"60vh"}}
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item>
            <ExternalLink href="https://www.thekitchn.com/the-best-paint-finish-for-kitchen-walls-190798">
            <Card sx={{width: '200vh' }}
            direction="column"
            alignItems="center"
            justify="center"
            >
              <CardMedia sx ={{height: '60vh'}}
                image="https://i.postimg.cc/HWzBzJSb/93-0-0-3263-10000-3978-1920.jpg"
                className="kitchen_image"
              >
                <CardContent  sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                  <Box className="indiv_color_box" 
                    sx={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
                    <h2 className="best_paint">Best Paint For Your Kitchen</h2>
                  </Box>
                </CardContent>
              </CardMedia>
            </Card>
            </ExternalLink>
          </Grid>
        </Grid>
        <Grid container sx={{ height: "5vh", backgroundColor: "white" }} />
        <Divider>
            <h2>Get Started</h2>
        </Divider>
        <Grid container sx={{ height: "60vh", backgroundColor: "white"}} 
          direction="column"
          alignItems="center"
          justify="center"
          spacing={2}
          >
          <Grid item xs={false}
            sm={6}
            md={2}
          >
            <ExternalLink href="https://www.dontwasteyourmoney.com/best-paint-brush-for-home/">
              <Card sx={{width: '60vh' }} component={Paper}
              >
                <CardMedia 
                  sx ={{height: '50vh'}}
                  image = "https://i.postimg.cc/vT5NXzSM/Paint-Brush-201908-001.jpg"
                ></CardMedia>
                <Box
                  component={"h4"}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:"center",
                    justify:"center"
                  }}
                >
                  <Typography>Best Brushes of 2022</Typography>
                </Box>
              </Card>
            </ExternalLink>
          </Grid>
          <Grid item xs={false}
            sm={6}
            md={2}
          >
            <ExternalLink href="https://www.thespruce.com/how-to-tape-a-room-for-painting-4684538">
              <Card sx={{width: '60vh' }} component={Paper}>
                <CardMedia 
                  sx ={{height: '50vh'}}
                  image = "https://i.postimg.cc/1zrhFz0C/how-to-tape-a-room-for-painting-4684538-hero-9dd06934b93a4839ae01f1e8d8a48828.jpg"
                ></CardMedia>
                <Box
                  component={"h4"}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:"center",
                    justify:"center"
                  }}
                >
                  <Typography>The Art of Tape</Typography>
                </Box>
              </Card>
            </ExternalLink>
          </Grid>
          <Grid item xs={false}
            sm={6}
            md={2}
          >
            <ExternalLink href="https://www.thespruce.com/choosing-interior-paint-colors-4011484">
              <Card sx={{width: '60vh' }} component={Paper}>
                <CardMedia 
                  sx ={{height: '50vh'}}
                  image = "https://i.postimg.cc/TPGBT68r/download.jpg"
                ></CardMedia>
                <Box
                  component={"h4"}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:"center",
                    justify:"center"
                  }}
                >
                  <Typography>How To Pick Colors For A Room</Typography>
                </Box>
              </Card>
            </ExternalLink>
          </Grid>
          <Grid item xs={false}
            sm={6}
            md={2}
          >
            <ExternalLink href="https://www.hgtv.com/how-to/home-improvement/15-painting-tips-to-paint-like-a-pro">
              <Card sx={{width: '60vh' }} component={Paper}>
                <CardMedia 
                  sx ={{height: '50vh'}}
                  image = "https://i.postimg.cc/26yc5j0B/download-1.jpg"
                ></CardMedia>
                <Box
                component={"h4"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems:"center",
                  justify:"center"
                }}
                >
                  <Typography>10 Ways To Paint Like A Pro</Typography>
                </Box>
              </Card>
            </ExternalLink>
          </Grid>
        </Grid>
        <Grid container sx={{ height: "15vh", backgroundColor: "white" }} />
      </ThemeProvider>
  );
};
export default Home;
