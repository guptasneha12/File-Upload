const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://guptasneha2003sg:WpWAhRBfxNCk4OeA@cluster0.jcyt6gu.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
