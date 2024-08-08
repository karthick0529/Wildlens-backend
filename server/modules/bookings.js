//import mongoose 
const mongoose = require("mongoose");


//create the schema for booking
const bookingSchema = new mongoose.Schema({
    
    userId : {
        type : String
    },
    userEmail:{
        type : String
    },
    tourName:{
        type : String,
        required:true
    },
    fullName:{
        type : String,
        required:true
    },
    guestSize:{
        type : Number,
        required:true
    },
    phone:{
        type : Number,
        required:true
    },
    bookAt:{
        type : Date,
        required:true
    },
    totalPrice :{ type: Number,
        required:true
    },
  
    companion : Boolean,
},
{timestamps:true}
);

// create a module from schema and export it
module.exports = mongoose.model("Booking" , bookingSchema, "bookings");