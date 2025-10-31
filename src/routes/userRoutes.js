import axios from 'axios';
import express from 'express';
import mongoose from 'mongoose';
import User from '../models/users.js'

const router = express.Router();

// ROUTE TO SIGN IN NEW USER ----------------------------------------------------------------------------------------

router.post("/signup", async(req, res)=>{

  // For creating new user, we need some validations:
  // 1. age cannot be more than 80
  // 2. email has to be valid
  // 3. input should contain only "firstName", "lastName", "age", "gender", "email", "phone", "city", "photoURL"

  //create a new instance of the User Model
  const newUser = req.body
  const user = new User(newUser);

  // check if the user already exists
  const existingUser = await User.findOne({"email":newUser.email});
  console.log(existingUser);

  //save the model into the DB

  try{

    // data sanitation through API before saving to DB
    const acceptedValues = ["firstName", "lastName", "age", "gender", "email", "password", "phone", "city", "photoURL"];
    const isEntryValid = Object.keys(newUser).every((key)=>{
      return acceptedValues.includes(key);
    })

    // Checking for cases before entering into DB
    if(!isEntryValid || newUser.age>80 || existingUser)
    {
      throw new Error("Please enter the VALUES CORRECTLY or the user already exists!");
    }
    
    const addedUser = await user.save();
    res.status(200).send("User added successfully!");

  }catch(err){
    res.status(400).send(err.message);
  }   
})


// Route to LOGIN an existing user ------------------------------------------------

router.post("/login", (req, res)=>{
  const data = req.body;
  console.log(data);
  res.send(data);
})


// Route to get all the users -----------------------------------------

router.get("/getAllUsers", async(req, res)=>{
  try{
    const allUsers = await User.find();
    console.log("Successfully fetched all the users!")
    res.status(200).send(allUsers);
  }catch(err){
    res.status(400).send(err.message);
  }
})

// Route to get 1 user using ID ---------------------------------------

router.get("/:id", async(req, res)=>{
  const id = req.params.id;
  try{
    const user = await User.findById(id);
    res.status(200).send(user);
  }catch(err){
    res.status(400).send(err.message);
  }
})

// Edit an User Detail -------------------------------------

router.patch("/:id", async(req, res)=>{
  const id = req.params?.id;
  const updateDetails = req.body;
  try{
    const acceptedValues = ["firstName", "lastName", "age", "gender", "email", "password", "phone", "city", "photoURL"];
    const isUpdateAllowed = Object.keys(updateDetails).every((key)=>{
      return acceptedValues.includes(key);
    })
    if(!isUpdateAllowed || updateDetails.age>80)
    {
      throw new Error("Please enter the UPDATE VALUES CORRECTLY!")
    }
    const updatedUser = await User.findByIdAndUpdate(id, updateDetails, {runValidators: true});
    res.status(200).send(updateDetails);
  }catch(err){
    res.status(400).send(err.message);
  }
})

// Delete an User ------------------------------------------------------

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