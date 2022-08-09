import * as api from "../api";
import { toast } from "react-toastify";

export const signIn = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(userData);
    dispatch({ type: "SIGN_IN", payload: data });
    navigate("/");
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};

export const signUp = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(userData);
    dispatch({ type: "SIGN_UP", payload: data });
    navigate("/");
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};

export const updateProfilePic = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateProfilePic(formData);
    dispatch({ type: "UPDATE_PROFILE_PIC", payload: data.updatedUser });
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};

export const getUsers = (ids) => async (dispatch) => {
  // console.log(ids);
  try {
    const res = await api.getUsers(ids);
    dispatch({ type: "GET_USERS", payload: res.data.users });
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserById(id);
    dispatch({ type: "GET_USER_BY_ID", payload: data.user });
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};

export const toggleFollow = (id) => async (dispatch) => {
  console.log(id);
  try {
    const { data } = await api.toggleFollow(id);
    dispatch({ type: "FOLLOW", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(formData);
    dispatch({ type: "UPDATE_USER", payload: data.updatedUser });
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};

export const updatePassword = async (formData, navigate) => {
  try {
    const { data } = await api.updatePassword(formData);
    console.log(data);
    toast.success("Password updated successfully");
    navigate("/login");
    localStorage.clear();
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};
