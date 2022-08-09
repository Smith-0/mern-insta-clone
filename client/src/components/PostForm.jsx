import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { createPost, updatePost } from "../actions/posts";
import placeHolderImage from "../images/placeholder.png";

const PostForm = ({ closeModal, currentEditPostId, setCurrentEditPostId }) => {
  const postForEdit = useSelector((state) =>
    currentEditPostId
      ? state.posts.find((p) => p._id === currentEditPostId)
      : null
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const [postData, setPostData] = useState({
    caption: "",
    location: "",
    post_image: "",
  });

  useEffect(() => {
    if (postForEdit)
      setPostData({
        ...postData,
        caption: postForEdit.caption,
        location: postForEdit.location,
      });
  }, []);

  const handleOnChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const uploadImage = (e) => {
    let image = document.getElementById("post_image_holder");
    image.src = URL.createObjectURL(e.target.files[0]);
    setPostData({ ...postData, post_image: e.target.files[0] });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", postData.caption);
    formData.append("location", postData.location);

    if (currentEditPostId) {
      dispatch(updatePost(currentEditPostId, postData));
      setCurrentEditPostId(null);
      console.log(currentEditPostId);
    } else {
      formData.append(
        "post_image",
        postData.post_image,
        postData.post_image.filename
      );
      dispatch(createPost(formData));
      if (location.pathname === "/")
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    closeModal();
  };

  return (
    <div className="">
      <div className="p-5 pb-0">
        <form onSubmit={handleOnSubmit}>
          <div className="flex flex-col sm:flex-row">
            {currentEditPostId === null && (
              <div className="select__image sm:pr-5">
                <input
                  className="hidden"
                  type="file"
                  name="post_image"
                  id="post_image_input"
                  onChange={uploadImage}
                />
                <label htmlFor="post_image_input">
                  <img
                    src={placeHolderImage}
                    alt="Upload Image"
                    id="post_image_holder"
                    className="rounded-xl mt-1 w-full sm:w-96 h-48 object-cover shadow-sm border-2 border-gray-100"
                  />
                </label>
              </div>
            )}
            <div className="input__fiels pt-5 sm:pl-5 sm:pt-0 w-full">
              <div>
                <label htmlFor="caption" className="sr-only">
                  Caption
                </label>
                <textarea
                  id="caption"
                  name="caption"
                  type="caption"
                  rows="7"
                  value={postData.caption}
                  onChange={handleOnChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  placeholder="Caption"
                />
              </div>
              <div>
                <label htmlFor="location" className="sr-only">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="location"
                  value={postData.location}
                  onChange={handleOnChange}
                  autoComplete="location"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-200 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-300 focus:border-indigo-300 focus:z-10 sm:text-sm"
                  placeholder="Location"
                />
              </div>
            </div>
          </div>

          <div className="buttons flex flex-rows justify-end mt-5">
            <button
              type="button"
              onClick={closeModal}
              className="mx-3 group flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Discard
            </button>
            <button
              type="submit"
              className="group flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
