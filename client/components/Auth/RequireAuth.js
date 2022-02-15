import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { me } from "../../store";

const RequireAuth = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [auth, setAuth] = useState({ auth: "not fetched" });

  const user = useSelector((state) => state.auth);

  useEffect(async () => {
    await dispatch(me());
    setAuth(user);
  }, [JSON.stringify(user)]);

  return auth.auth === "not fetched" ? (
    "Loading access credentials..."
  ) : user.id ? (
    children
  ) : (
    <Navigate to="/login" state={{ path: location.pathname }} />
  );
  //TODO: once we have an actual login route, we'll want to add a navigate(state?.path || '/home') to the submit button to get them back to the page that took them to login
};

export default RequireAuth;
