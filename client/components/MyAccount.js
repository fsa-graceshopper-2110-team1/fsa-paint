import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../store"
import { useEffect,useState } from "react";
import { MyAccountForm } from "./MyAccountForm";
import { SettingsSystemDaydreamTwoTone } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
});

//increment the number of things
export const MyAccount = () => {
    const profile = useSelector((state) => state.auth);
<<<<<<< Updated upstream

    const preloadedValues = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
    }
    const {
        register: register5,
        handleSubmit: handleSubmit5,
        formState: { errors },
      } = useForm({defaultValues:preloadedValues});
=======
>>>>>>> Stashed changes
    
    
  //Popup success message


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://i.postimg.cc/SQ6r3RmN/Paintbrushes.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

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
      </Grid>
    </ThemeProvider>
  );
};

//state to disable button, as soon as change happens 
//flash message update
//