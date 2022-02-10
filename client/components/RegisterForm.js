import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

export const RegisterForm = () => {

  const { register:register3, handleSubmit:handleSubmit3 } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit3(onSubmit)}
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
            {...register3("firstName", { required: true })}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            {...register3("lastName", { required: true })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            {...register3("email", { required: true })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            {...register3("password", { required: true, minLength: 8 })}
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

  );
};