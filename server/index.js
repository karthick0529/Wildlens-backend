//import the mongoose module
const mongoose = require("mongoose");

//import the config module
const config = require('./utils/config');
require('dotenv').config();


//import the app module
const app = require('./app')
console.log("Connecting to MongoDb...")

//Connect to MongoDB using mongoose
const port = process.env.PORT || 3000;

// Testing console
console.log("process.env.PORT", process.env.PORT);

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
  });
  
       