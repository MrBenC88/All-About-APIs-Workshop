/**
 * This file is our model. We define what exactly we will put into our MongoDB database.
 *
 * In this exercise, we will create a user schema that will represent a single user. The single user object will have two attributes: a username and age
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// TODO #6 Add an additional attribute representing the user age.
// TODO #7 Set the appropriate  data type for age. (ie. Number)

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
    //add age here with appropriate datatype
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
