import express from 'express'
import connectDB from './config/db.mjs';
import userModel from './Models/user.mjs';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import postModel from './Models/post.mjs';
import cors from 'cors'
let app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.get('/ping',(req,res) => {
  res.send('pong');
})
app.post('/create',async(req,res) => {
  let {username,name,email,password,age} = req.body;

  let userHave = await userModel.findOne({email});

  if(userHave) return res.status(500).send("User Already Created, You can login...");

  bcrypt.genSalt(10,(err,salt)=>{
    console.log(salt)
    bcrypt.hash(password,salt,async(err,hash)=>{
      let user = await userModel({
        username,name,email,
        age : Number(age),
        password : hash
      })
      await user.save();
      let token = jwt.sign({email,userId:user._id},"secret123");
      return res.send({
        token
      });
    });
  })
})
app.post('/login',async(req,res) => {
  let {email,password} = req.body;

  let userHave = await userModel.findOne({email});

  if(!userHave) return res.status(500).send("You don't have and Account");

  bcrypt.compare(password,userHave.password,(err,result)=>{
    if(result) {
      let token = jwt.sign({email,userId:userHave._id},"secret123");
      res.send({
        token
      });
     res.send("You can login");
    }
    else res.send("Something went wrong");
  })
  
})

app.get("/profile",verifyToken,async(req,res) => {
  let user = await userModel.findOne({email : req.user.email});
  res.status(200).send(user);
})

function verifyToken(req, res, next) {
  // Get token from Authorization header
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  
  if (!token) {
      return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token using the secret key
  jwt.verify(token,"secret123", (err, decoded) => {
      if (err) {
          return res.status(401).json({ message: 'Invalid token' });
      }
      // If the token is valid, save the decoded user information in the request object
      req.user = decoded;
      next();
  });
}

app.listen(3000,() => {
  console.log("http://localhost:3000");
})