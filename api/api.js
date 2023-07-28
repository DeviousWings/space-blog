const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleWare = multer({ dest: "uploads/" });
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

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, saltRounds),
    });
    // // Send the email to the registered user
    // const transporter = nodemailer.createTransport({
    //   service: "Gmail", // Use your email service provider here
    //   auth: {
    //     user: "your-email@example.com", // Replace with your email address
    //     pass: "your-email-password", // Replace with your email password or use environment variables
    //   },
    // });

    // // Email configuration
    // const mailOptions = {
    //   from: "your-email@example.com",
    //   to: email, // Send the email to the registered user's email address
    //   subject: "Registration Successful",
    //   text: "Congratulations! You have successfully registered.",
    // };

    // // Send the email
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log(error);
    //     return res.status(500).json({ message: "Failed to send email" });
    //   } else {
    //     console.log("Email sent: " + info.response);
    //     return res
    //       .status(200)
    //       .json({ message: "Registration and email sent successfully" });
    //   }
    // });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

// app.post("/send-email", async (req, res) => {
//   const { username } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Get the email address from the user
//     const email = user.email;

//     // Create a Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: "Gmail", // Use your email service provider here
//       auth: {
//         user: "your-email@example.com", // Replace with your email address
//         pass: "your-email-password", // Replace with your email password or use environment variables
//       },
//     });

//     // Email configuration
//     const mailOptions = {
//       from: "your-email@example.com",
//       to: email, // Send the email to the fetched email address
//       subject: "Registration Successful",
//       text: "Congratulations! You have successfully registered.",
//     };

//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Failed to send email" });
//       } else {
//         console.log("Email sent: " + info.response);
//         return res.status(200).json({ message: "Email sent successfully" });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

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

app.post("/post", uploadMiddleWare.single("files"), async (req, res) => {
  //For the picture of the post
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json({ postDoc });
  });
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(10)
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.listen(4000);
//nskingdev
//OVGhKDUp1mlZnHvb
