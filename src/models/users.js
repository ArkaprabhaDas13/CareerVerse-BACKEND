import mongoose from 'mongoose';
import validator from "validator";
import bcrypt from "bcrypt";

const saltRounds = 10;  // for hashing passwords

const UserSchema = new  mongoose.Schema({
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
    age : {
        type: Number,
        min: 0
    },
    gender : {
        type: String,
        enum: ["male", "female"],
        required: true,
        validate(genderValue){                     // Custom Validator for checking correct gender
            if(!["male", "female", "others"].includes(genderValue))
            {
                throw new Error("Enter a valid gender");
            }
        }
    },
    email: {
        type: String, 
        unique: true, 
        required: true, 
        lowerCase: true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Enter a valid Email ID")
            }
        }
    }, 
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    phone: {
        type: String, 
        unique: true, 
        required: true
    }, 
    city: {
        type: String,
        required: true
    },
    photoURL: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
    }
}, {timestamps: true})


// Hashing the password before saving to DB ----------------------------------------------
UserSchema.pre('save', async function(next){
    const salt = bcrypt.genSaltSync(saltRounds);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
})


const User = mongoose.model('User', UserSchema);

export default User;