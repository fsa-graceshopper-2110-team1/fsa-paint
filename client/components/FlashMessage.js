import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';

export const FlashMessage = () => {
  const [open, setOpen] = useState(true);


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} style={{ height: "20%" }}
      anchorOrigin={{
         vertical: "top",
         horizontal: "center"
      }}>
        <Alert onClose={handleClose} severity="success">
          <AlertTitle>Success</AlertTitle>
          You have successfully updated your profile
        </Alert>
        </Snackbar>
  );
};
