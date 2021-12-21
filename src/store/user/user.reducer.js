import {
  GET_USERS,
  CHANGE_STATUS_USER_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
} from "./user.constant";

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
    case UPDATE_PROFILE_SUCCESS:
      let newList = state.listUsers.map((user) => {
        if (user._id == payload.userId) {
          user = { ...user, ...payload.data };
        }
        return user;
      });
      return { ...state, listUsers: newList };
    default:
      return state;
  }
};
