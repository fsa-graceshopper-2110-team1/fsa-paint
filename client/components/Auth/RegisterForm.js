import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const authError = useSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const authed = await dispatch(authenticate(data, "signup"));
    //authed === undefined when authenticate is successful
    //close modal if auth is successful
    console.log(authed);
    if (!authed) navigate(state?.path || "/home");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ marginTop: 5 }}
        key={2}
      >
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              autoFocus
              {...register("firstName", { required: "Required field" })}
              error={!!errors?.firstName}
              helperText={errors?.firstName ? errors.firstName.message : null}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              {...register("lastName", { required: "Required field" })}
              error={!!errors?.lastName}
              helperText={errors?.lastName ? errors.lastName.message : null}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              {...register("email", {
                required: "Required field",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              {...register("password", {
                required: "Required field",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                  message:
                    "Password must have minimum 8 characters, at least one letter and one number. No special characters.",
                },
              })}
              error={!!errors?.password}
              helperText={errors?.password ? errors.password.message : null}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            {authError && authError.response && (
              <div> {authError.response.data} </div>
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
