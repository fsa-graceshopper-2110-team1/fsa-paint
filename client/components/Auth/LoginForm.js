import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
});

export const LoginForm = () => {
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors },
  } = useForm();

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        onSubmit={handleSubmit2((data) => alert(JSON.stringify(data)))}
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
              {...register2("email", {
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
              {...register2("password", { required: "Required field" })}
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
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
