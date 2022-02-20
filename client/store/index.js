import { createStore, combineReducers, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import products from "./product";
import cart from "./cart";
import flashMessage from "./flashMessage";

const reducer = combineReducers({ auth, products, cart,flashMessage });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./product";
export * from "./cart";
export * from './flashMessage'