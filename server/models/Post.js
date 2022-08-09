import mongoose from "mongoose";
const UserSchema = mongoose.model("User").schema;
const { Schema } = mongoose;

const postSchema = new Schema({
  caption: String,
  location: String,
  post_image: String,
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  comments: {
    type: [
      {
        id: Schema.Types.ObjectId,
        message: String,
        likes: {
          type: [Schema.Types.ObjectId],
          default: [],
        },
        user: {
          type: Schema.Types.ObjectId,
        },
        created_At: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
  saved: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  created_At: { type: Date, default: Date.now },
  createdBy: Schema.Types.ObjectId,
});

const Post = mongoose.model("Post", postSchema);

export default Post;
