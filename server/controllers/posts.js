import Post from "../models/Post.js";
import mongoose from "mongoose";

import cloudinary from "../helper/handleImage.js";

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const post = await Post.findById(id);
    if (post === null) return res.status(404).send(`No post with id: ${id}`);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (req, res) => {
  const userId = req.userId;

  const { caption, location } = req.body;
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const result = await cloudinary.uploader.upload(req.file.path, {
    public_id: `post/${uniqueSuffix}`,
  });
  const postData = {
    caption,
    location,
    post_image: result.url,
    createdBy: userId,
  };

  try {
    const newPost = new Post(postData);
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  const userId = req.userId;
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (post.likes.includes(userId)) {
    const index = post.likes.indexOf(userId);
    post.likes.splice(index, 1);
  } else {
    post.likes.push(userId);
  }

  try {
    const likedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(likedPost);
  } catch (error) {
    console.log(error);
  }
};

export const likeComment = async (req, res) => {
  const userId = req.userId;
  let { postId, index } = req.params;

  const post = await Post.findById(postId);
  let comment = post.comments[index];

  if (comment.likes.includes(userId)) {
    const index = comment.likes.indexOf(userId);
    comment.likes.splice(index, 1);
  } else {
    comment.likes.push(userId);
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

export const savePost = async (req, res) => {
  const userId = req.userId;
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (post.saved.includes(userId)) {
    const index = post.saved.indexOf(userId);
    post.saved.splice(index, 1);
  } else {
    post.saved.push(userId);
  }

  try {
    const savedPost = await Post.findByIdAndUpdate(
      postId,
      { saved: post.saved },
      { new: true }
    );
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = async (req, res) => {
  const userId = req.userId;
  const postId = req.params.id;
  const { message } = req.body;

  if (!mongoose.isValidObjectId(postId))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const comments = { message, user: userId };

    const post = await Post.findById(postId);
    if (post === null) return res.status(404).send(`No post with id: ${id}`);

    post.comments.unshift(comments);
    const updatedPost = await Post.findByIdAndUpdate(postId, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { caption, location } = req.body;

  if (!mongoose.isValidObjectId(postId))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const post = await Post.findById(postId);
    if (post === null) return res.status(404).send(`No post with id: ${id}`);

    Object.assign(post, { caption, location });

    console.log(post);
    const updatedPost = await Post.findByIdAndUpdate(postId, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    await Post.findByIdAndRemove(postId);
    res.status(200).json({ message: "Deleted post successfully" });
  } catch (error) {
    console.log(error);
  }
};
