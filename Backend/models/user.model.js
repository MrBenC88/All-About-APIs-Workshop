const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// trim is whitespace at end - if include whitespace it gets trimmed off
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    age: Number
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
