import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { updateProduct } from "../../store";

const ProductHub = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(products);
  }, [products]);

  //   const dispatchProductPromise = () => {
  //     return useCallback(
  //       (product) => new Promise((resolve) => resolve(product)),
  //       []
  //     );
  //   };

  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const handleCellEditCommit = async (params) => {
    try {
      // Dispatch product update
      const response = await dispatch(
        updateProduct({
          id: params.id,
          [params.field]: params.value,
        })
      );

      setSnackbar({
        children: "Product successfully saved",
        severity: "success",
      });
      setRows((prev) =>
        prev.map((row) =>
          row.id === params.id ? { ...row, ...response } : row
        )
      );
    } catch (error) {
      console.log(error);
      setSnackbar({
        children: "Error while saving product",
        severity: "error",
      });
      // Restore the row in case of error
      setRows((prev) => [...prev]);
    }
  };

  const locked = ["id", "createdAt", "updatedAt"];
  const GridColDef = Object.keys(rows[0] || {}).map((key) => {
    return {
      field: key,
      headerName: key.toUpperCase(),
      width: 150,
      editable: locked.indexOf(key) === -1 ? true : false,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    };
  });

  return (
    <div>
      <h3>Manage Products</h3>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={GridColDef}
          experimentalFeatures={{ preventCommitWhileValidating: true }}
          onCellEditCommit={handleCellEditCommit}
        />
        {!!snackbar && (
          <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    </div>
  );
};

export default ProductHub;
