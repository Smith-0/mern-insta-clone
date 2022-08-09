import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import users from "./routes/users.js";
import posts from "./routes/posts.js";

dotenv.config();
const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use("/users", users);
app.use("/posts", posts);

app.get("/", function (req, res) {
  res.send("App is running");
});

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Example app listening on port ${port}`)
    )
  )
  .catch((error) => console.error(error));
