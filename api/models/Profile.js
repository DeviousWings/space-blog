const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProfileSchema = new Schema({
  username: String,
  email: String,
  password: String, // Note: You should never store passwords in plain text in production. Use a proper password hashing library like bcrypt.
});

const ProfileModel = model("User", ProfileSchema);
module.exports = ProfileModel;
