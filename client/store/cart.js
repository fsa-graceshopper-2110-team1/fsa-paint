import axios from "axios";

/**
 * ACTION TYPES
 */
const GOT_CART = "GOT_CART";
const LOGOUT_CART = "LOGOUT_CART";

/**
 * ACTION CREATORS
 */
const gotCart = (cart) => ({
  type: GOT_CART,
  cart,
});

export const logoutCart = () => ({
  type: LOGOUT_CART,
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
    case LOGOUT_CART:
      return {};
    default:
      return state;
  }
}
