import * as api from "../api";
import { toast } from "react-toastify";

export const getAllPosts = (setLoading) => async (dispatch) => {
  setLoading(true);
  try {
    const { data } = await api.getAllPosts();
    dispatch({ type: "GET_ALL", payload: data });
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getPostById(id);
    dispatch({ type: "GET_BY_ID", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    const { data } = await api.createPost(postData);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, postData) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, postData);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (id, commentMessage) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(id, commentMessage);
    dispatch({ type: "COMMENT", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: "LIKE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const savePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.savePost(id);
    dispatch({ type: "SAVE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likeComment = (index, postId) => async (dispatch) => {
  try {
    const { data } = await api.likeComment(index, postId);
    console.log(data);
    dispatch({ type: "LIKE_COMMENT", payload: data });
  } catch (error) {
    console.log(error);
  }
};
