import React from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

const Search = ({ isOpen, searchUsers }) => {
  return (
    <>
      {isOpen && (
        <div className="h-[20rem] bg-[#fafafa] rounded-lg w-80 border-2 border-gray-200 absolute top-[3.75rem] py-5 overflow-y-scroll">
          {searchUsers.length > 0 ? (
            searchUsers?.map((searchUser) => (
              <div
                key={searchUser._id}
                className="searchUsers px-6 py-3 flex flex-row justify-between"
              >
                <div className="flex flex-row">
                  <Avatar alt={searchUser.name} src={searchUser.profile_pic} />
                  <div className="names ml-3">
                    <Link className="decoration-0" to={`/u/${searchUser._id}`}>
                      <div className="text-sm font-bold hover:underline">
                        {searchUser.user_name}
                      </div>
                    </Link>
                    <div className="text-xs text-gray-500">
                      {searchUser.name}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="px-5 py-5 text-gray-700 font-semibold ">
              No user with this username
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
