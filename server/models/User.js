import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  user_name: String,
  website: String,
  bio: String,
  phone_number: String,
  gender: String,
  email: String,
  password: String,
  profile_pic: {
    type: String,
    default:
      "https://res.cloudinary.com/dw4odnsfj/image/upload/v1659210120/profile_pic/icons8-male-user-96_h8spke.png",
  },
  followers: [{}],
  following: [{}],
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
