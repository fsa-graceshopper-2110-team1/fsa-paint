import React from "react";
import { Link } from "react-router-dom";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const MobileBrowse = () => {
  return (
    <Link to="browse">
        <Box component="div" sx={{ display: "flex" }}>
      <ColorLensIcon
        style={{
          color: "black",
          height: "30px",
          width: "30px",
          marginRight: 1,
        }}
      />
      <Typography
        sx={{
          fontFamily: "raleway",
          color: "black",
          marginLeft: 1,
        }}
      >
        Browse All
      </Typography>
      </Box>
    </Link>
  );
};
