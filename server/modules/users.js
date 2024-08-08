//import mongoose 
const mongoose = require('mongoose');

//create a schema for User
const userSchema = new mongoose.Schema({
    userName : String,
    email: String,
    passwordHash : String,
    photo:String,
    role :{
        type:String,
        enum : ["user","admin"],
        default:"user"
    },
},
{ timestamps: true }
);

// create a module from schema and export it
module.exports = mongoose.model("User" , userSchema, "users");