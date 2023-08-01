const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
import fetch from "node-fetch";


const register = require("./controllers/register"); 
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: 'pg',
  connection: {
    connectionString:process.env.DATABASE_URL,
    ssl: {rejectUnauthorized:false},
    host : process.env.DATABASE_HOST,
    port : 5432,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PW,
    database : process.env.DATABASE_DB
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
  res.send("succes");
});

app.post('/signin', (req, res)=>{signin.signinHandler(req, res, db, bcrypt)})

app.post("/register", (req,res)=>{register.registerHandler(req, res, db, bcrypt);})

app.get("/profile/:id", (req, res)=>{profile.profileHandler(req,res, db);})

app.put("/image", (req, res)=>{image.imageHandler(req,res,db);})

app.post('/imageurl', (req, res) => {image.apiCallHandler(req,res, fetch)})

app.listen(3001, () => {
  console.log("app is running  on port 3001");
})