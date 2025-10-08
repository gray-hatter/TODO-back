import mongoose from "mongoose";
export async function connectDB() {
  const uri = process.env.MONGO_URL || "mongodb://localhost:27017/todos";
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("[db] connected:", uri);
}