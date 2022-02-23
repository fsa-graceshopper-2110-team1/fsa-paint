import React from "react";
import ProductHub from "./ProductHub";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
});

const AdminHub = () => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={8} >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}
            component="div"
          >
            <h2>Admin Hub</h2>
            <Grid item xs={12} sm={12} sx={{ justifyItems: "center",marginBottom:"30px",width:"200px" }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => navigate("/product-hub")}
              >
                Manage Products
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ justifyItems: "center",marginBottom:"30px",width:"200px" }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => navigate("/order-hub")}
              >
                View Orders
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ justifyItems: "center",width:"200px" }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => navigate("/user-hub")}
              >
                View Users
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={4}
          sx={{
            backgroundImage:
              "url(https://i.postimg.cc/FzkpgFYJ/architecture-2561570-1280.jpg)",
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

export default AdminHub;
