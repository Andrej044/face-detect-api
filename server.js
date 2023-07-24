const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register"); 
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '1111',
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

app.get("/profile/:id", (req, res)=>{
  profile.profileHandler(req,res, db);
})

app.put("/image", (req, res)=>{
  image.imageHandler(req,res,db);
})

app.listen(5501, () => {
  console.log("app is running  on port 5501");
})