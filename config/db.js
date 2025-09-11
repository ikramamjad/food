const mongoose = require("mongoose");
require("colors");

const connectDB = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log(
        `✅ MongoDB connected successfully: ${mongoose.connection.host}`.bgGreen.white
      );
      break;
    } catch (error) {
      console.log(`Error in MongoDB connection: ${error.message}`.bgRed.white);
      retries -= 1;
      if (retries === 0) {
        console.log("🚨 All retries exhausted. Exiting app...".bgRed.white);
        process.exit(1);
      }
      console.log(
        `⏳ Retrying in ${delay / 1000} seconds... (${retries} attempts left)`.yellow
      );
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

module.exports = connectDB;
