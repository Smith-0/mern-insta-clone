import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleFollow } from "../actions/users";
import { RiCloseLine } from "react-icons/ri";

const ShowPeoples = ({ isOpen, setIsOpen, peoples, type, currentUser }) => {
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  return (
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
              <Dialog.Panel className="sm:w-[80%] md:w-[50%] xl:w-[40%] w-[90%] transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                <div className="header text-center font-semibold text-lg border-b-2 border-gray-200 p-3">
                  <span>{type}</span>
                  <RiCloseLine
                    onClick={closeModal}
                    className="inline float-right text-3xl font-normal cursor-pointer"
                  />
                </div>
                <div className="h-[20rem] overflow-y-scroll">
                  {peoples?.map((people) => (
                    <div
                      key={people._id}
                      className="peoples px-5 py-3 flex flex-row justify-between"
                    >
                      <div className="flex flex-row">
                        <Avatar alt={people.name} src={people.profile_pic} />
                        <div className="names ml-3">
                          <Link
                            className="decoration-0"
                            to={`/u/${people._id}`}
                          >
                            <div className="text-sm font-bold hover:underline">
                              {people.name}
                            </div>
                          </Link>
                          <div className="text-xs text-gray-500">
                            {people.name}
                          </div>
                        </div>
                      </div>

                      <div className="action">
                        {people?._id !== currentUser?._id ? (
                          people.followers?.includes(currentUser?._id) ? (
                            <span
                              onClick={() => dispatch(toggleFollow(people._id))}
                              className="text-black border border-gray-500 hover:bg-black hover:text-white px-2 py-1 font-semibold text-sm rounded block text-center sm:inline-block cursor-pointer"
                            >
                              Following
                            </span>
                          ) : (
                            <span
                              onClick={() => dispatch(toggleFollow(people._id))}
                              className="bg-blue-500 hover:bg-blue-700 px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block cursor-pointer"
                            >
                              Follow
                            </span>
                          )
                        ) : (
                          <Link
                            to={`/accounts/edit/${currentUser._id}`}
                            className="px-2 py-1 text-black border border-gray-500 hover:bg-black hover:text-white font-semibold text-sm rounded block text-center sm:inline-block cursor-pointer"
                          >
                            Edit Profile
                          </Link>
                        )}
                      </div>
                    </div>
                    // </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShowPeoples;
