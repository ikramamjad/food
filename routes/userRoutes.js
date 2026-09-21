const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} = require("../controllers/userController");

const router = express.Router();

// GET USER INFO
router.get("/getUser", authMiddleware, getUserController);

// UPDATE PROFILE
router.put("/updateUser", authMiddleware, updateUserController);

// UPDATE PASSWORD
router.post("/updatePassword", authMiddleware, updatePasswordController);

// RESET PASSWORD (does not require login)
router.post("/resetPassword", resetPasswordController);

// DELETE PROFILE
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

module.exports = router;
