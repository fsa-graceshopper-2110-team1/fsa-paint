import axios from "axios";

/**
 * ACTION TYPES
 */
const GOT_USER_ORDERS = "GOT_USER_ORDERS";
const CREATED_ORDER = "CREATED_ORDER";
const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";
const GOT_LATEST_ORDER = "GOT_LATEST_ORDER";

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

//need this in case of a hard refresh during create order flow
const gotLatestOrder = (order) => ({
  type: GOT_LATEST_ORDER,
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

export const createOrder =
  (userId, cartId, shippingAddress) => async (dispatch) => {
    try {
      const { data: order } = await axios.post(`/api/orders`, {
        userId,
        cartId,
        shippingAddress,
      });
      dispatch(createdOrder(order));
      return order;
    } catch (err) {
      return dispatch(createdOrder({ error: "Item out of stock" }));
    }
  };

export const updateOrderStatus = (orderId, status) => {
  return async (dispatch) => {
    await axios.put(`/api/orders/${orderId}/status`, { status });
    dispatch(updatedOrderStatus(status));
  };
};

export const fetchLatestOrder = (userId) => {
  return async (dispatch) => {
    let { data: order } = await axios.get(`/api/orders/user/${userId}/latest`);
    dispatch(gotLatestOrder(order));
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
    case UPDATE_ORDER_STATUS:
      return { ...state, current: { ...state.current, status: action.status } };
    case GOT_LATEST_ORDER:
      return { ...state, current: action.order };
    default:
      return state;
  }
}
