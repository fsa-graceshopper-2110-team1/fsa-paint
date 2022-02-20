import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import NumberFormat from "react-number-format";
import { updateProduct } from "../../store";

const ProductHub = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(products);
  }, [products]);

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
  const columns = [
    {
      field: "status",
      headerName: "Status",
      type: "boolean",
      width: 100,
      editable: true,
      //   preProcessEditCellProps: (params) => {
      //     const isValid = !!params.props.value;
      //     return { ...params.props, error: !isValid };
      //   },
    },
    {
      field: "id",
      headerName: "ID",
      type: "number",
      width: 50,
      editable: false,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      width: 150,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "hexCode",
      headerName: "Hex Code",
      type: "string",
      width: 150,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid =
          !!params.props.value && params.props.value.startsWith("#");
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "category",
      headerName: "Category",
      type: "singleSelect",
      valueOptions: ["TODO: dropdown"],
      width: 150,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
      editable: true,
      renderCell: (params) => {
        return (
          <NumberFormat
            value={params.value / 100}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        );
      },
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "quantity",
      headerName: "Inventory",
      type: "number",
      width: 100,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      width: 150,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
  ];

  return (
    <div>
      <h3>Manage Products</h3>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
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
