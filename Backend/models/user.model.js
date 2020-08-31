/**
 * This file is our model. We define what exactly we will put into our MongoDB database.
 *
 * In this exercise, we will create a user schema that will represent a single user. The single user object will have two attributes: a username and age
 */

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
    age: Number,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
