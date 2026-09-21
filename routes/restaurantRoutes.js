const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");

const router = express.Router();

// CREATE RESTAURANT
router.post("/create", authMiddleware, createRestaurantController);

// GET ALL RESTAURANTS
router.get("/getAll", getAllRestaurantController);

// GET RESTAURANT BY ID
router.get("/get/:id", getRestaurantByIdController);

// DELETE RESTAURANT
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

module.exports = router;
