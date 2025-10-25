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
    email: String, 
    phone: String, 
    city: String
})

const User = mongoose.model('User', UserSchema);

export default User;