import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { setflashMessage } from "../store";

export const FlashMessage = () => {
  const dispatch = useDispatch();
  const flashMessageOpen = useSelector(
    (state) => state.flashMessage.flashMessageOpen
  );
  const flashMessageType = useSelector(
    (state) => state.flashMessage.flashMessageType
  );
  const flashMessageMessage = useSelector(
    (state) => state.flashMessage.flashMessageMessage
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setflashMessage(false, flashMessageType, flashMessageMessage));
  };
  // console.log("THIS IS WHATS BEING PASSED IN",flashMessageOpen)
  return (
    <Snackbar
      open={flashMessageOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      style={{ height: "20%" }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert onClose={handleClose} severity={flashMessageType}>
        <AlertTitle>Success</AlertTitle>
        {flashMessageMessage}
      </Alert>
    </Snackbar>
  );
};
