//import the mongoose module
const mongoose = require("mongoose");

//import the config module
const config = require('./utils/config');
require('dotenv').config();


//import the app module
const app = require('./app')
console.log("Connecting to MongoDb...")

//Connect to MongoDB using mongoose
const PORT = process.env.PORT || 5000;

// Testing console
console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
console.log("process.env.PORT", process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});

       