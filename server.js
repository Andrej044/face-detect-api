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

    db('users')
      .returning('*')
      .insert({
        email:email,
        name:name,
        joined: new Date()
      })
      .then(user => {
        res.json(user[0]);
      })
      .catch(err => res.status(400).json("Can't register that user"))
  })

app.get("/profile/:id", (req, res) =>{
  const { id } = req.params;

  db.select('*').from('users').where({
    id:id
  })
    .then(user => {
      if(user.length){
        res.json(user[0])
      } else {
        res.status(400).json('User not found')
      }
  })
    .catch(err => res.status(400).json('Ups, not found that user'))

})


app.put("/image", (req, res) =>{
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries)
  })
  .catch(err => res.status(400).json("Unable to get entries")) 

})

app.listen(5501, () => {
  console.log("app is running  on port 5501");
})