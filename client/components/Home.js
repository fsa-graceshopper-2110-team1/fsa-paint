import React from "react";
import { connect, useSelector } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const user = useSelector((state) => state.auth);
  return (
    <div>
      <h3>Welcome, {user.firstName}</h3>
    </div>
  );
};
export default Home;
