import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

export const CategoryList = (props) =>{
    const {categories} = props
    return(
        <div>
                  {categories.map((cat) => {
                    return (
                      <Link
                        to={`/browse/${cat.toLowerCase()}`}
                        key={cat}
                        color="secondary"
                      >
                        <MenuItem>
                          <Typography
                            sx={{
                              fontFamily: "raleway",
                              marginLeft: 0.5,
                              color: "black",
                            }}
                          >
                            {cat}s
                          </Typography>
                        </MenuItem>
                      </Link>
                    );
                  })}
                </div>
    )
}