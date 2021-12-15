import { GET_USERS } from "./user.constant";

const initialState = {
  listUsers:[]
};
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return { ...state, listUsers: payload.data };
    default:
      return state;
  }
};
