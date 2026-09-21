const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const {
      title, description, price, imageUrl, foodTags,
      category, code, isAvailable, restaurant, rating,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res.status(400).send({ success: false, message: "Please provide all required fields" });
    }

    const newFood = await foodModel.create({
      title, description, price, imageUrl, foodTags,
      category, code, isAvailable, restaurant, rating,
    });

    res.status(201).send({ success: true, message: "Food item created", newFood });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error in create food API", error });
  }
};

// GET ALL FOODS
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).send({ success: true, totalFoods: foods.length, foods });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error in get all foods API", error });
  }
};

// GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) return res.status(404).send({ success: false, message: "Food not found" });
    res.status(200).send({ success: true, food });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error in get single food API", error });
  }
};

// GET FOODS BY RESTAURANT
const getFoodByRestaurantController = async (req, res) => {
  try {
    const foods = await foodModel.find({ restaurant: req.params.id });
    res.status(200).send({ success: true, foods });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error in get food by restaurant API", error });
  }
};

// UPDATE FOOD
const updateFoodController = async (req, res) => {
  try {
    const updatedFood = await foodModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ success: true, message: "Food updated", updatedFood });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error in update food API", error });
  }
};

// DELETE FOOD
const deleteFoodController = async (req, res) => {
  try {
    await foodModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true, message: "Food deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error in delete food API", error });
  }
};

// PLACE ORDER
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) return res.status(400).send({ success: false, message: "Cart is empty" });

    let total = cart.reduce((sum, item) => sum + item.price, 0);

    const newOrder = await orderModel.create({
      foods: cart.map((f) => f._id),
      payment: total,
      buyer: req.body.id,
    });

    res.status(201).send({ success: true, message: "Order placed", newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error placing order", error });
  }
};

// ORDER STATUS UPDATE
const orderStatusController = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).send({ success: true, message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error updating order status", error });
  }
};

module.exports = {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
