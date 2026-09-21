const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.userType !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Only admin access allowed",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Unauthorized access",
      error,
    });
  }
};
