const axios = require("axios");
const express = require("express");
const router = express.Router();

const middlewareFunc = async (req, res, next) => {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: {
      query: "developer jobs in chicago",
      page: "1",
      num_pages: "1",
      country: "us",
      date_posted: "all",
    },
    headers: {
      "x-rapidapi-key": "4566555e38msh753b046adef5dccp166e63jsn35ebe923b5a7",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    // ✅ Attach fetched data to request object
    req.jobData = response.data;
    console.log(response.data);

    // ✅ Continue to next middleware / route handler
    next();
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).send("Error fetching job data");
  }
};


router.get('/', middlewareFunc, (req, res)=>{
    // throw new Error("ERROR!!");
    res.send(req.jobData);
})

router.post('/',(req, res)=>{
    res.send("/ POST route");
})

router.get('/user',(req, res)=>{
    res.send("/user GET route");
})



module.exports = router;