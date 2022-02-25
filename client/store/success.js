import axios from "axios";

export const SET_SUCCESS = "SET_SUCCESS";

const initialState = {
  customer: "",
  session: "",
};

export const setSuccess = (customer, session) => ({
  type: SET_SUCCESS,
  customer,
  session,
});

export const fetchSuccess = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`success/success`);
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUCCESS:
      const { customer, session } = action;
      return {
        ...state,
        customer,
        session,
      };
    default:
      return state;
  }
};
