//import the mongoose
const mongoose = require("mongoose");

//create the schema for reviews
const reviewSchema = new mongoose.Schema({
    tourId: {
        type :mongoose.Schema.Types.ObjectId,
        ref : "TourPackage"
    },
    userName: {
        type: String,
        required: true,
      },
      reviewText: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0,
      },
    },
    { timestamps: true }
  );

// export the mongoose module
module.exports = mongoose.model("Review" , reviewSchema, "reviews");
