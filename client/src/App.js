import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { getAllPosts } from "./actions/posts";
import { getUsers } from "./actions/users";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Explore from "./components/Explore";
import Test from "./components/Test";
import Profile from "./components/Profile";
import PostDetails from "./components/posts/PostDetails";
import EditProfile from "./components/EditProfile";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [currentEditPostId, setCurrentEditPostId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllPosts(setLoading));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer className="mt-20" position="top-center" />
      <Navbar
        key="navbar"
        currentEditPostId={currentEditPostId}
        setCurrentEditPostId={setCurrentEditPostId}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              key="Home"
              loading={loading}
              setCurrentEditPostId={setCurrentEditPostId}
            />
          }
        />
        <Route
          path="/p/:id"
          element={
            <PostDetails
              key="PostDetails"
              setCurrentEditPostId={setCurrentEditPostId}
            />
          }
        />

        <Route
          path="/u/:id"
          element={
            <Profile
              key="Profile"
              setCurrentEditPostId={setCurrentEditPostId}
            />
          }
        />

        <Route
          path="/accounts/edit/:id"
          element={<EditProfile key="EditProfile" />}
        />

        <Route path="/explore" element={<Explore key="Explore" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
