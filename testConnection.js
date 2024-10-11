// testConnection.js
const  mongoose = require("mongoose");
const url = "mongodb+srv://kaif:kaif@cluster0.dz73k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
require('dotenv').config(); // This loads .env.local manually

console.log(process.env.MONGODB_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
    console.log('MongoDB connected successfully');
    mongoose.connection.close(); // Close the connection after testing
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

connectDB();
