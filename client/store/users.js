import axios from "axios";

/**
 * ACTION TYPES
 */
const GOT_USERS = "GOT_USERS";

/**
 * ACTION CREATORS
 */
const gotUsers = (users) => ({ type: GOT_USERS, users });

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get(`/api/users/`);
      dispatch(gotUsers(users));
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GOT_USERS:
      return action.users;
    default:
      return state;
  }
}
