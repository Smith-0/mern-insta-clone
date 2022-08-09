import React, { useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDistance, formatRelative } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import {
  RiChat1Line,
  RiHeartLine,
  RiHeartFill,
  RiBookmarkLine,
  RiBookmarkFill,
  RiSendPlaneLine,
  RiMore2Fill,
  RiCheckboxBlankCircleFill,
  RiDeleteBinLine,
  RiEditBoxLine,
} from "react-icons/ri";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import {
  commentPost,
  likePost,
  savePost,
  deletePost,
} from "../../actions/posts";
import { toggleFollow } from "../../actions/users";
import Loading from "../Loading";
import Comments from "./Comments";
const ShowPeoples = React.lazy(() => import("../ShowPeoples"));

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Post = ({
  page,
  post,
  postUser,
  currentUser,
  setCurrentEditPostId,
  peoplesLikedPost,
  users,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLikes, setShowLikes] = useState(false);
  const [likes, setLikes] = useState(post?.likes);
  const [saved, setSaved] = useState(post?.saved);
  // const [follow, setFollow] = useState(postUser[0]?.folloicludes());
  const [commentMessage, setCommentMessage] = useState("");

  let likeText;
  let yourLikeExist = false;
  if (likes.includes(currentUser._id)) {
    yourLikeExist = true;
  }
  const likeCount = likes?.length;
  if (likeCount === 0 || likeCount === null) {
    likeText = "Be the first one to like this post";
  } else if (likeCount === 1) {
    likeText = `${likeCount} like`;
  } else if (likeCount > 1 && !yourLikeExist) {
    likeText = `${likeCount} likes`;
  } else {
    likeText = `you and ${likeCount - 1} other`;
  }
  const Like = () => {
    return (
      <div onClick={() => setShowLikes(true)} className="like_count_text">
        <span> {likeText}</span>
      </div>
    );
  };

  let isSaved = false;
  if (saved.includes(currentUser._id)) {
    isSaved = true;
  }

  const handleLike = () => {
    dispatch(likePost(post._id));
    if (yourLikeExist) {
      setLikes(likes.filter((id) => id !== currentUser._id));
    } else {
      setLikes([...likes, currentUser._id]);
    }
  };

  const handleSave = () => {
    dispatch(savePost(post._id));
    if (isSaved) {
      setSaved(saved.filter((id) => id !== currentUser._id));
    } else {
      setSaved([...saved, currentUser._id]);
    }
  };

  const handleComment = () => {
    dispatch(commentPost(post._id, commentMessage));
    setCommentMessage("");
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
    if (page === "PostDetails") navigate(`/u/${currentUser._id}`);
  };

  const handleUpdate = () => {
    setCurrentEditPostId(post._id);
  };

  const handleFollow = () => {
    dispatch(toggleFollow(postUser[0]?._id));
  };

  let cssForMainDiv = "";
  let cssForPostFooter = "";
  let cssForPostImage = "";
  let cssForAllComments = "";

  if (page === "AllPosts") {
    cssForAllComments = "hidden";
    cssForPostImage = "w-full bg-cover max-h-[40rem] object-cover";
    cssForMainDiv =
      "flex flex-col justify-between rounded-lg overflow-hidden bg-white mb-8 md:mx-0 lg:mx-0";
    cssForPostFooter = "post__footer border-t-2 border-gray-100";
  } else if (page === "PostDetails") {
    cssForAllComments =
      "all__comments py-3 px-5 overflow-scroll h-[30rem] hide_scrollbar";
    cssForPostImage = "w-full bg-cover max-h-[40rem] md:hidden object-cover";
    cssForMainDiv =
      "relative flex flex-col justify-start align-items-start md:rounded-tr-lg rounded-br-lg rounded-bl-lg md:rounded-bl-none overflow-hidden bg-white h-auto md:h-[40rem] z-0";
    cssForPostFooter =
      "absolute bottom-0 z-10 post__footer border-t-2 border-gray-100 w-inherit w-[100%] bg-white";
  }

  if (!postUser) {
    return <Loading />;
  }

  return (
    <div>
      {post?.likes.length > 0 && (
        <Suspense fallback={<Loading />}>
          <ShowPeoples
            isOpen={showLikes}
            setIsOpen={setShowLikes}
            peoples={peoplesLikedPost}
            type={"Likes"}
            currentUser={currentUser}
          />
        </Suspense>
      )}
      <div className={cssForMainDiv}>
        <div className="col-span-1 w-full flex justify-between p-3 border-b-2 border-gray-100">
          <div className="flex">
            <div className="rounded-full h-10 w-10 bg-gray-500 flex items-center justify-center overflow-hidden">
              <img src={postUser[0]?.profile_pic} alt="profilepic" />
            </div>
            <div className="ml-4">
              <div className="flex flex-row items-baseline justify-items-start">
                <Link
                  to={`/u/${postUser[0]?._id}`}
                  className="font-bold text-sm"
                >
                  {postUser[0]?.name}
                </Link>
                {postUser[0]?._id !== currentUser._id && (
                  <>
                    <RiCheckboxBlankCircleFill className="text-[4px] mx-2" />
                    <div
                      className="text-sm font-medium cursor-pointer"
                      onClick={handleFollow}
                    >
                      {postUser[0]?.followers?.includes(currentUser._id) ? (
                        <span className={`text-bg-gray-800`}>following</span>
                      ) : (
                        <span className={`text-[#007bff]`}>follow</span>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="text-xs text-gray-500">{post.location}</div>
            </div>
          </div>
          {postUser[0]?._id === currentUser._id && (
            <span className="px-2 cursor-pointer">
              <Menu as="div" className="relative inline-block text-left mx-3">
                <div>
                  <Menu.Button>
                    <RiMore2Fill className="text-2xl mt-1" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-sm bg-white border-2 border-gray-50">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            onClick={handleUpdate}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            <RiEditBoxLine className="inline pr-3 text-2xl" />
                            Edit
                          </span>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            onClick={handleDelete}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-red-900"
                                : "text-red-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            <RiDeleteBinLine className="inline pr-3 text-2xl" />
                            Delete
                          </span>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </span>
          )}
        </div>
        <div>
          {/* Div for Image in Home Page and Comments in PostDetails page */}

          <Link to={`/p/${post._id}`}>
            <img
              className={cssForPostImage}
              alt={post.caption}
              src={post.post_image}
            />
          </Link>
          <div className={cssForAllComments}>
            {/* caption */}
            <div className="pb-3 border-b-2 border-gray-50 caption flex flex-row justify-start items-center">
              <div className="flex">
                <div className="rounded-full mt-2 h-8 w-8 bg-gray-500 items-center justify-center overflow-hidden hidden md:block">
                  <img src={postUser[0]?.profile_pic} alt="profilepic" />
                </div>
              </div>

              <div className="md:ml-4">
                <div className="pt-1">
                  <div className="mb-2 text-sm text-justify">
                    <Link
                      to={`/u/${postUser[0]?._id}`}
                      className="font-semibold mr-2 cursor-pointer"
                    >
                      {postUser[0]?.name}
                    </Link>{" "}
                    {post.caption}
                  </div>
                </div>
              </div>
            </div>

            {/* all comments */}
            {post.comments.map((comment, index) => (
              <Comments
                key={index}
                index={index}
                comment={comment}
                user={users.find((user) => user._id === comment.user)}
                currentUserId={currentUser._id}
                postId={post._id}
              />
            ))}

            <br />
          </div>

          {/* Div for Image in Home Page and Comments in PostDetails page */}
        </div>
        <div className={cssForPostFooter}>
          <div className="icons text-3xl flex flex-row m-3 mb-0 justify-between">
            <div className="left flex flex-row">
              <div
                onClick={handleLike}
                className="like mr-2 text-gray-700 font-light cursor-pointer"
              >
                {yourLikeExist ? (
                  <RiHeartFill className="text-red-600" />
                ) : (
                  <RiHeartLine />
                )}
              </div>
              <div className="comment text-gray-700 font-light cursor-pointer">
                <label htmlFor="comment_input">
                  <RiChat1Line />
                </label>
              </div>
            </div>
            <div className="right">
              <div
                onClick={handleSave}
                className="save text-gray-700 font-light cursor-pointer"
              >
                {isSaved ? <RiBookmarkFill /> : <RiBookmarkLine />}
              </div>
            </div>
          </div>
          <div className="px-3 pb-2">
            <div className="pt-2 cursor-pointer">
              <span className="text-sm text-gray-400 font-medium">
                <Like />
              </span>
            </div>
            {page === "AllPosts" && (
              <div className="pt-1">
                <div className="mb-2 text-sm">
                  <Link
                    to={`/u/${postUser[0]?._id}`}
                    className="font-semibold mr-2 cursor-pointer"
                  >
                    {postUser[0]?.name}
                  </Link>{" "}
                  {post.caption}
                </div>
              </div>
            )}
            {post.comments.length > 0 && page === "AllPosts" && (
              <div className="comments">
                <Link to={`/p/${post._id}`}>
                  <div className="text-sm text-gray-400 cursor-pointer font-medium">
                    {post.comments.length === 1
                      ? "Comment -->"
                      : "View all " + post.comments.length + " comments"}
                  </div>
                </Link>
                <div className="mt-2">
                  {post.comments
                    .slice(0, 2)
                    .reverse()
                    .map((comment, index) => (
                      <div className="text-sm" key={index}>
                        <Link
                          to={`/u/${comment.user}`}
                          className="font-semibold mr-2 cursor-pointer"
                        >
                          {
                            users.find((user) => user._id === comment.user)
                              ?.name
                          }
                        </Link>{" "}
                        {comment.message}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="time mx-3 mb-3 ">
            <Tooltip
              title={formatRelative(new Date(post.created_At), new Date())}
              placement="right"
              arrow
            >
              <span
                data-tip="React-tooltip"
                className="bg-gray-50 text-xs rounded-lg px-1 text-gray-500 font-light cursor-pointer"
              >
                {formatDistance(new Date(post.created_At), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </Tooltip>
          </div>

          <div className="w-full comment_input border-t-2 border-gray-100 flex flex-row">
            <div className="w-[90%]">
              <input
                id="comment_input"
                type="text"
                value={commentMessage}
                onChange={(e) => setCommentMessage(e.target.value)}
                className="w-full outline-none py-3 px-3"
                placeholder="write comment..."
              />
            </div>
            <div className="w-[10%]">
              <button
                onClick={handleComment}
                className="outline-none bg-gray-50 hover:bg-gray-200 border-l-2 border-gray-100 h-full w-full"
              >
                <RiSendPlaneLine className="text-2xl mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
