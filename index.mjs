import express from 'express'

let app = express();

app.get('/ping',(req,res) => {
  res.send('pong');
})

app.listen(3000,() => {
  console.log("http://localhost:3000");
})