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
import { CartPage } from "./components/cart/CartPage";
import RequireAuth from "./components/Auth/RequireAuth";


/**
 * COMPONENT
 */
const Routes = () => {
  // // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
  // // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
  // const user = useSelector((state) => state.auth);
  // const isLoggedIn = !!user.id;

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(me());
  // }, [JSON.stringify(user)]);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Home} />
        <Route path="/signup" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/browse" component={Browse} />
        <Route path="/browse/:category" component={Category} />
        <Route path="/product/:productId" component={Product} />
        <Route path="/cart" component={CartPage} />
        <Route path="/shipping" element={ShippingForm} />
        <Redirect to="/home" />
      </Switch>
    </div>
  );
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
//export default withRouter(connect(mapState, mapDispatch)(Routes));
