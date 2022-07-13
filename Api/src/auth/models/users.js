const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "rejected"],
      require: true,
      default: "pending",
    },
  },
  {
    collection: "User",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
