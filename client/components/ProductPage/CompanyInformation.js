import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import ImagesearchRollerOutlinedIcon from "@mui/icons-material/ImagesearchRollerOutlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import LandscapeIcon from "@mui/icons-material/Landscape";
import IconButton from "@mui/material/IconButton";

export default function ProductReviews() {

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
            direction="row"
            spacing={4}
            justifyContent="space-around"
            alignItems="center"
            sx={{height:"40vh", backgroundColor: "primary.light"}}>
            <Grid item xs={12} sm={12} md={3} sx={{mx:"2vh"}}>
                <ImagesearchRollerOutlinedIcon fontSize="large"/>
                <h3>Two Coat Guarantee</h3>
                <p>
                Save time and money with our patented paint mix that not only look
                great but are easy to use. Get the color walls you desired with
                only two coats.
                </p>
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{mx:"2vh"}}>
                <FormatColorFillIcon fontSize="large"/>
                <h3>Mixed In House</h3>
                <p>
                    All of our paint is mixed in our stores to insure we produce the
                    best product every time. We know our paint the best so why
                    wouldn't we be the one to mix it.
                </p>                    
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{mx:"2vh"}}>
            <LandscapeIcon fontSize="large" />
                <h3>Sustainably Sourced</h3>
                <p>
                We know you care about the planet and we do to. Since the
                beginning we have pledge to only used sustainably sourced
                materials that are procurred in ethically.
                </p>
            </Grid>
        </Grid>
        </ThemeProvider>
    )
}