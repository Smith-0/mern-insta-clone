import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userData")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userData")).token
    }`;
  }
  return req;
});
// user start

export const signIn = (userData) => API.post("/users/signIn", userData);
export const signUp = (userData) => API.post("/users/signUp", userData);
export const getUsers = (ids) => API.post(`/users`, ids);

export const getUserById = (id) => API.get(`/users/${id}`);

export const updateProfilePic = (formData) =>
  API.patch("/users/update/profile_pic", formData);
export const toggleFollow = (id) => API.patch(`/users/follow/${id}`);
export const updateUser = (formData) => API.patch(`/users/update`, formData);
export const updatePassword = (passwordChangeData) =>
  API.patch(`/users/update/password`, passwordChangeData);

// user end

// post start

export const getAllPosts = () => API.get("/posts");
export const getPostById = (id) => API.get(`/posts/${id}`);
export const createPost = (postData) => API.post("/posts", postData);
export const updatePost = (id, postData) =>
  API.patch(`/posts/update/${id}`, postData);
export const likePost = (id) => API.patch(`/posts/like/${id}`);
export const deletePost = (id) => API.patch(`/posts/delete/${id}`);
export const savePost = (id) => API.patch(`/posts/save/${id}`);
export const commentPost = (id, commentMessage) =>
  API.patch(`/posts/comment/${id}`, { message: commentMessage });
export const likeComment = (index, postId) =>
  API.patch(`/posts/likeComment/${postId}/${index}`);

// post end
