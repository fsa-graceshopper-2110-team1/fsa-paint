import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchCart } from "../store";

/**
 * COMPONENT
 */
export const Home = () => {
  const user = useSelector((state) => state.auth);

  // const dispatch = useDispatch();

  // useEffect(() => dispatch(fetchCart(user.id)), [{}]);

  return (
    <div>
      <h3>Welcome, {user.firstName}</h3>
    </div>
  );
};
export default Home;
