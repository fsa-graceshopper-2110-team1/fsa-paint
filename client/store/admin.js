import axios from "axios";

/**
 * ACTION TYPES
 */
const GOT_ALL_USERS = "GOT__ALL_USERS";
const GOT_ALL_ORDERS = "GOT_ALL_ORDERS";

/**
 * ACTION CREATORS
 */
const gotAllUsers = (users) => ({ type: GOT_ALL_USERS, users });
const gotAllOrders = (orders) => ({ type: GOT_ALL_ORDERS, orders });

/**
 * THUNK CREATORS
 */
export const fetchAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get(`/api/users`);
      dispatch(gotAllUsers(users));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchAllOrders = () => {
  return async (dispatch) => {
    try {
      const { data: orders } = await axios.get(`/api/orders`);
      dispatch(gotAllOrders(orders));
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * REDUCER
 */
export default function (state = { users: [], orders: [] }, action) {
  switch (action.type) {
    case GOT_ALL_USERS:
      return { ...state, users: action.users };
    case GOT_ALL_ORDERS:
      return { ...state, orders: action.orders };
    default:
      return state;
  }
}
