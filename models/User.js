const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    required: true,
  },
  token: String,
  tokenExp: Number,
});

userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (plainPassword) {
  const isMatch = await bcrypt.compare(plainPassword, this.password);

  return isMatch;
};

userSchema.methods.generateToken = function () {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.SECRET_KEY);

  user.token = token;
  user.save();
};

userSchema.statics.findByToken = async function (token) {
  const user = this;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    return await user.findOne({ "_id": decoded, "token": token });
  } catch (err) {
    next(err);
  }
};

module.exports = mongoose.model("User", userSchema);
