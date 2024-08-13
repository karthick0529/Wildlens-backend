const Review = require('../modules/reviews');
const TourPackage = require('../modules/tourPackages');
const User = require('../modules/users');

const reviewController = {
    addReview: async (req, res) => {
        try {
            const { id: tourId } = req.params;
            const userId = req.userId;
            const { reviewText, rating } = req.body;

            // Check if reviewText and rating are provided
            if (!reviewText || !rating) {
                return res.status(400).json({ message: 'Review text and rating are required.' });
            }

            // Find user by ID
            const user = await User.findById(userId).select('userName');
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            // Create new review
            const newReview = new Review({
                tourId,
                userId,
                userName: user.userName,
                reviewText,
                rating
            });

            // Save review to database
            const savedReview = await newReview.save();

            // Update the TourPackage with the new review
            await TourPackage.findByIdAndUpdate(tourId, {
                $push: { reviews: savedReview._id }
            });

            res.status(200).json({ message: 'Review added successfully', savedReview });
        } catch (error) {
            console.error(error);  // Log the error for debugging
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getReviews: async (req, res) => {
        try {
            const { id: tourId } = req.params;

            const reviews = await Review.find({ tourId }).select('-__v').sort({ createdAt: -1 });

            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateReview: async (req, res) => {
        const reviewId = req.params.id;
        const { reviewText, rating } = req.body;
        
        try {
            // Check if reviewText and rating are provided
            if (!reviewText || rating == null) { // Explicitly checking for null
                return res.status(400).json({ message: "Review text and rating are required" });
            }
            
            // Find the review by ID
            const review = await Review.findById(reviewId);
            
            if (!review) {
                return res.status(404).json({ message: "Review not found" });
            }
            
            // Update review fields
            review.reviewText = reviewText;
            review.rating = rating;
            
            // Save the updated review
            await review.save();
            
            res.status(200).json({ message: "Review updated successfully", review });
        } catch (error) {
            console.error("Error updating review:", error);
            res.status(500).json({ message: error.message });
        }
    },

    deleteReview: async (req, res) => {
        try {
            const { id: reviewId } = req.params;
            const userId = req.userId;

            const review = await Review.findOneAndDelete({ _id: reviewId, userId });

            if (!review) {
                return res.status(404).json({ message: 'Review not found or unauthorized' });
            }

            await TourPackage.findByIdAndUpdate(review.tourId, {
                $pull: { reviews: reviewId }
            });

            res.status(200).json({ message: 'Review deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = reviewController;
