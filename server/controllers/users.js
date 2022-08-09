import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import cloudinary from "../helper/handleImage.js";

dotenv.config();

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const existedUser = await User.findOne({ email: email });
  if (!existedUser)
    return res.status(400).json({ message: "Invalid Credentials" });

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existedUser.password
  );
  if (!isPasswordCorrect)
    return res.status(400).json({ message: "Invalid Credentials" });

  try {
    const token = jwt.sign(
      { email: existedUser.email, id: existedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({ token, result: existedUser });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (req, res) => {
  const { user_name, email, password } = req.body;
  const name = email.split("@")[0];

  const emailAlreadyExists = await User.findOne({ email: email });
  if (emailAlreadyExists)
    return res.status(400).json({ message: "Email already exists" });

  const userNameAlreadyExists = await User.findOne({ user_name });
  if (userNameAlreadyExists)
    return res.status(400).json({ message: "User Name already exists" });

  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt);

  const result = new User({
    user_name,
    name,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    { email: result.email, id: result._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  try {
    await result.save();
    res.status(201).json({ result, token });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfilePic = async (req, res) => {
  const userId = req.userId;

  const user = await User.findById(userId);

  const result = await cloudinary.uploader.upload(req.file.path, {
    public_id: `profile_pic/${userId}`,
  });

  Object.assign(user, { profile_pic: result.url });

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    res.status(200).send({ updatedUser });
  } catch (error) {
    console.log(error);
  }
};

export const follow = async (req, res) => {
  const otherUserId = req.params.id;
  const currentUserId = req.userId;
  try {
    let otherUser = await User.findById(otherUserId);
    let currentUser = await User.findById(currentUserId);
    if (currentUser.following.includes(otherUserId)) {
      const i = currentUser.following.indexOf(otherUserId);
      currentUser.following.splice(i, 1);
      const j = otherUser.followers.indexOf(currentUserId);
      otherUser.followers.splice(j, 1);
    } else {
      currentUser.following.push(otherUserId);
      otherUser.followers.push(currentUserId);
    }

    const updatedCurrentUser = await User.findByIdAndUpdate(
      currentUserId,
      currentUser,
      { new: true }
    );

    const updatedOtherUser = await User.findByIdAndUpdate(
      otherUserId,
      otherUser,
      { new: true }
    );

    res.status(200).json({ updatedCurrentUser, updatedOtherUser });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const userId = req.userId;
  const getedUser = req.body;

  const emailAlreadyExists = await User.findOne({
    email: getedUser.email,
    _id: { $ne: userId },
  });
  if (emailAlreadyExists)
    return res.status(400).json({ message: "Email already exists" });

  const userNameAlreadyExists = await User.findOne({
    user_name: getedUser.user_name,
    _id: { $ne: userId },
  });
  if (userNameAlreadyExists)
    return res.status(400).json({ message: "User Name already exists" });

  if (getedUser.phone_number !== "") {
    const phoneNumberAlreadyExists = await User.findOne({
      phone_number: getedUser.phone_number,
      _id: { $ne: userId },
    });
    if (phoneNumberAlreadyExists)
      return res.status(400).json({ message: "Phone Number already exists" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, getedUser, {
      new: true,
    });
    res.status(200).send({ updatedUser });
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (req, res) => {
  const userId = req.userId;
  const { old_password, new_password } = req.body;

  console.log(old_password, new_password);

  var user = await User.findById(userId);

  const isPasswordCorrect = bcrypt.compareSync(old_password, user.password);
  if (!isPasswordCorrect)
    return res.status(400).json({ message: "Invalid Credentials" });

  var salt = bcrypt.genSaltSync(10);
  var newHash = bcrypt.hashSync(new_password, salt);
  Object.assign(user, { password: newHash });

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    res.status(200).send({ message: "updated successfully" });
  } catch (error) {
    console.log(error);
  }
};
