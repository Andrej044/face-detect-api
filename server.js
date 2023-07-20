const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'zirochka32*',
    database : 'smart-brain'
  }
});



const app = express();

app.use(express.json());
app.use(cors());

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
      res.json(database.users[0]);
    } else {
      res.status(400).json("error logging in");
    }
})

app.post("/register", (req,res) => {
  const {email, name, password} = req.body;

  bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
});

  // database.users.push({
  //     id:"3",
  //     name: name,
  //     email: email,
  //     entries:0,
  //     joined: new Date().toLocaleDateString(),
  // })

  db('users').insert({
    email:email,
    name:name,
    joined: new Date()
  }).then(data => {
    console.log(data)
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

app.listen(5501, () => {
  console.log("app is running  on port 5501");
})