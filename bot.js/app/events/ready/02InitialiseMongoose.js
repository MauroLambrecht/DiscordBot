const mongoose = require("mongoose");
require("dotenv/config");

module.exports = async (client) => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URI);
    console.log("mongoose connected!");
  } catch (error) {
    console.log("Failed connecting to mongoose!" + error);
  }
};
