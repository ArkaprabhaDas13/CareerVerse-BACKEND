import axios from 'axios';
import express from 'express';
import mongoose from 'mongoose';
import User from '../models/users.js'

const router = express.Router();

router.post("/signup", async(req, res)=>{
  
  const newUser = req.body
  //create a new instance of the User Model
  const user = new User(newUser);

  //save the model into the DB
  await user.save().then(()=>{
    console.log("New User created successfully !!");
    res.send("User added successfully!")
  }).catch((err)=>{
    console.error(err.message);
    res.status(400).send(err.message);
  })
})

// Route to get all the users

router.get("/getAllUsers", async(req, res)=>{
  try{
    const allUsers = await User.find();
    console.log("Successfully fetched all the users!")
    res.status(200).send(allUsers);
  }catch(err){
    res.status(400).send(err.message);
  }
})

// Route to get 1 user using ID

router.get("/:id", async(req, res)=>{
  const id = req.params.id;
  try{
    const user = await User.findById(id);
    res.status(200).send(user);
  }catch(err){
    res.status(400).send(err.message);
  }
})

// Edit and Replace an User Detail

router.put("/:id", async(req, res)=>{
  const id = req.params.id;
  const updatedDetails = req.body;
  try{
    const updatedUser = await User.findByIdAndUpdate(id, updatedDetails);
    res.status(200).send(updatedDetails);
  }catch(err){
    res.status(400).send(err.message);
  }
})

// Delete an User

router.delete("/:id", async(req, res)=>{
  const id = req.params.id;
  try{
    await User.findOneAndDelete(id);
    res.status(200).send("User Deleted!");
  }catch(err){
    res.status(400).send(err.message);
  }
})
export default router;