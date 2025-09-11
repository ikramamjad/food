const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: [true, "User name is required"] },
    email: { type: String, required: [true, "Email is required"], lowercase: true },
    password: { type: String, required: [true, "Password is required"] },
    phone: { type: String, required: [true, "Phone number is required"] },
    address: { type: String, required: [true, "Address is required"] },
    userType: {
      type: String,
      enum: ["admin", "client", "vendor", "driver"],
      default: "client",
    },
    profile: {
      type: String,
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    answer: { type: String, required: [true, "Security answer is required"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);