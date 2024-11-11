const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
