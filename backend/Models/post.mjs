import mongoose from "mongoose";

let postSchema = new mongoose.Schema({
  user : {
   type : mongoose.Schema.Types.ObjectId,
   ref : 'post'
  },
  date : {
    type : Date,
    default : Date.now
  },
  content : String,
  like : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'user',
    }
  ]
})

let postModel = mongoose.model('post',postSchema);

export default postModel;