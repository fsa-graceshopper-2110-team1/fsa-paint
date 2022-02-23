import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import OrderHubTable from "./OrderHubTable";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";



const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
});

const OrderHub = () => {
  const profile = useSelector((state) => state.auth);
  const navigate = useNavigate()
  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        my: 4,
        mx: 4,
        minHeight:"100vh",
      }}
      component="div"
    >
      <h2>Your Orders</h2>
      {profile ? <OrderHubTable /> : <h3>Loading please wait..</h3>}
      <Button   sx={{marginTop:"20px"}}
                variant="contained"
                color="primary"
                onClick={() => navigate("/admin-hub")}>
                
      Back to Admin Hub
      </Button>
    </Box>
    </ThemeProvider>
  );
};

export default OrderHub;
