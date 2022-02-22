import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { fetchAllUsers } from "../../store";
import moment from "moment";

const UserHub = () => {
  const users = useSelector((state) => state.admin.users);
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

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
    </Box>
  );
};

export default UserHub;
