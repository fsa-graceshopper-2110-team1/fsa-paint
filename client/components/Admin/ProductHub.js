import React from "react";
import { useSelector } from "react-redux";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const ProductHub = () => {
  const products = useSelector((state) => state.products);

  const GridRowsProp = products || [];

  const GridColDef = Object.keys(GridRowsProp[0] || {}).map((key) => {
    return {
      field: key,
      headerName: key.toUpperCase(),
      width: 150,
    };
  });

  return (
    <div>
      <h3>Manage Products</h3>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid rows={GridRowsProp} columns={GridColDef} />
      </div>
    </div>
  );
};

export default ProductHub;
