const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register"); 

const signin = require("./controllers/signin");


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


app.get('/', (req,res) => {
  res.send("succes");
});


app.post('/signin', (req, res)=>{
  signin.signinHandler(req, res, db, bcrypt)
})

app.post("/register", (req,res)=>{
  register.registerHandler(req, res, db, bcrypt);
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