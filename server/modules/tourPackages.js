//import mongoose 
const mongoose = require('mongoose');

//create a schema for TourPackage
const tourPackageSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
      },
    description :{
        type: String,
        required: true,
      },
    city: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      distance:{
        type: Number,
        required: true,
      },
      photo: {
        type: String,
        required: true,
      },
      maxGroupSize: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    
    
    isAvailable : {
        type : Boolean,
        default : true
    } ,
    reviews: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Review",
        },
      ],
},
{ timestamps: true }
);

// create a module from schema and export it
module.exports = mongoose.model("TourPackage" , tourPackageSchema, "tourPackages");