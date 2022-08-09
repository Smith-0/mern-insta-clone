import express from "express";
import multer from "multer";
import auth from "../middleware/auth.js";

import {
  signUp,
  signIn,
  getUsers,
  getUserById,
  follow,
  updateUser,
  updatePassword,
  updateProfilePic,
} from "../controllers/users.js";

const router = express.Router();

const storage = multer.diskStorage({});

const upload = multer({ storage: storage });

router.post("/signIn", signIn);
router.post("/signUp", upload.single("profile_pic"), signUp);
router.post("/", getUsers);
router.get("/:id", getUserById);

router.patch(
  "/update/profile_pic",
  upload.single("profile_pic"),
  auth,
  updateProfilePic
);
router.patch("/follow/:id", auth, follow);
router.patch("/update", auth, updateUser);
router.patch("/update/password", auth, updatePassword);

export default router;
