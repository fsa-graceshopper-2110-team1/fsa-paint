import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/Auth/AuthForm";
import Home from "./components/Home";
import { ShippingForm } from "./components/ShippingForm";
import Browse from "./components/Browse";
import Category from "./components/Category";
import Product from "./components/Product";
import { me } from "./store";
import { CartPage } from "./components/CartPage";

/**
 * COMPONENT
 */
const Routes = () => {
  // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
  // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
  const user = useSelector((state) => state.auth);
  const isLoggedIn = !!user.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, [JSON.stringify(user)]);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/shipping" component={ShippingForm} />
          <Route path="/browse/:category" component={Category} />
          <Route path="/browse" component={Browse} />
          <Route path="/product/:productId" component={Product} />
          <Route path="/cart" component={CartPage} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      )}
    </div>
  );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
//export default withRouter(connect(mapState, mapDispatch)(Routes));
