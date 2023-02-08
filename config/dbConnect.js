const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected successfully!");
  } catch (error) {
    console.log("Database error ");
  }
};

module.exports = dbConnect;
