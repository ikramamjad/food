const mongoose = require("mongoose");

// Schema
const restaurantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Restaurant title is required"],
    },
    imageUrl: String,
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
    time: String,
    pickup: { type: Boolean, default: true },
    delivery: { type: Boolean, default: true },
    isOpen: { type: Boolean, default: true },
    logoUrl: String,
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    code: String,
    coords: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
