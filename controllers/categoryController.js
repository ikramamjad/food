const categoryModel = require("../models/categoryModel");

// CREATE CATEGORY
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Please provide a category title",
      });
    }

    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();

    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Category API",
      error,
    });
  }
};

// GET ALL CATEGORIES
const getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    if (!categories || categories.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }

    res.status(200).send({
      success: true,
      totalCategories: categories.length,
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Categories API",
      error,
    });
  }
};

// UPDATE CATEGORY
const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Category API",
      error,
    });
  }
};

// DELETE CATEGORY
const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide a category ID",
      });
    }

    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    await categoryModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Category API",
      error,
    });
  }
};

// Export all controllers
module.exports = {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
};
