import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { fetchAllUsers } from "../../store";
import moment from "moment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
  typography: {
    fontFamily: "Raleway",
  },
});

const UserHub = () => {
  const users = useSelector((state) => state.admin.users);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  useEffect(() => {
    setRows(users);
  }, [users]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      minWidth: 80,
      flex: 0.25,
    },
    {
      field: "firstName",
      headerName: "First Name",
      type: "string",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      type: "string",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Registration Date",
      type: "date",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => {
        return moment(params.value).format("L");
      },
    },
    {
      field: "isAdmin",
      headerName: "Admin?",
      type: "boolean",
      minWidth: 50,
      flex: 0.25,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          my: 4,
          mx: 4,
        }}
        component="div"
      >
        <h3>View Users</h3>
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
        <Button
          sx={{ marginTop: "20px" }}
          variant="contained"
          color="primary"
          onClick={() => navigate("/admin-hub")}
        >
          Back to Admin Hub
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default UserHub;
