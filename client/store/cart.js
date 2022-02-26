import axios from "axios";

/**
 * ACTION TYPES
 */
const GOT_CART = "GOT_CART";
const LOGOUT_CART = "LOGOUT_CART";
const CREATED_CART = "CREATED_CART";
const ADDED_TO_CART = "ADDED_TO_CART";
const REMOVED_ITEM_FROM_CART = "REMOVED_ITEM_FROM_CART";
const REMOVED_PRODUCT_FROM_CART = "REMOVED_PRODUCT_FROM_CART";
const REMOVED_LOCAL_ITEM_FROM_CART = "REMOVED_LOCAL_ITEM_FROM_CART";
const ADD_LOCALSTORAGE_TO_CART = "ADD_LOCALSTORAGE_TO_CART";
const DELETE_CART_AND_ITEMS = "DELETE_CART_AND_ITEMS";

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

const addedToCart = (cartItems) => ({
  type: ADDED_TO_CART,
  cartItems,
});

const removedItemFromCart = (cartItem) => ({
  type: REMOVED_ITEM_FROM_CART,
  cartItem,
});

const removedProductFromCart = (productId) => ({
  type: REMOVED_PRODUCT_FROM_CART,
  productId,
});

const removedLocalItemFromCart = (localCart) => ({
  type: REMOVED_LOCAL_ITEM_FROM_CART,
  localCart,
});

export const addLocalStorageToCart = (localCart) => ({
  type: ADD_LOCALSTORAGE_TO_CART,
  localCart,
});

export const deletedCartAndItems = () => ({
  type: DELETE_CART_AND_ITEMS,
});

/**
 * THUNK CREATORS
 */

export const fetchCart = (userId) => {
  return async (dispatch) => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    let { data: cart } = await axios.get(`/api/carts/user/${userId}`);
    if (!cart.id) {
      cart = await dispatch(createCart(userId));
    }
    if (cart.id && localCart) {
      await Promise.all(
        localCart.cartItems.map((ci) => {
          return dispatch(addToCart(cart.id, ci.productId, 1));
        })
      );
      localStorage.removeItem("cart");
      cart = (await axios.get(`/api/carts/user/${userId}`)).data;
    }
    return dispatch(gotCart(cart));
  };
};

export const createCart = (userId) => {
  return async (dispatch) => {
    const { data: cart } = await axios.post(`/api/carts`, { userId });
    dispatch(createdCart(cart));
    return cart;
  };
};

export const addToCart = (cartId, productId, quantity) => {
  return async (dispatch) => {
    let cartItems = [];
    //if cart item -1, it's a local cart
    if (cartId === -1) {
      const localCart = JSON.parse(localStorage.getItem("cart"));
      cartItems = new Array(quantity).fill("").map((ci) => {
        return { productId };
      });
      const localCartCopy = JSON.stringify({
        ...localCart,
        cartItems: [...localCart.cartItems, ...cartItems],
      });
      localStorage.setItem("cart", localCartCopy);
    } else {
      cartItems = (
        await axios.post(`/api/cartItems`, {
          cartId,
          productId,
          quantity,
        })
      ).data;
    }
    dispatch(addedToCart(cartItems));
  };
};

export const removeItemFromCart = (cartId, productId) => {
  return async (dispatch) => {
    let cartItem = {};
    if (cartId === -1) {
      const localCart = JSON.parse(localStorage.getItem("cart"));
      cartItem = { productId };
      const remainingProdCartItems = [...localCart.cartItems].filter(
        (ci) => ci.productId === productId
      );
      remainingProdCartItems.pop();
      const localCartCopy = {
        ...localCart,
        cartItems: [
          ...localCart.cartItems.filter((ci) => ci.productId !== productId),
          ...remainingProdCartItems,
        ],
      };
      localStorage.setItem("cart", JSON.stringify(localCartCopy));
      dispatch(removedLocalItemFromCart(localCartCopy));
    } else {
      const { data: cartItem } = await axios.delete(
        `/api/cartItems/removeOne/${cartId}/${productId}`
      );
      dispatch(removedItemFromCart(cartItem));
    }
  };
};

export const removeProductFromCart = (cartId, productId) => {
  return async (dispatch) => {
    if (cartId === -1) {
      const localCart = JSON.parse(localStorage.getItem("cart"));
      const localCartCopy = {
        ...localCart,
        cartItems: localCart.cartItems.filter(
          (ci) => ci.productId !== productId
        ),
      };
      localStorage.setItem("cart", JSON.stringify(localCartCopy));
    } else {
      await axios.delete(`/api/cartItems/removeProduct/${cartId}/${productId}`);
    }
    dispatch(removedProductFromCart(productId));
  };
};

export const deleteCartAndItems = (cartId) => {
  return async (dispatch) => {
    await axios.delete(`/api/carts/${cartId}`);
    dispatch(deletedCartAndItems());
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
      return {
        ...action.cart,
        cartItems: [],
      };
    case LOGOUT_CART:
      return {};
    case ADDED_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, ...action.cartItems],
      };
    case REMOVED_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((ci) => ci.id !== action.cartItem.id),
      };
    case REMOVED_LOCAL_ITEM_FROM_CART:
      return action.localCart;
    case REMOVED_PRODUCT_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (ci) => ci.productId !== action.productId
        ),
      };
    case ADD_LOCALSTORAGE_TO_CART:
      return action.localCart;
    case DELETE_CART_AND_ITEMS:
      return {};
    default:
      return state;
  }
}
