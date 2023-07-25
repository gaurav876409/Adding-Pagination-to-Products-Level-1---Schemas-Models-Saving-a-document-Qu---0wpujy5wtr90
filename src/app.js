const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { off } = require('../models/product.js');
const products   =require("../models/product.js");


// Import routes

//Router Middlewares
app.use(express.json());



/* Some Example of Type of Query

1. /?limit=5
2. /?offset=3
3. /?offset=4&limit=4

*/


//default value for limit is 5 and offset is 0
//This route should return an array of _id of all the element that need to be rturned.
//output id can be in any order.

app.get("/",async function(req,res){

    // var ids = [];
    
    //Write your Code here.

    // res.send(ids);
    try {
        let limit = parseInt(req.query.limit) || 5;
        let offset = parseInt(req.query.offset) || 0;
    
        // Ensure the limit does not exceed the maximum value (5 in this case)
        limit = Math.min(limit, 5);
    
        // Calculate the skip value based on the offset and limit
        const skip = offset * limit;
    
        // Find the products in the specified range using the limit and skip values
        const productsInRange = await products
          .find()
          .skip(skip)
          .limit(limit)
          .select("_id");
    
        // Extract the _id values from the productsInRange and store them in the ids array
        const ids = productsInRange.map((product) => product._id);
    
        res.send(ids);
      } catch (err) {
        res.status(500).send("Internal Server Error");
      }

});

module.exports = app;

