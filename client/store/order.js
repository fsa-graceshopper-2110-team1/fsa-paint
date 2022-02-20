import axios from "axios";

/**
 * ACTION TYPES
 */
const GOT_USER_ORDERS = "GOT_USER_ORDERS";
const CREATED_ORDER = "CREATED_ORDER";
const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";

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

const updatedOrderStatus = (status) => ({
  type: UPDATE_ORDER_STATUS,
  status,
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

export const updateOrderStatus = (orderId, status) => {
  return async (dispatch) => {
    await axios.put(`/api/orders/${orderId}/status`, status);
    dispatch(updatedOrderStatus(status));
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
    case UPDATE_ORDER_STATUS:
      return { ...state, current: { ...state.current, status: action.status } };
    default:
      return state;
  }
}
