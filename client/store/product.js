import axios from "axios";

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = "GOT_PRODUCTS";

/**
 * ACTION CREATORS
 */
const gotProducts = (products) => ({
  type: GOT_PRODUCTS,
  products,
});

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
  return async (dispatch) => {
    const { data: products } = await axios.get("/api/products");
    dispatch(gotProducts(products));
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
