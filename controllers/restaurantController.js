const RestaurantModel = require("../models/restaurantModel");

// CREATE RESTAURANT
const createRestaurantController = async (req, res) => {
  try {
    const {
      title, imageUrl, foods, time, pickup, delivery,
      isOpen, logoUrl, rating, ratingCount, code, coords,
    } = req.body;

    if (!title || !coords || !coords.latitude || !coords.longitude) {
      return res.status(400).send({ success: false, message: "Title and coordinates are required" });
    }

    const newRestaurant = await RestaurantModel.create({
      title, imageUrl, foods, time, pickup, delivery, isOpen,
      logoUrl, rating, ratingCount, code, coords,
    });

    res.status(201).send({ success: true, message: "Restaurant created", restaurant: newRestaurant });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error creating restaurant", error });
  }
};

// GET ALL RESTAURANTS
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find({});
    res.status(200).send({ success: true, totalCount: restaurants.length, restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error getting restaurants", error });
  }
};

// GET RESTAURANT BY ID
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.id);
    if (!restaurant) return res.status(404).send({ success: false, message: "Restaurant not found" });
    res.status(200).send({ success: true, restaurant });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error getting restaurant by ID", error });
  }
};

// DELETE RESTAURANT
const deleteRestaurantController = async (req, res) => {
  try {
    await RestaurantModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true, message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error deleting restaurant", error });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
