import React from "react";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ImagesearchRollerOutlinedIcon from "@mui/icons-material/ImagesearchRollerOutlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import LandscapeIcon from "@mui/icons-material/Landscape";

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
            sx={{ backgroundColor: "primary.light", marginTop: 5}}>
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