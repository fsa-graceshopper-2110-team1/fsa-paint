import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import { MyAccountForm } from "./MyAccountForm";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
  typography:{
      fontFamily:"Raleway"
  }
});

export const MyAccount = () => {
  const profile = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        
        <Grid item xs={12} sm={8} md={8}  elevation={6}>

          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
            }}
            component="div"
          >
            <h2>Account Information</h2>
            {profile ? (
            <MyAccountForm/>
            ) : <h3>Loading please wait..</h3>}
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={4}
          sx={{
            backgroundImage:
              "url(https://i.postimg.cc/SQ6r3RmN/Paintbrushes.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderLeft:"solid 1px black",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};

//state to disable button, as soon as change happens 
//flash message update
//