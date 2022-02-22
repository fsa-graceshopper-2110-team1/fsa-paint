import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import OrderHubTable from "./OrderHubTable";

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

  return (
    <Box
      sx={{
        my: 4,
        mx: 4,
      }}
      component="div"
    >
      <h2>Your Orders</h2>
      {profile ? <OrderHubTable /> : <h3>Loading please wait..</h3>}
    </Box>
  );
};

export default OrderHub;
