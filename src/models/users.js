import mongoose from 'mongoose';

const UserSchema = new  mongoose.Schema({
    firstName : String, 
    lastName : String,
    age : Number, 
    gender : {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    email: {type: String, unique: true, required: true}, 
    phone: String, 
    city: String
}, {timestamps: true})

const User = mongoose.model('User', UserSchema);

export default User;