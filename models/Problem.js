const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  "completed_users": {
    type: Number,
    required: false,
    default: 0,
  },
  "difficulty_level": {
    type: Number,
    required: false,
    default: 1,
  },
  description: {
    type: String,
    required: true,
  },
  tests: [{
    code: {
      type: String,
      required: true,
    },
    solution: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  }],
});

module.exports = mongoose.model("Problem", problemSchema);
