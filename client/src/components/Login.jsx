import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HiLockClosed } from "react-icons/hi";
import { toast } from "react-toastify";

import { signUp, signIn } from "../actions/users";
import textLogo from "../images/logo/text.png";
import mainLogo from "../images/logo/main.png";
import defaultProfilePic from "../images/defaultProfilePic.png";

export default function Login() {
  const user = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [userData, setUserData] = useState({
    user_name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleOnChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (userData.password === userData.cpassword) {
        const formData = new FormData();
        for (var key in userData) {
          formData.append(key, userData[key]);
        }
        dispatch(signUp(formData, navigate));
      } else {
        toast.error("Passwords must match!");
      }
    } else {
      dispatch(signIn(userData, navigate));
    }
  };

  return (
    <div
      className="relative bg-gradient-to-r from-[#000000] to-[#130F40]"
      style={{ height: "100vh" }}
    >
      <div className="w-[100%] sm:w-[90%] md:w-[70%] lg:w-[65%] xl:w-[55%] mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center">
        <div className="border-2 p-7 md:p-10 border-gray-800 rounded-md place-content-center max-w-md w-full space-y-8">
          <div>
            <div className="login__logo_container">
              <img
                className="mx-auto h-12 w-auto"
                src={mainLogo}
                alt="Workflow"
              />
              <img
                className="mx-auto h-12 w-auto"
                src={textLogo}
                alt="Workflow"
              />
            </div>

            <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-white">
              {isSignUp ? "Sign Up to continue" : "Sign in to your account"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <span
                onClick={() => setIsSignUp((prev) => !prev)}
                className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
              >
                {isSignUp
                  ? "Already registered? Sign in here"
                  : "New User? Sign up here"}
              </span>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={(e) => handleOnSubmit(e)}>
            <div className="rounded-md shadow-sm -space-y-px">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    value={userData.name}
                    onChange={handleOnChange}
                    id="name"
                    name="user_name"
                    type="name"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="User Name"
                  />
                </div>
              )}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  value={userData.email}
                  onChange={handleOnChange}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  value={userData.password}
                  onChange={handleOnChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              {isSignUp && (
                <>
                  <div>
                    <label htmlFor="cpassword" className="sr-only">
                      Confirm Password
                    </label>
                    <input
                      value={userData.cpassword}
                      onChange={handleOnChange}
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Confirm Password"
                    />
                  </div>
                </>
              )}
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  defaultChecked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-white"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <HiLockClosed
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
