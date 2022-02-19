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
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";

export const Home = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products);

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
  return (
    <>
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
                "url(https://i.postimg.cc/zDLdX2dc/top-colors-2020-1574699363.jpg)",

              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid item xs={false} sm={false} md={0.5} />
          <Grid pt={7} item>
            <h2>Top Colors of 2022</h2>
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
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item>
            <ExternalLink href="https://www.thekitchn.com/the-best-paint-finish-for-kitchen-walls-190798">
              <Card sx={{ width: "200vh" }}>
                <CardMedia
                  sx={{ height: "60vh" }}
                  image="https://i.postimg.cc/HWzBzJSb/93-0-0-3263-10000-3978-1920.jpg"
                  className="kitchen_image"
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
                        justifyContent: "center",
                      }}
                    >
                      <h2 className="best_paint">
                        BEST PAINT FOR YOUR KITCHEN
                      </h2>
                    </Box>
                  </CardContent>
                </CardMedia>
              </Card>
            </ExternalLink>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Outlet />
    </>
  );
};
export default Home;
