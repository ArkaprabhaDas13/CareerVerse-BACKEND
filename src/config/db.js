import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://arkaprabha31:password1234@cluster0.541gvy0.mongodb.net/CareerVerse");
        console.log("MongoDB successfully connected !!!!");
    }catch(err){
        console.error("Error in connecting to MongoDB : ", err.message);
        process.exit();
    }
}
export default connectDB; 
