import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import {
  RiHomeSmile2Line,
  RiImageAddFill,
  RiCompassLine,
} from "react-icons/ri";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { Menu, Dialog, Transition } from "@headlessui/react";

import mainLogo from "../images/logo/main.png";
import textLogo from "../images/logo/text.png";
import PostForm from "./PostForm";
import Search from "./Search";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ currentEditPostId, setCurrentEditPostId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);
  const currentUser = JSON.parse(localStorage.getItem("userData"))?.result;
  const [showSearchTab, setShowSearchTab] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  let [isOpen, setIsOpen] = useState(false);

  const handleLogout = (e) => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);

  useEffect(() => {
    if (searchQuery === "") {
      setShowSearchTab(false);
      setSearchUsers([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    setShowSearchTab(false);
    setSearchUsers([]);
    setSearchQuery("");
  }, [location]);

  // add_edit post modal

  function closeModal() {
    setIsOpen(false);
    setCurrentEditPostId(null);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (currentEditPostId) {
      setIsOpen(true);
    }
  }, [currentEditPostId]);

  if (location.pathname === "/login") {
    return null;
  }

  const handleOnSearchChange = (e) => {
    setShowSearchTab(true);
    setSearchQuery(e.target.value);
    setSearchUsers(
      users.filter(
        (user) =>
          user.user_name.toLowerCase().search(e.target.value) >= 0 ||
          user.name.toLowerCase().search(e.target.value) >= 0
      )
    );
  };

  return (
    <>
      <div className="sticky top-0 navbar flex flex-row bg-[#FFFFFF] py-2 md:py-3 justify-between items-center  text-black z-50 border-b border-gray-300 px-5 md:px-10 xl:px-64">
        <Link to="/">
          <div className="flex flex-row items-center">
            <img
              src={mainLogo}
              alt=""
              className="w-12 pb-1 object-contain instagram__text__logo hidden sm:block"
            />
            <img
              src={textLogo}
              alt=""
              className="w-24 object-contain instagram__text__logo"
            />
          </div>
        </Link>
        <div className="text-black hidden md:block">
          <input
            value={searchQuery}
            onChange={handleOnSearchChange}
            className="p-2 rounded h-full w-80 px-4 outline-none bg-[#efefef]"
            type="search"
            placeholder="Search..."
          />
          <Search isOpen={showSearchTab} searchUsers={searchUsers} />
        </div>
        <div>
          <ul className="flex flex-row justify-between items-center">
            <li className="mx-2 text-3xl cursor-pointer hover:text-gray-700">
              <Link to="/">
                <RiHomeSmile2Line />
              </Link>
            </li>
            <li className="mx-2 text-3xl cursor-pointer hover:text-gray-700">
              <Link to="/explore">
                <RiCompassLine />
              </Link>
            </li>
            <li
              className="mx-2 text-3xl cursor-pointer hover:text-gray-700"
              onClick={openModal}
            >
              <RiImageAddFill />
            </li>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                open={isOpen}
                as="div"
                className="relative z-10"
                onClose={closeModal}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black/40" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="sm:w-[90%] md:w-[90%] xl:w-[60%] w-[90%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <PostForm
                          closeModal={closeModal}
                          currentEditPostId={currentEditPostId}
                          setCurrentEditPostId={setCurrentEditPostId}
                        />
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>

            <Menu as="div" className="relative inline-block text-left mx-2">
              <div>
                <Menu.Button className="rounded-full border border-gray-300 shadow-sm bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none ">
                  <Avatar
                    alt={currentUser?.user_name}
                    src={currentUser?.profile_pic}
                    sx={{ width: 30, height: 30 }}
                  />
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
                <Menu.Items className="origin-top-right right-0 mt-2 w-40 rounded-md shadow-lg bg-white absolute z-50">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`/u/${currentUser?._id}`}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          <FaUserAlt className="inline pr-3 text-2xl" />
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={handleLogout}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full text-left px-4 py-2 text-sm"
                          )}
                        >
                          <FaSignOutAlt className="inline pr-3 text-2xl" />
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
