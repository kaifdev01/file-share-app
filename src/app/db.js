import mongoose from 'mongoose';
const uri = "mongodb+srv://kaif:kaif@cluster0.dz73k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async () => {
  try {
    await mongoose.connect(uri)
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;