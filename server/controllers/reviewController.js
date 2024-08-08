//import the booking module
const Review = require('../modules/reviews');

//import the booking module
const TourPackage = require("../modules/tourPackages");

//import the user module
const User = require('../modules/users')

//define the review Controller
const reviewController = {
    //define the add review method
    addReview : async (req,res) => {

        try {
            
            // get the tour id from the params
            const tourId = req.params.id;

            const userId = req.userId;
            
            const user = await User.findById(userId).select('userName');

      
            const {reviewText, tourRating} = req.body;

            const newReview = new Review({
                tourId,
                userName:user.userName,
                reviewText,
                rating:tourRating
            })


        const savedReview = await newReview.save();

            await TourPackage.findByIdAndUpdate(tourId,{
                $push: {reviews: savedReview._id}
            })

        //return the success message
        res.status(200).json({message : "review added Successfully",savedReview })
       
            } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getReview :  async (req,res) => {
        try {
            // get the tour id from the params
            const tourId = req.params.id;

            const reviews = await Review.find({tourId}).select("-__v ").sort({ date : -1 });

            res.status(200).json(reviews);

        } catch (error) {
            res.status(500).json({ message: error.message })
      }
    },
}
// export the module
module.exports = reviewController;