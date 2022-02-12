import axios from "axios";

/**
 * ACTION TYPES
 */
const GOT_CART = "GOT_CART";
const LOGOUT_CART = "LOGOUT_CART";
const ADDED_TO_CART = "ADDED_TO_CART";
const REMOVED_ITEM_FROM_CART = "REMOVED_ITEM_FROM_CART";

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

const addedToCart = (cartItem) => ({
  type: ADDED_TO_CART,
  cartItem,
});

const removedItemFromCart = (cartItem) => ({
  type: REMOVED_ITEM_FROM_CART,
  cartItem,
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

export const addToCart = (cartId, productId) => {
  return async (dispatch) => {
    const { data: cartItem } = await axios.post(`/api/cartItems`, {
      cartId,
      productId,
    });
    dispatch(addedToCart(cartItem));
  };
};

export const removeItemFromCart = (cartItem) => {
  return async (dispatch) => {
    await axios.delete(`/api/cartItems/${cartItem.id}`);
    dispatch(removedItemFromCart(cartItem));
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
    case ADDED_TO_CART:
      return {
        ...state,
        total: state.total + action.cartItem.price,
        cartItems: [...state.cartItems, action.cartItem],
      };
    case REMOVED_ITEM_FROM_CART:
      return {
        ...state,
        total: state.total - action.cartItem.price,
        cartItems: state.cartItems.filter((ci) => ci.id !== action.cartItem.id),
      };
    default:
      return state;
  }
}
