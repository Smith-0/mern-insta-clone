import React from "react";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toggleFollow } from "../actions/users";

const SuggestedForYou = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);
  const currentUser = JSON.parse(localStorage.getItem("userData"))?.result;

  const suggestedUsers = users?.filter(
    (user) =>
      !currentUser.following.includes(user._id) && user._id !== currentUser._id
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="mx-5">
      <div className="logout flex flex-row justify-between items-center w-[100%]">
        <div className="flex flex-row items-center">
          <Avatar
            alt={currentUser?.name}
            src={currentUser?.profile_pic}
            sx={{ width: "3rem", height: "3rem" }}
          />
          <div className="user_name ml-4">
            <Link to={`/u/${currentUser?._id}`}>
              <span className="font-semibold">{currentUser?.user_name}</span>
            </Link>

            <div className="name text-sm font-light">{currentUser?.name}</div>
          </div>
        </div>

        <div
          onClick={handleLogout}
          className="logout_btn ml-10 text-sm text-[#007bff] hover:underline cursor-pointer"
        >
          Logout
        </div>
      </div>
      {suggestedUsers?.length > 0 && (
        <div className="suggestions mt-5">
          <div className="flex flex-row justify-between items-center">
            <div className="text-[#9c9c9c] font-semibold">
              Suggested for you
            </div>
            {/* <div className="text-[#000000] hover:underline hover:text-black cursor-pointer text-xs font-semibold">
              View All
            </div> */}
          </div>
          <div className="my-2">
            {suggestedUsers?.slice(0, 5).map((user) => (
              <div
                key={user._id}
                className="users px-1 py-2 flex flex-row justify-between"
              >
                <div className="flex flex-row items-center">
                  <Avatar
                    alt={user.name}
                    src={user.profile_pic}
                    sx={{ width: 32, height: 32 }}
                  />
                  <div className="names ml-3">
                    <Link className="decoration-0" to={`/u/${user._id}`}>
                      <div className="text-sm font-bold hover:underline">
                        {user.name}
                      </div>
                    </Link>
                    <div className="text-xs text-gray-500">
                      {user.user_name}
                    </div>
                  </div>
                </div>

                <div className="action">
                  <button
                    onClick={() => dispatch(toggleFollow(user._id))}
                    className="transition ease-in-out delay-50 text-[#007bff] text-semibold text-sm"
                  >
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="footer my-3 text-[#9c9c9c] text-semibold">
        © 2022 INSTAGRAM FROM SAHIL
      </div>
    </div>
  );
};

export default SuggestedForYou;
