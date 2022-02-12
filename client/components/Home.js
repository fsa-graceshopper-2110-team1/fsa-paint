import React from "react";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */
export const Home = () => {
  const user = useSelector((state) => state.auth);

  return (
    <div>
      <h3>Welcome, {user.firstName}</h3>
    </div>
  );
};
export default Home;
