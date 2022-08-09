import express from "express";
import multer from "multer";

import auth from "../middleware/auth.js";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  commentPost,
  likePost,
  savePost,
  deletePost,
  likeComment,
} from "../controllers/posts.js";

const router = express.Router();

const storage = multer.diskStorage({});

const upload = multer({ storage: storage });

router.get("/", getAllPosts);
router.get("/:id", getPostById);

router.post("/", auth, upload.single("post_image"), createPost);

router.patch("/update/:id", auth, updatePost);
router.patch("/comment/:id", auth, commentPost);
router.patch("/likeComment/:postId/:index", auth, likeComment);
router.patch("/like/:id", auth, likePost);
router.patch("/save/:id", auth, savePost);
router.patch("/delete/:id", auth, deletePost);

export default router;
