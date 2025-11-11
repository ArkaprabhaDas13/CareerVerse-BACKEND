import mongoose from "mongoose";
import express from "express";
import Job from "../models/jobs.js";

const jobRouter = express.Router();

// GET all Jobs
jobRouter.get("/", (req, res)=>{
    res.send("All Jobs")
})

// Create new Job
jobRouter.post("/create", (req, res)=>{
    res.send("Create Job");
})

// Edit a Job
jobRouter.patch("/:id", (req, res)=>{
    res.send("Edit Job");
})

// Delete a Job
jobRouter.delete("/:id", (req, res)=>{
    res.send("Delete Job");
})

export default jobRouter;