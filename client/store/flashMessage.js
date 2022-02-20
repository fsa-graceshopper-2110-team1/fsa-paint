export const SET_FLASH_MESSAGE = "SET_FLASH_MESSAGE";

const initialState = {
  flashMessageOpen: false,
  flashMessageType: "success",
  flashMessageMessage: "",
};

export const setflashMessage = (
    flashMessageOpen,
    flashMessageType = "success",
    flashMessageMessage = ""
  ) => ({
    type: SET_FLASH_MESSAGE,
    flashMessageOpen,
    flashMessageType,
    flashMessageMessage,
  });

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FLASH_MESSAGE:
      const { flashMessageOpen, flashMessageMessage, flashMessageType } =
        action;
      return {
        ...state,
        flashMessageOpen,
        flashMessageType,
        flashMessageMessage,
      };
    default:
      return state;
  }
};


