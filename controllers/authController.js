const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const existingUser = await userModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already registered. Please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const normalizedAnswer = answer.trim().toLowerCase();

    const user = await userModel.create({
      userName,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      address,
      answer: normalizedAnswer,
    });

    res.status(201).send({
      success: true,
      message: "Successfully registered",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Server error in Register API",
      error,
    });
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({
        success: false,
        message: "Please provide email and password",
      });

    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(404).send({
        success: false,
        message: "User not found",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Server error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
