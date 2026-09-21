const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).send({
        success: false,
        message: "Auth token missing",
      });
    }

    const token = req.headers.authorization.split(" ")[1]; // Bearer token
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Auth token missing",
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized user",
        });
      } else {
        req.body.id = decoded.id; // attach user ID to request body
        next();
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Please provide a valid auth token",
      error,
    });
  }
};
