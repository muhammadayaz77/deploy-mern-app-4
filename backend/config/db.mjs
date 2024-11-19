import mongoose from "mongoose";

let connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mini-project');
    console.log('database connected');
  } catch (error) {
    console.log(error);
  }
}
export default connectDB