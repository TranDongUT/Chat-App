import { GET_USER } from "./constants";

export const initialState = {
  user: {},
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      throw new Error("invalid action");
  }
};
