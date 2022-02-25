import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ImagesearchRollerOutlinedIcon from "@mui/icons-material/ImagesearchRollerOutlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import LandscapeIcon from "@mui/icons-material/Landscape";
import IconButton from "@mui/material/IconButton";

export default function ProductReviews() {
    return (
      <div>
        <Grid container
          justifyContent= "center"
          sx={{ backgroundColor: "white"}}
        >
          <Grid item xs={1} sm={2} md={1} style={{textAlign: "center"}}>
            <h2>Reviews</h2>
          </Grid>
        </Grid>
        <Grid container 
          justifyContent= "center"
          sx={{  backgroundColor: "white", my:"5"}}>
          <Grid item xs={12} sm={8} md={2} style={{textAlign: "center"}}> 
            <StarRateIcon fontSize="medium" />
              <StarRateIcon fontSize="medium" />
              <StarRateIcon fontSize="medium" />
              <StarHalfIcon fontSize="medium" />
              <StarOutlineIcon fontSize="medium" />
          </Grid>
        </Grid>
        <Grid >
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <Box sx={{mx:"3vh", my: "1vh"}}>
              <h5>Nancy</h5>
              <StarRateIcon fontSize="small" />
              <StarRateIcon fontSize="small" />
              <StarRateIcon fontSize="small" />
              <StarRateIcon fontSize="small" />
              <StarOutlineIcon fontSize="small" />
              <h4>Full Coverage</h4>
              <p>
                Only needed two coats to cover a dark colored wall. Happy with
                the results, it worked great in my living room. Make sure to
                test it in the light because it looks very different with
                natural light and artificial light.
              </p>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
}