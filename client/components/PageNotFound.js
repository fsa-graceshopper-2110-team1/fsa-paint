import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        marginTop: 20,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Box component={"h1"}>Page not found!</Box>
        <Box component={"h4"}>
          Sorry, but the page you were looking for could not be found.
        </Box>
        <Box component={"div"} sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ marginRight: 0.5 }}>{"You can"}</Box>
          <Link to={"/browse"}>{"browse more paints,"}</Link>
          <Box sx={{ marginLeft: 0.5, marginRight: 0.5 }}>or</Box>
          <Link to={"/home"}>return to our homepage</Link>
          <Box sx={{ marginLeft: 0.5 }}>
            if you can't find what you're looking for.
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
