import { GET_USER } from "./constants";

export const getUser = (payload) => ({
  type: GET_USER,
  payload,
});
