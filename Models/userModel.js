const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  proPic: {
    type: String,
    default: "",
  },
  userType: {
    type: String,
    default: "user",
  },
  userBio: {
    type: String,
    default: "",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
