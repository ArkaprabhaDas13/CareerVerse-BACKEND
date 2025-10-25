import axios from 'axios';
import express from 'express';
import mongoose from 'mongoose';
import User from '../models/users.js'

const router = express.Router();




router.post("/signup", async(req, res)=>{
  
  const newUser = {
    firstName : "Arpit", 
    lastName : "Das",
    age : 25, 
    gender : "abc",
    email: "arpit31@gmail.com", 
    phone: "+91 9234443535", 
    city: "Kolkata"
  }
  //create a new instance of the User Model
  const user = new User(newUser);

  //save the model into the DB
  await user.save().then(()=>{
    console.log("New User created successfully !!");
    res.send("User added successfully!")
  }).catch((err)=>{
    console.error(err.message);
    res.status(400).send("Error in sending signup data!");
  })

})

export default router;