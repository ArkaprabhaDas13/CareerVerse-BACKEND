import express from 'express';
import User from '../models/users.js';
import { validation } from '../utils/validation.js';
import authentication from '../utils/authentication.js';
const authRouter = express.Router();

    // Route for SIGNIN

    authRouter.post("/signup", async(req, res)=>{
        // For creating new user, we need some validations:
        // 1. age cannot be more than 80
        // 2. email has to be valid
        // 3. input should contain only "firstName", "lastName", "age", "gender", "email", "phone", "city", "photoURL"
        //create a new instance of the User Model
        try{
            const newUser = req.body
            const user = new User(newUser);
            // check if the user already exists
            const existingUser = await User.findOne({"email":newUser.email});
            //save the model into the DB
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
    
    
    
    // Route for LOGIN
    
    authRouter.post("/login", async(req, res)=>{
      const data = req.body;
      try{
        const user = await User.findOne({email: data.email});
        // Password and Email validation
        await validation(req, user);
        // Create JWT Token from Schema Methods
        const token = await user.createJWT();
        res.cookie("token", token);
        res.status(200).send("Login successful!");
      }catch(err){
        res.status(400).send(err.message);
      }
    })


    // Route for LOGOUT

    authRouter.post('/logout', async(req, res)=>{
        try{
            res.cookie("token", null, {
                expires: new Date
            });
            res.status(200).send("Logout successful!");
        }catch(err){
            res.status(400).send("Error in logging out!")
        }
    })

export default authRouter;