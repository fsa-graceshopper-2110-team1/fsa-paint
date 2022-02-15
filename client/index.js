import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51KS1GcCiy0ClSb4n0VHd5xuu1TlFpuAyHWpRc96J5ErkJka2NOjNKD2avRP5U3S1ImPnTtEuxnCm7rXRn5J1m1f100dXwxUlf3")

ReactDOM.render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Provider>,
  document.getElementById("app")
);
