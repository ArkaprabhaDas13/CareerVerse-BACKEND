import express from 'express';
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js'
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;


app.use(express.json());    // express.JSON middleware to handle all incoming JSON format data
app.use(cookieParser());    // Parse the cookies into readable format   
app.use('/',userRoutes);        // all the routes are written in the routes file for easy understanding


connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`App is up and running on port ${port}`);
    });
}).catch((err)=>{
    console.error(err.message)
})                          // once the MONGO DB is connected successfully, the localhost (or the server) is created

