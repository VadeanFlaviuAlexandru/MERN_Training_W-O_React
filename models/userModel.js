const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter your phone number"],
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
