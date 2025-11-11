import axios from 'axios';
import express from 'express';
import mongoose from 'mongoose';
import User from '../models/users.js'
import {validation} from '../utils/validation.js'
import jwt from 'jsonwebtoken'
import authentication from '../utils/authentication.js';

const userRouter = express.Router();

// Route to get the profie --------------------------------------------

userRouter.get("/profile", authentication, async(req, res)=>{
  const user = await User.findById(req.userId);
  res.status(200).send(user);
})


// Route to get all the users -----------------------------------------

userRouter.get("/ ", authentication, async(req, res)=>{
  try{
    const allUsers = await User.find();
    console.log("Successfully fetched all the users!")
    res.status(200).send(allUsers);
  }catch(err){
    res.status(400).send(err.message);
  }
})

// Route to get 1 user using ID ---------------------------------------

userRouter.get("/:id", authentication, async(req, res)=>{
  const id = req.params.id;
  try{
    const user = await User.findById(id);
    res.status(200).send(user);
  }catch(err){
    res.status(400).send(err.message);
  }
})

// Edit an User Detail -------------------------------------

userRouter.patch("/:id", authentication, async(req, res)=>{
  const id = req.params?.id;
  const updateDetails = req.body;
  try{
    const acceptedValues = ["firstName", "lastName", "age", "gender", "email", "password", "phone", "city", "photoURL"];
    const isUpdateAllowed = Object.keys(updateDetails).every((key)=>{
      return acceptedValues.includes(key);
    })
    if(!isUpdateAllowed || updateDetails.age>80)
    {
      throw new Error("Age cannot be more than 80. Please enter the UPDATE VALUES CORRECTLY!")
    }
    const updatedUser = await User.findByIdAndUpdate(id, updateDetails, {runValidators: true});
    res.status(200).send(updateDetails);
  }catch(err){
    res.status(400).send(err.message);
  }
})

// Delete an User ------------------------------------------------------

userRouter.delete("/:id", authentication, async(req, res)=>{
  const id = req.params.id;
  try{
    await User.findOneAndDelete(id);
    res.status(200).send("User Deleted!");
  }catch(err){
    res.status(400).send(err.message);
  }
})



export default userRouter;