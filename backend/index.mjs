import express from 'express'
import connectDB from './config/db.mjs';
import userModel from './Models/user.mjs';
import cookieParser from 'cookie-parser';
let app = express();
app.use(cookieParser());
connectDB();
app.get('/ping',(req,res) => {
  res.send('pong');
})

app.listen(3000,() => {
  console.log("http://localhost:3000");
})