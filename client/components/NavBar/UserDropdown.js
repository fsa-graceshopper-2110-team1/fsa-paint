import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";


export const UserDropdown = (props) =>{
    const navigate = useNavigate();
    const {user} = props
    return(
        <div>
            <Link to="my-account">
            <MenuItem>
              <Avatar sx={{ height: "30px", width: "30px", marginRight: 1 }} />
              <Typography
                sx={{
                  fontFamily: "raleway",
                  marginLeft: 0.5,
                  color: "black",
                }}
              >
                My account
              </Typography>
            </MenuItem>
          </Link>
          <Link to="orders">
            <MenuItem>
              <Avatar sx={{ height: "30px", width: "30px", marginRight: 1 }} />
              <Typography
                sx={{
                  fontFamily: "raleway",
                  marginLeft: 0.5,
                  color: "black",
                }}
              >
                My orders
              </Typography>
            </MenuItem>
          </Link>
          {user.isAdmin ? (
            <MenuItem
              onClick={() => {
                navigate("/admin-hub");
              }}
            >
              <ListItemIcon>
                <AdminPanelSettingsIcon fontSize="large" />
              </ListItemIcon>
              <Typography
                sx={{
                  fontFamily: "raleway",
                  marginLeft: 0.5,
                  color: "black",
                }}
              >
                Admin Hub
              </Typography>
            </MenuItem>
          ) : null}
        </div>
    )
}