const mongoose = require("mongoose");

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  token: String,
  tokenExp: Number,
});

module.exports = mongoose.model("User", userSchema);
