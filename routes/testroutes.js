const express = require("express");
const { testUserController } = require("../controllers/testController");

const router = express.Router();

// TEST USER ROUTE
router.get("/test-user", testUserController);

module.exports = router;
