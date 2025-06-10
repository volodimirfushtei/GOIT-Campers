import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  console.log("Mongo URI:", uri);

  if (!uri) {
    throw new Error("MONGODB_URI is not defined!");
  }

  try {
    await mongoose.connect(uri); // без зайвих опцій
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
