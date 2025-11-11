import express from 'express';
import connectDB from './src/config/db.js';
import cookieParser from 'cookie-parser';
import userRouter from './src/routes/userRoutes.js'
import authRouter from './src/routes/authRoutes.js'
import jobRouter from './src/routes/jobRoutes.js';

const app = express();
const port = 3000;


app.use(express.json());    // express.JSON middleware to handle all incoming JSON format data
app.use(cookieParser());    // Parse the cookies into readable format   

app.use('/auth', authRouter);    // all the auth routes
app.use('/user', userRouter);    // all the user routes
app.use('/jobs', jobRouter);     // all the Job routes


connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`App is up and running on port ${port}`);
    });
}).catch((err)=>{
    console.error(err.message)
})                          // once the MONGO DB is connected successfully, the localhost (or the server) is created

