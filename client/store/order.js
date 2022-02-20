import axios from "axios";

/**
 * ACTION TYPES
 */
const GOT_USER_ORDERS = "GOT_USER_ORDERS";
const CREATED_ORDER = "CREATED_ORDER";

/**
 * ACTION CREATORS
 */
const gotUserOrders = (orders) => ({
  type: GOT_USER_ORDERS,
  orders,
});

const createdOrder = (order) => ({
  type: CREATED_ORDER,
  order,
});

/**
 * THUNK CREATORS
 */

export const fetchOrders = (userId) => {
  return async (dispatch) => {
    let { data: orders } = await axios.get(`/api/orders/user/${userId}`);
    return dispatch(gotUserOrders(orders));
  };
};

export const createOrder = (userId, cartId) => {
  return async (dispatch) => {
    const { data: order } = await axios.post(`/api/orders`, { userId, cartId });
    dispatch(createdOrder(order));
    return order;
  };
};

/**
 * REDUCER
 */
export default function (state = { all: [], current: {} }, action) {
  switch (action.type) {
    case GOT_USER_ORDERS:
      return { ...state, all: action.orders };
    case CREATED_ORDER:
      return { ...state, current: action.order };
    default:
      return state;
  }
}
