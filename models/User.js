const mongoose = require("mongoose");

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
    required: true,
  },
  email: {
    type: String,
    unique: 1,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  token: String,
  tokenExp: Number,
});

module.exports = mongoose.model("User", userSchema);
