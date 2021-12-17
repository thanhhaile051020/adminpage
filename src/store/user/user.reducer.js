import { GET_USERS, CHANGE_STATUS_USER_SUCCESS } from "./user.constant";

const initialState = {
  listUsers: [],
};
export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return { ...state, listUsers: payload.data };
    case CHANGE_STATUS_USER_SUCCESS:
      let newListUsers = state.listUsers;
      newListUsers = newListUsers.map((user) => {
        if (user._id !== payload.userId) return user;
        user.status = payload.status;
        return user;
      });
      return { ...state, listUsers: newListUsers };
    default:
      return state;
  }
};
