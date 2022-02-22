import React from "react";
import ProductHub from "./ProductHub";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const AdminHub = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      component="main"
      sx={{ height: "70vh", width: "100vw", m: 1 }}
    >
      <h3>Admin Hub</h3>
      <Grid item xs={12} sm={12} sx={{ justifyItems: "center" }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => navigate("/product-hub")}
        >
          Manage Products
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ justifyItems: "center" }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => navigate("/order-hub")}
        >
          View Orders
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ justifyItems: "center" }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => navigate("/user-hub")}
        >
          View Users
        </Button>
      </Grid>
    </Grid>
  );
};

export default AdminHub;
