import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";

import Post from "./Post";

const Posts = ({ setCurrentEditPostId }) => {
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

  return (
    <div>
      {posts
        .slice(0)
        .reverse()
        .map((post) => (
          <Post
            key={post._id}
            post={post}
            peoplesLikedPost={users.filter((user) =>
              post.likes.includes(user._id)
            )}
            postUser={users.filter((user) => user._id === post.createdBy)}
            currentUser={currentUser?.result}
            setCurrentEditPostId={setCurrentEditPostId}
            page="AllPosts"
            users={users}
          />
        ))}
    </div>
  );
};

export default Posts;
