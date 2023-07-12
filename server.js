const express = require("express");
const bcrypt = require("bcrypt-nodejs");

const app = express();

app.use(express.json());
const database = {
  users:[
    {
      id:"1",
      name: "Andrii",
      email: "andrii@gmail.com",
      entries:0,
      joined: new Date(),
    },
    {
      id:"2",
      name: "Natalii",
      email: "nataii@gmail.com",
      entries:0,
      joined: new Date(),
    },
  ],
  login:[
    {
      id:"",
      hash:"",
      email:""
    }
  ]
} 




app.get('/', (req,res) => {
  res.send(database.users);
});


app.post('/signin', (req,res) => {
  if(req.body.email === database.users[0].email && 
    req.body.password === database.users[0].password){
      res.json("request succes");
    } else {
      res.status(400).json("error logging in");
    }
})

app.post("/register", (req,res) => {
  const {email, name, password} = req.body;

  bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
});

  database.users.push({
      id:"3",
      name: name,
      email: email,
      password: password,
      entries:0,
      joined: new Date().toLocaleDateString(),
  })
  res.json(database.users[database.users.length-1])
})

app.get("/profile/:id", (req, res) =>{
  const { id } = req.params;
  let found = false;

  database.users.forEach( user => {
    if(user.id === id){
      found = true;
     return res.json(user);
    } 
  })
  if(!found){
      res.status(404).json("no such user");
  }
})


app.put("/image", (req, res) =>{
  const { id } = req.body;

  database.users.forEach( user => {
    if(user.id === id){
      user.entries++;
     return res.json(user.entries);
    } 
  })
  if(!found){
      res.status(404).json("no such user");
  }
})

app.listen(3000, () => {
  console.log("app is running  on port 3000");
})