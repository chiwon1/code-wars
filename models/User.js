const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

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

userSchema.pre("save", function(next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
      if (err) {
        // correct error status
        return next({ status: 400, message: "failed to generate salt" });
      }

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next({ status: 400, message: "failed to generate bcrypted password" });
        }

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
