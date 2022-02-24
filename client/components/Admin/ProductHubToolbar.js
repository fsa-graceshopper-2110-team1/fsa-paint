import React, { useState } from "react";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CreateProductModal from "./CreateProductModal";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "Raleway",
  },
});

function EditToolbar(props) {
  //MODAL
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleClick = () => {
    openModal();
  };

  return (
    <ThemeProvider theme={theme}>
      <GridToolbarContainer>
        <Button color="secondary" startIcon={<AddIcon />} onClick={handleClick}>
          Add product
        </Button>
        <CreateProductModal showModal={showModal} setShowModal={setShowModal} />
      </GridToolbarContainer>
    </ThemeProvider>
  );
}

export default EditToolbar;
