import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
});

const CreateProductForm = ({ path, setShowModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const products = useSelector((state) => state.products);
  const categories = [...new Set(products.map((product) => product.category))];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const product = await dispatch(createProduct(data));

    // product === undefined when create is successful
    // close modal if create is successful
    if (!product) {
      navigate(path || location.pathname);
      setShowModal(false);
    }
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
              id="name"
              label="Name"
              variant="outlined"
              autoFocus
              {...register("name", {
                required: "Required field",
              })}
              error={!!errors?.name}
              helperText={errors?.name ? errors.name.message : null}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="hexCode"
              label="Hex Code"
              variant="outlined"
              {...register("hexCode", {
                required: "Required field",
                pattern: {
                  value: /^#/,
                  message: "Invalid Hex Code (must start with #)",
                },
              })}
              error={!!errors?.hexCode}
              helperText={errors?.hexCode ? errors.hexCode.message : null}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="price"
              label="Price (in cents)"
              variant="outlined"
              {...register("price", {
                required: "Required field",
                inputMode: "numeric",
                pattern: {
                  value: /[0-9]+/,
                  message: "Invalid Price (enter the amount in cents)",
                },
              })}
              error={!!errors?.price}
              helperText={errors?.price ? errors.price.message : null}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="quantity"
              label="Inventory Quantity"
              variant="outlined"
              {...register("quantity", {
                required: "Required field",
                inputMode: "numeric",
                pattern: {
                  value: /[0-9]+/,
                  message: "Invalid Quantity",
                },
              })}
              error={!!errors?.quantity}
              helperText={errors?.quantity ? errors.quantity.message : null}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              {...register("description", {
                required: "Required field",
              })}
              error={!!errors?.description}
              helperText={
                errors?.description ? errors.description.message : null
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            {/* the code below is if we wanted to try to fix a dropdown of categories */}
            {/* <TextField
              id="category"
              label="Category"
              select
              variant="outlined"
              {...register("category", {
                required: "Required field",
              })}
              error={!!errors?.category}
              helperText={errors?.category ? errors.category.message : null}
              fullWidth
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <TextField
              id="category"
              label="Category"
              variant="outlined"
              {...register("category", {
                required: "Required field",
              })}
              error={!!errors?.category}
              helperText={errors?.category ? errors.category.message : null}
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

export default CreateProductForm;
