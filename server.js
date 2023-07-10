const express = require("express");

const app = express();

app.use(express.json());
const database = {
  users:[
    {
      id:"1",
      name: "Andrii",
      email: "andrii@gmail.com",
      password: "cookies",
      entries:0,
      joined: new Date(),
    },
    {
      id:"2",
      name: "Natalii",
      email: "nataii@gmail.com",
      password: "bananas",
      entries:0,
      joined: new Date(),
    },
  ]
} 




app.get('/', (req,res) => {
  res.send("THIS IS WORKING!!!!");
});


app.post('/signin', (req,res) => {
  if(req.body.email === database.users[0].email && 
    req.body.password === database.users[0].password){
      res.json("request succes");
    } else {
      res.status(400).json("error logging in");
    }
})

app.listen(3000, () => {
  console.log("app is running  on port 3000");
})