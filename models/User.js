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
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
  }

  next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign(this._id.toHexString(), process.env.SECRET_KEY);

  this.token = token;
  this.save();
};

userSchema.statics.findByToken = async function (token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    return await this.findOne({ "_id": decoded, "token": token });
  } catch (err) {
    next(err);
  }
};

module.exports = mongoose.model("User", userSchema);
