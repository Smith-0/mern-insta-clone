import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Post from "./Post";
import Loading from "../Loading";

const PostDetails = ({ setCurrentEditPostId }) => {
  let { id } = useParams();
  const posts = useSelector((state) => state.posts);
  const { users } = useSelector((state) => state.users);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("userData")));
  }, []);

  if (!posts || posts.length === 0 || !users || !currentUser) {
    return <Loading />;
  }

  return posts.map(
    (post, index) =>
      post._id === id && (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-around my-16 w-[100%] sm:w-[90%] md:w-[70%] lg:w-[65%] xl:w-[55%] mx-auto"
        >
          <div className="md:flex-1 hidden md:block">
            <img
              className="bg-[#000000] rounded-tl-xl rounded-tr-xl md:rounded-bl-xl md:rounded-tr-none object-contain md:h-[40rem]"
              src={post.post_image}
              alt={post.post_image}
            />
          </div>

          <div className="flex-1">
            <Post
              key={post?._id}
              post={post}
              currentUser={currentUser?.result}
              postUser={users.filter((user) => user._id === post.createdBy)}
              setCurrentEditPostId={setCurrentEditPostId}
              peoplesLikedPost={users.filter((user) =>
                post.likes.includes(user._id)
              )}
              users={users}
              page="PostDetails"
            />
          </div>
        </div>
      )
  );
};

export default PostDetails;
