import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { formatDistance, formatRelative } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";

import { likeComment } from "../../actions/posts";

const Comments = ({ index, comment, currentUserId, postId, user }) => {
  const dispatch = useDispatch();
  const [commentLike, setCommentLike] = useState(comment?.likes);

  const yourLikeExist = commentLike.includes(currentUserId);

  const handleCommentLike = () => {
    dispatch(likeComment(index, postId));
    if (commentLike.includes(currentUserId)) {
      setCommentLike(commentLike.filter((id) => id !== currentUserId));
    } else {
      setCommentLike([...commentLike, currentUserId]);
    }
  };

  return (
    <div className="mt-3 caption flex flex-row justify-between ">
      <div className="flex">
        <div className="rounded-full mt-2 h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
          <img src={user?.profile_pic} alt="profilepic" />
        </div>
        <div className="mx-5">
          <div className="pt-1">
            <div className="mb-1 text-sm text-justify">
              <Link
                to={`/u/${user?._id}`}
                className="font-semibold mr-2 cursor-pointer"
              >
                {user?.name}
              </Link>{" "}
              {comment.message}
            </div>
          </div>

          <div className="text-xs text-gray-500">
            <Tooltip
              title={formatRelative(new Date(comment.created_At), new Date())}
              placement="right"
              arrow
            >
              <span
                data-tip="React-tooltip"
                className="bg-gray-50 text-xs rounded-lg px-1 text-gray-500 font-light cursor-pointer"
              >
                {formatDistance(new Date(comment.created_At), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </Tooltip>
            <span className="likes mx-3">
              {comment.likes.length === 0
                ? ""
                : comment.likes.length === 1
                ? "1 like"
                : comment.likes.length + " likes"}
            </span>
          </div>
        </div>
      </div>

      <span className="my-auto cursor-pointer" onClick={handleCommentLike}>
        {yourLikeExist ? (
          <RiHeartFill className="text-red-600" />
        ) : (
          <RiHeartLine />
        )}
      </span>
    </div>
  );
};

export default Comments;
