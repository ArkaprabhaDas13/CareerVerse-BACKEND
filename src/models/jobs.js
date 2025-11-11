import mongoose from "mongoose";

const JobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, 
        maxLength: 30
    },
    company:{
        type: String,
        required: true
    },
    skills:{
        type: [String],
        required: true
    },
    location: {
        type: String, 
        required: true
    },
    description: {
        type: String
    },
    postedBy: {
        type: String
    },
    
})

const Job = mongoose.model('Job', JobSchema);

export default Job;