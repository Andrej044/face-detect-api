const express = require("express");

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


const app = express();


app.get('/', (req,res) => {
  res.send("THIS IS WORKING!!!!");
});

app.post('/signin', (req,res) => {
  res.send("signin");
})

app.listen(3000, () => {
  console.log("app is running  on port 3000");
})