import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  username : String,
  name : String,
  age : Number,
  email : String,
  password : String,
})

let userModel = mongoose.model('user',userSchema);

export default userModel;