import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;  // for hashing passwords

const AuthSchema = new mongoose.Schema({
    firstName : {
        type:String,
        required: true,
        trim: true,
        maxlength: 30
    }, 
    lastName : {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    email: {
        type: String, 
        unique: true, 
        required: true, 
        lowerCase: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 6 
    }
})



const Auth = mongoose.model("Auth", AuthSchema);
export default Auth;