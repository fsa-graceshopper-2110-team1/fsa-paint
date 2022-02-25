import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Grid"

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
    secondary: {
        main: "#2081C3"
    },
    typography:{
      fontFamily:"Raleway"
    }
  },
});

export const EmptyCart = () => {
  return (
      <ThemeProvider theme={theme}>
        <Grid container direction="column" align="center" >   
            <Grid item sx={{marginTop:15}}>
             <img
                src={'https://i.postimg.cc/fTQ28LrZ/Pin-Clipart-com-check-mark-clip-art-2018325.png'}
                height="75"
            />
            </Grid>
            <Grid item sx={{marginTop: 3, marginBottom: 3}}>
                <h1>Your Cart Is Empty</h1>
            </Grid>
            <Grid item sx={{marginBottom: 10}}>
                <Link to={`/browse`}>
                    <Button variant="outlined" color="secondary">
                        Shop Now
                    </Button>
                </Link>
            </Grid>
        </Grid>
      </ThemeProvider>
  )
}
