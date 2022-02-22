import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { updateProduct } from "../../store";
import EditToolbar from "./ProductHubToolbar";
import Box from "@mui/material/Box";
import { fetchUsers } from "../../store";

const UserHub = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
    setRows(users);
  }, [users]);

  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const handleCellEditCommit = async (params) => {
    try {
      const currentRow = rows.find((row) => row.id === params.id);
      if (currentRow[params.field] !== params.value) {
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
      }
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
      minWidth: 80,
      flex: 0.25,
      editable: true,
    },
    {
      field: "id",
      headerName: "ID",
      type: "number",
      minWidth: 80,
      flex: 0.25,
      editable: false,
      renderCell: (params) => {
        return <Link to={`/product/${params.value}`}>{params.value}</Link>;
      },
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      minWidth: 150,
      flex: 0.75,
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
      minWidth: 150,
      flex: 0.75,
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
      valueOptions: categories,
      minWidth: 100,
      flex: 0.75,
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
      minWidth: 100,
      flex: 0.5,
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
      minWidth: 100,
      flex: 0.5,
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
      minWidth: 200,
      flex: 2,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
  ];

  return (
    <Box
      sx={{
        my: 4,
        mx: 4,
      }}
      component="div"
    >
      <h3>Manage Products</h3>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          experimentalFeatures={{ preventCommitWhileValidating: true }}
          onCellEditCommit={handleCellEditCommit}
          components={{
            Toolbar: EditToolbar,
          }}
        />
        {!!snackbar && (
          <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    </Box>
  );
};

export default UserHub;
