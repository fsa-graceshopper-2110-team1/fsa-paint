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
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
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
  let fp = products.filter((p) => p.category === 'Basic')

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
      <div className="go after" onClick={onClick}>
        <ArrowForwardIosIcon />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="go last" onClick={onClick}>
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
              "https://i.postimg.cc/Kjg3xvsf/spacejoy-9-M66-C-w-To-M-unsplash.jpg"
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
        <Grid container sx={{ height: "60vh" }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://i.postimg.cc/xjs6dspb/spacejoy-KSfe2-Z4-REEM-unsplash.jpg)",

              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid item xs={false} sm={false} md={0.5} />
          <Grid pt={7} item>
            <h1>Top Colors of 2022</h1>
            <ExternalLink href="https://porchdaydreamer.com/2022-paint-color-trends-best-picks/">
              <Button variant="outlined" sx={{ color: "black" }}>
                Learn More
              </Button>
            </ExternalLink>
          </Grid>
        </Grid>
        <Grid container sx={{ height: "5vh", backgroundColor: "white" }} />
        <Divider />
        <Grid container sx={{ height: "5vh", backgroundColor: "white" }} />
        <Grid
          container
          sx={{ height: "60vh" }}
        >
          <Grid item xs={false}
            sm={12}
            md={12}
          >
            <ExternalLink href="https://www.thekitchn.com/the-best-paint-finish-for-kitchen-walls-190798">
            <Card>
              <CardMedia sx ={{height: '60vh'}}
                image="https://i.postimg.cc/dt3w7xsM/sidekix-media-I-QC1-JICz-A0-unsplash.jpg"
                className="kitchen_image"
              >
                <CardContent  sx={{display: "flex", flexDirection: "column"}}>
                  <Box className="best_paint_box" 
                    sx={{display:"flex",flexDirection:"column", alignItems: 'center'}}>
                    <h1 className="best_paint">Best Paint For Your Kitchen</h1>
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
        <Grid container sx={{ height: "50vh", backgroundColor: "white"}} 
          direction="row"
          spacing={2}
          className="get_started"
          >
          <Grid item xs={false}
            sm={6}
            md={3}
          >
            <ExternalLink href="https://www.dontwasteyourmoney.com/best-paint-brush-for-home/">
              <Card component={Paper}
              >
                <CardMedia 
                  sx ={{height: '40vh'}}
                  image = "https://i.postimg.cc/tTdv4pZ3/henry-perks-dw5f-YCa8k-Fs-unsplash.jpg"
                ></CardMedia>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <h3>Best Brushes of 2022</h3>
                </Box>
              </Card>
            </ExternalLink>
          </Grid>
          <Grid item xs={false}
            sm={6}
            md={3}
          >
            <ExternalLink href="https://www.thespruce.com/how-to-tape-a-room-for-painting-4684538">
              <Card component={Paper}>
                <CardMedia 
                  sx ={{height: '40vh'}}
                  image = "https://i.postimg.cc/dVpsKPyQ/roselyn-tirado-cq-AX2wl-K-Yw-unsplash.jpg"
                ></CardMedia>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <h3>The Art of Tape</h3>
                </Box>
              </Card>
            </ExternalLink>
          </Grid>
          <Grid item xs={false}
            sm={6}
            md={3}
          >
            <ExternalLink href="https://www.thespruce.com/choosing-interior-paint-colors-4011484">
              <Card component={Paper}>
                <CardMedia 
                  sx ={{height: '40vh'}}
                  image = "https://i.postimg.cc/Kc6D4Rht/mika-baumeister-Ptab-Te6i-J-8-unsplash.jpg"
                ></CardMedia>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3>How To Pick Colors For A Room</h3>
                </Box>
              </Card>
            </ExternalLink>
          </Grid>
          <Grid item xs={false}
            sm={6}
            md={3}
          >
            <ExternalLink href="https://www.hgtv.com/how-to/home-improvement/15-painting-tips-to-paint-like-a-pro">
              <Card component={Paper}>
                <CardMedia 
                  sx ={{height: '40vh'}}
                  image = "https://i.postimg.cc/xTZ5Ycpr/roselyn-tirado-GDWmu0b-Ff-S4-unsplash.jpg"
                ></CardMedia>
                <Box
                sx={{
                  display: "flex",
                  flexDirection: "column"
                }}
                >
                  <h3>10 Ways To Paint Like A Pro</h3>
                </Box>
              </Card>
            </ExternalLink>
          </Grid>
        </Grid>
        <Grid container sx={{ height: "5vh", backgroundColor: "white" }} />
      </ThemeProvider>
  );
};
export default Home;

