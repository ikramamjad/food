const testUserController = (req, res) => {
  try {
    res.status(200).send("<h1>Test User Data</h1>");
  } catch (error) {
    console.error("Error in Test API", error);
    res.status(500).send({ success: false, message: "Error in Test API", error });
  }
};

module.exports = { testUserController };
