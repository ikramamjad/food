const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// GET USER INFO
const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user) return res.status(404).send({ success: false, message: "User not found" });
    user.password = undefined;
    res.status(200).send({ success: true, message: "User retrieved", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error getting user", error });
  }
};

// UPDATE USER
const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user) return res.status(404).send({ success: false, message: "User not found" });

    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    await user.save();

    res.status(200).send({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error updating user", error });
  }
};

// UPDATE PASSWORD
const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user) return res.status(404).send({ success: false, message: "User not found" });

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return res.status(400).send({ success: false, message: "Please provide old and new password" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(401).send({ success: false, message: "Invalid old password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).send({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error updating password", error });
  }
};

// RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) return res.status(400).send({ success: false, message: "Please provide all fields" });

    const user = await userModel.findOne({ email: email.toLowerCase(), answer: answer.trim().toLowerCase() });
    if (!user) return res.status(404).send({ success: false, message: "User not found or invalid answer" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).send({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error resetting password", error });
  }
};

// DELETE PROFILE
const deleteProfileController = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ success: false, message: "User not found" });
    res.status(200).send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error deleting user", error });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
