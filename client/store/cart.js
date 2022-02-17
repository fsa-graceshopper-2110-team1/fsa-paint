import axios from "axios";

/**
 * ACTION TYPES
 */
const GOT_CART = "GOT_CART";
const LOGOUT_CART = "LOGOUT_CART";
const CREATED_CART = "CREATED_CART";
const ADDED_TO_CART = "ADDED_TO_CART";
const REMOVED_ITEM_FROM_CART = "REMOVED_ITEM_FROM_CART";
const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
const ADD_LOCALSTORAGE_TO_CART = "ADD_LOCALSTORAGE_TO_CART";

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

const createdCart = (cart) => ({
  type: CREATED_CART,
  cart,
});

const addedToCart = (cartItem) => ({
  type: ADDED_TO_CART,
  cartItem,
});

const removedItemFromCart = (cartItem) => ({
  type: REMOVED_ITEM_FROM_CART,
  cartItem,
});

const removedProductFromCart = (productId) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  productId,
});

export const addLocalStorageToCart = (localCart) => ({
  type: ADD_LOCALSTORAGE_TO_CART,
  localCart,
});

/**
 * THUNK CREATORS
 */

export const fetchCart = (userId) => {
  return async (dispatch) => {
    const { data: cart } = await axios.get(`/api/carts/user/${userId}`);
    return dispatch(gotCart(cart));
  };
};

export const createCart = (userId) => {
  return async (dispatch) => {
    const { data: cart } = await axios.post(`/api/carts`, { userId });
    dispatch(createdCart(cart));
  };
};

//TODO: accept userId instead of cartId so it works with localCart as well
//TODO: add logic to create a cart first if one doesnt exist yet (easier once we switch to userId param)
export const addToCart = (cartId, productId) => {
  return async (dispatch) => {
    const { data: cartItem } = await axios.post(`/api/cartItems`, {
      cartId,
      productId,
    });
    dispatch(addedToCart(cartItem));
  };
};

export const removeItemFromCart = (cartId, productId) => {
  return async (dispatch) => {
    const { data: cartItem } = await axios.delete(
      `/api/cartItems/removeOne/${cartId}/${productId}`
    );
    dispatch(removedItemFromCart(cartItem));
  };
};

export const removeProductFromCart = (cartId, productId) => {
  return async (dispatch) => {
    await axios.delete(`/api/cartItems/removeProduct/${cartId}/${productId}`);
    dispatch(removedProductFromCart(productId));
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart;
    case CREATED_CART:
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
    case REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        total:
          state.total -
          state.cartItems.filter((ci) => ci.productId === action.productId)
            .length *
            state.cartItems.filter((ci) => ci.productId === action.productId)[0]
              .price,
        cartItems: state.cartItems.filter(
          (ci) => ci.productId !== action.productId
        ),
      };
    case ADD_LOCALSTORAGE_TO_CART:
      return action.localCart;
    default:
      return state;
  }
}
