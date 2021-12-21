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
      const res = await axios.post(`${HTTP_CONNECT}/admin/editUser`, newProfile, config);
      await dispatch(updateProfileAction(newProfile));
    } catch (err) {
      console.log(err)
    }
  };
};
const updateProfileAction = (data) => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};






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