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

import { LoginModal } from "./Auth/LoginModal";

export const Home = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products);

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
              <Typography component="p">Paint Your World</Typography>
              <Box textAlign="center">
                <Button variant="outlined" color="primary">
                  Shop
                </Button>
              </Box>
            </CardContent>
          </CardMedia>
        </Card>
      </ThemeProvider>
      <Outlet />
    </>
  );
};
export default Home;
