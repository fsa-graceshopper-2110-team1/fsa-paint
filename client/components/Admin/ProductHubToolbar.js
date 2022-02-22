import React, { useState } from "react";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CreateProductModal from "./CreateProductModal";

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
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add product
      </Button>
      <CreateProductModal showModal={showModal} setShowModal={setShowModal} />
    </GridToolbarContainer>
  );
}

export default EditToolbar;
