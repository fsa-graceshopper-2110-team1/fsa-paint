import axios from "axios";

/**
 * ACTION TYPES
 */
const GOT_CART = "GOT_CART";
const GOT_CART_ITEMS = "GOT_CART_ITEMS";

/**
 * ACTION CREATORS
 */
const gotCart = (cart) => ({
  type: GOT_CART,
  cart,
});

/**
 * THUNK CREATORS
 */
export const fetchCart = (userId) => {
  return async (dispatch) => {
    const { data: cart } = await axios.get(`/api/carts/user/${userId}`);
    dispatch(gotCart(cart));
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart;
    default:
      return state;
  }
}
