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

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const authError = useSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(authenticate(data, "login"));
    navigate(state?.path || "/home");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ marginTop: 5 }}
        key={1}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              autoFocus
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
              {...register("password", { required: "Required field" })}
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
