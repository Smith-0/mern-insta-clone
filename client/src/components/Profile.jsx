import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "@headlessui/react";
import Avatar from "@mui/material/Avatar";
import {
  RiLayout2Line,
  RiBookmarkLine,
  RiHeartFill,
  RiChat1Fill,
  RiImageEditLine,
} from "react-icons/ri";
import { toggleFollow, updateProfilePic } from "../actions/users";
import Loading from "./Loading";
import ShowPeoples from "./ShowPeoples";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const { users } = useSelector((state) => state.users);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  let { id } = useParams();

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("userData")));
  }, []);

  let no_of_posts = 0;
  posts.forEach((post) => {
    post.createdBy === id && no_of_posts++;
  });

  const thisUser = users.find((user) => user?._id === id);
  if (!thisUser || !posts || !currentUser) {
    return <Loading />;
  }

  const handleOnFileChange = (e) => {
    const formData = new FormData();
    formData.append("profile_pic", e.target.files[0]);
    dispatch(updateProfilePic(formData));
  };

  const profile_pic_style = {
    // Adding media query..
    "@media (min-width: 768px)": {
      width: "10rem",
      height: "10rem",
    },
    width: "5rem",
    height: "5rem",
  };

  return (
    <>
      {thisUser?.followers.length > 0 && (
        <ShowPeoples
          isOpen={showFollowers}
          setIsOpen={setShowFollowers}
          peoples={users.filter((user) =>
            thisUser.followers.includes(user._id)
          )}
          type={"Followers"}
          currentUser={currentUser.result}
        />
      )}

      {thisUser?.following.length > 0 && (
        <ShowPeoples
          isOpen={showFollowing}
          setIsOpen={setShowFollowing}
          peoples={users.filter((user) =>
            thisUser.following.includes(user._id)
          )}
          type={"Following"}
          currentUser={currentUser.result}
        />
      )}

      <main className="bg-gray-100 bg-opacity-25">
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap md:justify-around items-center p-4 md:py-8">
            <div className="md:ml-16">
              <div className="relative">
                <Avatar
                  className="rounded-full border-2 border-pink-600"
                  alt={thisUser?.user_name}
                  src={thisUser?.profile_pic}
                  sx={profile_pic_style}
                />
                {thisUser._id === currentUser.result._id && (
                  <>
                    <label
                      className="h-20 w-20 md:h-40 md:w-40 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-900/30 rounded-full text-center text-white opacity-0 hover:opacity-100 cursor-pointer"
                      htmlFor="profile_pic"
                    >
                      <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-3xl md:text-5xl">
                        <RiImageEditLine />
                      </span>
                    </label>
                    <input
                      type="file"
                      className="hidden"
                      name="profile_pic"
                      id="profile_pic"
                      onChange={handleOnFileChange}
                    />{" "}
                  </>
                )}
              </div>
            </div>

            {/* <!-- profile meta --> */}
            <div className="w-8/12 md:w-7/12 ml-7">
              <div className="sm:flex sm:items-center mb-4">
                <h2 className="text-3xl font-light inline-block  sm:mr-4 mb-2 sm:mb-0">
                  {thisUser?.user_name}
                </h2>

                {/* <!-- follow button --> */}
                {thisUser._id !== currentUser.result._id ? (
                  thisUser.followers?.includes(currentUser.result._id) ? (
                    <span
                      onClick={() => dispatch(toggleFollow(thisUser._id))}
                      className="text-black border border-gray-500 hover:bg-black hover:text-white px-2 py-1 font-semibold text-sm rounded block text-center sm:inline-block cursor-pointer"
                    >
                      Following
                    </span>
                  ) : (
                    <span
                      onClick={() => dispatch(toggleFollow(thisUser._id))}
                      className="bg-blue-500 hover:bg-blue-700 px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block cursor-pointer"
                    >
                      Follow
                    </span>
                  )
                ) : (
                  <Link
                    to={`/accounts/edit/${currentUser.result._id}`}
                    className="px-2 py-1 text-black border border-gray-500 hover:bg-black hover:text-white font-semibold text-sm rounded block text-center sm:inline-block cursor-pointer"
                  >
                    Edit Profile
                  </Link>
                )}
              </div>

              {/* <!-- post, following, followers list for medium screens --> */}
              <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold">{no_of_posts} </span>
                  posts
                </li>

                <li>
                  <span
                    onClick={() => setShowFollowers(true)}
                    className="font-semibold cursor-pointer"
                  >
                    {thisUser?.followers.length}
                    &nbsp;followers
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => setShowFollowing(true)}
                    className="font-semibold cursor-pointer"
                  >
                    {thisUser?.following.length}
                    &nbsp;following
                  </span>
                </li>
              </ul>

              {/* <!-- user meta form medium screens --> */}
              <div className="hidden md:block">
                <h1 className="font-semibold">{thisUser?.name}</h1>
                <p className="pt-1 text-gray-700">
                  {thisUser?.bio ||
                    "Click on edit profile to set your bio , website link and some personal details"}
                </p>
                <a
                  className="text-[#007bff] hover:text-blue-700 hover:underline"
                  href={thisUser?.website}
                  target="_blank"
                >
                  {thisUser?.website}
                </a>
              </div>
            </div>

            {/* <!-- user meta form small screens --> */}
            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">{thisUser?.name}</h1>
              <p className="pt-1 text-gray-700">
                {thisUser?.bio ||
                  "Click on edit profile to set your bio , website link and some personal details"}
              </p>
              <a
                className="text-[#007bff] hover:text-blue-700 hover:underline"
                href={thisUser?.website}
                target="_blank"
              >
                {thisUser?.website}
              </a>
            </div>
          </header>

          {/* <!-- posts --> */}
          <div className="px-px md:px-3">
            {/* <!-- user following for mobile only --> */}
            <ul className="flex md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 leading-snug text-sm">
              <li>
                <span className="font-semibold text-gray-800 block">
                  {no_of_posts}
                </span>
                posts
              </li>

              <li>
                <span
                  onClick={() => setShowFollowers(true)}
                  className="font-semibold text-gray-800 block cursor-pointer"
                >
                  {thisUser?.followers.length}
                </span>
                followers
              </li>
              <li>
                <span
                  onClick={() => setShowFollowing(true)}
                  className="font-semibold text-gray-800 block cursor-pointer"
                >
                  {thisUser?.following.length}
                </span>
                following
              </li>
            </ul>

            <Tab.Group>
              <Tab.List className="flex items-baseline justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 mb-6 border-t-[1px] border-b-[1px] md:border-b-0 pb-1 md:pb-0">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-3 pt-2",
                      selected
                        ? "text-[#007bff] md:text-gray-800 md:border-t-[1px] md:border-gray-500"
                        : " text-gray-400"
                    )
                  }
                  key="Posts"
                >
                  <RiLayout2Line className="inline text-4xl md:text-lg mr-2 pb-1" />{" "}
                  <span className="hidden md:inline">POST</span>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-3 pt-2 outline-none",
                      selected
                        ? "text-[#007bff] md:text-gray-800 md:border-t-[1px] md:border-gray-500"
                        : " text-gray-400"
                    )
                  }
                  key="Saved"
                >
                  <RiBookmarkLine className="inline text-4xl md:text-lg mr-2 pb-1" />
                  <span className="hidden md:inline">SAVED</span>
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel key="Posts">
                  <div className="flex flex-wrap -mx-px md:-mx-3">
                    {/* <!-- column --> */}

                    {posts
                      .slice()
                      .reverse()
                      .map(
                        (post) =>
                          post.createdBy === id && (
                            <div key={post._id} className="w-1/3 p-px md:px-3">
                              {/* <!-- post 1--> */}
                              <Link to={`/p/${post._id}`}>
                                <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                                  {/* <!-- post image--> */}
                                  <img
                                    className="w-full h-full absolute left-0 top-0 object-cover"
                                    src={post?.post_image}
                                    alt="post"
                                  />

                                  <i className="fas fa-square absolute right-0 top-0 m-1"></i>
                                  {/* <!-- overlay--> */}
                                  <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                                    <div className="flex justify-center items-center space-x-4 h-full">
                                      <span className="p-2">
                                        <RiHeartFill className="inline text-3xl pr-2" />
                                        {post.likes.length}
                                      </span>

                                      <span className="p-2">
                                        <RiChat1Fill className="inline text-3xl pr-2" />
                                        {post.comments.length}
                                      </span>
                                    </div>
                                  </div>
                                </article>
                              </Link>
                            </div>
                          )
                      )}
                  </div>
                </Tab.Panel>
                <Tab.Panel key="Saved">
                  <div className="flex flex-wrap -mx-px md:-mx-3">
                    {/* <!-- column --> */}

                    {posts
                      .slice()
                      .reverse()
                      .map(
                        (post) =>
                          post.saved.includes(id) && (
                            <div key={post._id} className="w-1/3 p-px md:px-3">
                              {/* <!-- post 1--> */}
                              <Link to={`/p/${post._id}`}>
                                <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                                  {/* <!-- post image--> */}
                                  <img
                                    className="w-full h-full absolute left-0 top-0 object-cover"
                                    src={post?.post_image}
                                    alt="post"
                                  />

                                  <i className="fas fa-square absolute right-0 top-0 m-1"></i>
                                  {/* <!-- overlay--> */}
                                  <div className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute left-0 top-0 hidden">
                                    <div className="flex justify-center items-center space-x-4 h-full">
                                      <span className="p-2">
                                        <RiHeartFill className="inline text-3xl pr-2" />
                                        {post.likes.length}
                                      </span>

                                      <span className="p-2">
                                        <RiChat1Fill className="inline text-3xl pr-2" />
                                        {post.comments.length}
                                      </span>
                                    </div>
                                  </div>
                                </article>
                              </Link>
                            </div>
                          )
                      )}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            {/* <!-- flexbox grid --> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
