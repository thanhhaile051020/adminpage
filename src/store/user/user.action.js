import axios from "axios";
import { HTTP_CONNECT } from "config";
import {
  GET_USER_PROFILE,
  UPDATE_PROFILE_FAIL,
  GET_USER_CURRENT_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  FRIEND_REQUEST_SUCCESS,
  FRIEND_REQUEST_RESPONE_SUCCESS,
  GET_FRIEND_REQUEST_SUCCESS,
  UNFRIEND_SUCCESS,
  GET_IMAGE_USE_SUCCESS,
  GET_USERS,
  CHANGE_STATUS_USER_SUCCESS
} from "store/user/user.constant";
import { useSelector } from "react-redux";
import { setNotify } from "../common/common.action";

const config = {
  headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTRmMTkyZmIxMzAzYjFjMjk3ZjZiOGUiLCJleHBpcmVkIjoiMjg0My0wNC0wN1QwOTo0ODo0MS4yODZaIiwiaWF0IjoxNjM3NTc0NTIxfQ.y1bCniwp7d1elw6SCqkhJmeNyMy2dsVGMCojO69-5EU` },
};

export const getUsers = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${HTTP_CONNECT}/admin/getUsers`,

        config
      );
      await dispatch(getUsersSuccess(res.data));
    } catch (err) {
      console.log(err)
    }
  };
};
const getUsersSuccess = (data) => {
  return { type: GET_USERS, payload: data };
};
export const getUserCurrentProfile = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${HTTP_CONNECT}/users/profile`,
        config
      );
      await dispatch(getUserCurrentProfileAction(res.data));
    } catch (err) {
      dispatch(getUserCurrentProfileAction(err.response));
    }
  };
};
const getUserProfileAction = (data) => {
  return { type: GET_USER_PROFILE, payload: data };
};
const getUserCurrentProfileAction = (data) => {
  return { type: GET_USER_CURRENT_PROFILE, payload: data };
};
// UPDATE USER
export const updateProfile = (newProfile) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`${HTTP_CONNECT}/users/`, newProfile, config);
      await dispatch(updateProfileAction(res));
      await dispatch(setNotify(res.status));
    } catch (err) {
      dispatch(setNotify(err.response.status));
    }
  };
};
const updateProfileAction = (data) => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};

export const friendRequest = (data) => {
  return async (dispatch, getState) => {
    try {
      const profile = getState().userReducer.profileCurentUser;
      const res = await axios.post(
        `${HTTP_CONNECT}/users/friendRequest`,
        data,
        config
      );
      await dispatch(
        friendRequestAction({
          ...data,
          user: { _id: profile._id },
          createAt: Date.now(),
        })
      );
    } catch (err) {
      console.log(err)
    }
  };
};
export const friendRequestRespone = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${HTTP_CONNECT}/users/friendRespone`,
        data,
        config
      );
      if (res.status == 200) {
        await dispatch(getUserCurrentProfile());
      }
    } catch (err) {
      console.log(err)
    }
  };
};
export const unfriend = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${HTTP_CONNECT}/users/unfriend`,
        data,
        config
      );
      if (res.status == 200) {
        await dispatch(unfriendSuccess(data));
      }
    } catch (err) {
      console.log(err)
    }
  };
};
const unfriendSuccess = (data) => {
  console.log(data);
  return {
    type: UNFRIEND_SUCCESS,
    payload: data,
  };
};
const friendRequestAction = (data) => {
  console.log(data);
  return {
    type: FRIEND_REQUEST_SUCCESS,
    payload: data,
  };
};
export const getFriendsRequest = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${HTTP_CONNECT}/users/getFriendRequest`,
        config
      );
      console.log(res, "res");
      await dispatch(getFriendsRequestSuccess(res.data));
    } catch (err) {
      console.log(err)
    }
  };
};
const getFriendsRequestSuccess = (data) => {
  return {
    type: GET_FRIEND_REQUEST_SUCCESS,
    payload: data,
  };
};
const friendRequestResponeAction = (data) => {
  return {
    type: FRIEND_REQUEST_RESPONE_SUCCESS,
    payload: data,
  };
};
export const getImageUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${HTTP_CONNECT}/upload/getAllMediaByUserId?userId=${data}`,
        config
      );
      console.log(res, "res");
      await dispatch(getImageUserSuccess(res.data));
    } catch (err) {
      console.log(err)
    }
  };
};
const getImageUserSuccess = (data)=>{
  return{
    type:GET_IMAGE_USE_SUCCESS,
    payload:data
  }
}

export const changeStatusUser = (data)=>{
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${HTTP_CONNECT}/admin/editStatusUser`,
        data,
        config
      );
      console.log(res, "res");
      await dispatch(changeStatusUserSuccess(data));
    } catch (err) {
      console.log(err)
    }
  };
}

const changeStatusUserSuccess = (data)=>{
  return{
    type:CHANGE_STATUS_USER_SUCCESS,
    payload:data
  }
}