const express = require("express");

// Corrected import paths
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware"); 
const {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");

const router = express.Router();

// Routes
//create food
router.post("/create", authMiddleware, createFoodController);
//get all foods
router.get("/getAll", getAllFoodsController);
//get single food
router.get("/get/:id", getSingleFoodController);
//get food by restaurant
router.get("/getByResturant/:id", getFoodByRestaurantController);
//  update food
router.put("/update/:id", authMiddleware, updateFoodController);
// delete food
router.delete("/delete/:id", authMiddleware, deleteFoodController);
// place order
router.post("/placeorder", authMiddleware, placeOrderController);
// order status
router.post("/orderStatus/:id", authMiddleware, adminMiddleware, orderStatusController);

module.exports = router;
