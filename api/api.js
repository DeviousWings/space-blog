const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const express = require("express");
const multer = require("multer");
const uploadMiddleWare = multer({ dest: "uploads/" });
const cors = require("cors");
const app = express();

const fs = require("fs");
const nodemailer = require("nodemailer");

const User = require("./models/user");
const Post = require("./models/Post");

//https://www.npmjs.com/package/bcrypt
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";
const secret = "fasjlkdcksdloenija;lfsds";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(
  "mongodb+srv://nskingdev:62TtcSzEieARXAZS@cluster0.zrtybye.mongodb.net/?retryWrites=true&w=majority"
);

function renameFileAndReturnPath(file) {
  const { originalname, path } = file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  return newPath;
}

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, saltRounds),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  bcrypt.compareSync(password, userDoc.password);
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    //logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, toekn) => {
      if (err) throw err;
      res.cookie("token", toekn).json({
        id: userDoc._id,
        username,
      });
    });
    //
  } else {
    res.status(400).json("Wrong Credentials");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleWare.single("file"), async (req, res) => {
  try {
    const { token } = req.cookies;
    const { title, summary, content } = req.body;

    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;

      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);

      // Create the post with the provided data and author information
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });

      if (!postDoc) {
        return res.status(404).json("Post not found");
      }

      // Send the created post as the response
      res.json(postDoc);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal server error");
  }
});

app.put("/post", uploadMiddleWare.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    newPath = renameFileAndReturnPath(req.file);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("You are not the author");
    }
    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    if (newPath) {
      postDoc.cover = newPath;
    }

    await postDoc.save();

    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: 1 }) // Sort in descending order
      .limit(10);

    res.json(posts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal server error");
  }
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.listen(4000);
//nskingdev
//OVGhKDUp1mlZnHvb
