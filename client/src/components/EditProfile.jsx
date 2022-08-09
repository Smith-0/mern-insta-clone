import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";

import { updateUser, updatePassword } from "../actions/users";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const [formData, setFormData] = useState({
    name: "",
    user_name: "",
    website: "",
    bio: "",
    email: "",
    phone_number: "",
    gender: "",
  });

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("userData")));
    setFormData({ ...formData, ...currentUser.result });
  }, []);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
  };

  // for password
  const [passwordChangeData, setPasswordChangeData] = useState({
    old_password: "",
    new_password: "",
    new_cpassword: "",
  });

  const handleOnChangePassword = (e) => {
    setPasswordChangeData({
      ...passwordChangeData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    if (passwordChangeData.new_cpassword !== passwordChangeData.new_password) {
      toast.error("Passwords do not match");
    } else {
      dispatch(updatePassword(passwordChangeData, navigate));
      setPasswordChangeData({
        old_password: "",
        new_password: "",
        new_cpassword: "",
      });
    }
  };

  return (
    <div className="mx-auto w-[100%] sm:[w-90%] md:w-[80%] lg:w-[70%] xl:[60%] bg-white my-16 p-10">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-[#fafafa] p-1">
          <Tab
            key="Edit Profile"
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-600 ",
                "ring-white ring-opacity-0 ring-offset-0 ring-offset-blue-400 focus:outline-none focus:ring-0",
                selected
                  ? "bg-white shadow text-[#007bff]"
                  : "hover:bg-white/[0.12] hover:text-black"
              )
            }
          >
            Edit Profile
          </Tab>
          <Tab
            key="Change Password"
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-600 ",
                "ring-white ring-opacity-0 ring-offset-0 ring-offset-blue-400 focus:outline-none focus:ring-0",
                selected
                  ? "bg-white shadow text-[#007bff]"
                  : "hover:bg-white/[0.12] hover:text-black"
              )
            }
          >
            Change Password
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            key="Edit Profile"
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-0 ring-offset-0 focus:outline-none focus:ring-0"
            )}
          >
            <Stack component="form" spacing={3} onSubmit={handleSubmit}>
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleOnChange}
                variant="outlined"
                required
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Username"
                name="user_name"
                value={formData.user_name}
                onChange={handleOnChange}
                variant="outlined"
                required
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleOnChange}
                variant="outlined"
                helperText="Example: https://www.google.com/"
              />
              <TextField
                id="outlined-multiline-static"
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleOnChange}
                multiline
                rows={4}
                inputProps={{ maxLength: 70 }}
                helperText="max 70 character allowed"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                variant="outlined"
                required
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Phone number"
                name="phone_number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                value={formData.phone_number}
                onChange={handleOnChange}
                variant="outlined"
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.gender}
                  label="Gender"
                  name="gender"
                  onChange={handleOnChange}
                >
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                  <MenuItem value={3}>Prefer not to say</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "#007bff" }}
              >
                Save Changes
              </Button>
            </Stack>
          </Tab.Panel>
          <Tab.Panel
            key="Change Password"
            className={classNames(
              "rounded-xl bg-white p-3 mx-5 my-10",
              "ring-white ring-opacity-0 ring-offset-0 focus:outline-none focus:ring-0"
            )}
          >
            <Stack
              component="form"
              onSubmit={handlePasswordChangeSubmit}
              spacing={3}
              autoComplete="off"
            >
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Old Password"
                name="old_password"
                value={passwordChangeData.old_password}
                onChange={handleOnChangePassword}
                variant="outlined"
                required
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="New Password"
                name="new_password"
                value={passwordChangeData.new_password}
                onChange={handleOnChangePassword}
                variant="outlined"
                required
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Confirm New Password"
                name="new_cpassword"
                value={passwordChangeData.new_cpassword}
                onChange={handleOnChangePassword}
                variant="outlined"
                required
              />
              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "#007bff" }}
              >
                Change Password
              </Button>
            </Stack>
          </Tab.Panel>
        </Tab.Panels>
        <p className="text-gray-500 text-right pr-3 text-xs">
          Fields are mandatory with * mark.
        </p>
      </Tab.Group>
    </div>
  );
}
