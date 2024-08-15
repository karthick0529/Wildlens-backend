// //import the mongoose module
// const mongoose = require("mongoose");

// //import the config module
// const config = require('./utils/config');
// require('dotenv').config();


// //import the app module
// const app = require('./app')
// console.log("Connecting to MongoDb...")

// //Connect to MongoDB using mongoose
// mongoose.connect(config.MongoDB_URI)
//         .then (()=>{
//              console.log("Connected To MongoDB...");
//               //start the server 
//         app.listen(config.PORT, ()=>{
//             console.log(`server running on Port ${config.PORT}`)
//         })
//         } ).catch ((error)=> {
//             console.log("Error connecting to MongoDB...",error.message)
//         })

       

// server.js
const mongoose = require("mongoose");
const config = require('./utils/config');
const app = require('./app');

console.log("Connecting to MongoDb...");

mongoose.connect(config.MongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected To MongoDB...");
        app.listen(config.PORT, () => {
            console.log(`Server running on Port ${config.PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB...", error.message);
    });
