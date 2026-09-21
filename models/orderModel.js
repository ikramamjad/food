const mongoose = require("mongoose");

// Schema
const orderSchema = new mongoose.Schema(
  {
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
    payment: {}, // Can be expanded for payment info
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["preparing", "prepared", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
