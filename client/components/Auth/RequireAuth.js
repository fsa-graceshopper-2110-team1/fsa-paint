import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { me } from "../../store";

const RequireAuth = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
  // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
  const user = useSelector((state) => state.auth);

  let auth;
  useEffect(() => {
    dispatch(me());
    auth = true;
  }, [JSON.stringify(user)]);

  console.log(user);

  return auth === undefined ? (
    "loading"
  ) : user.id ? (
    children
  ) : (
    <Navigate to="/login" state={{ path: location.pathname }} />
  );
  //TODO: once we have an actual login route, we'll want to add a navigate(state?.path || '/home') to the submit button to get them back to the page that took them to login
};

export default RequireAuth;
