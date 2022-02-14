import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { me } from "../../store";

const RequireAuth = ({ children }) => {
  // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
  // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
  const user = useSelector((state) => state.auth);
  const authed = !!user.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, [JSON.stringify(user)]);

  return authed === true ? children : <Navigate to="/home" replace />;
};

export default RequireAuth;
