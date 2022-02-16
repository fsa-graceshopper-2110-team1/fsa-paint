import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
    palette: {
      primary: {
        light: "#FFFFFF",
        main: "#EDF2FB",
      },
    },
  });


export const MyAccount = ()=>{
    const {
        register: register5,
        handleSubmit: handleSubmit5,
        formState: { errors },
      } = useForm();
    
    return(
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
              "url(https://i.postimg.cc/15gp3ZSw-/Cozy-Dining-Space-MYSTERIOUS-676x751.jpg)",

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
            component="form"
            // onSubmit={handleSubmit5(onSubmit)}
            key={4}
          >
            <h2>Account Information</h2>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  autoFocus
                  {...register5("firstName", { required: true })}
                  id="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  {...register5("lastName", { required: true })}
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  {...register5("email", { required: true })}
                  label="Email"
                  fullWidth
                  autoComplete="email"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="password"
                  {...register5("password", { required: true })}
                  label="Password"
                  fullWidth
                  autoComplete="password"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Update Information
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    )
}