const Review = require('../modules/reviews');
const TourPackage = require('../modules/tourPackages');
const User = require('../modules/users');

const reviewController = {
    addReview: async (req, res) => {
        try {
            const { id: tourId } = req.params;
            const userId = req.userId;

            const user = await User.findById(userId).select('userName');
            const { reviewText, rating } = req.body;

            const newReview = new Review({
                tourId,
                userId,
                userName: user.userName,
                reviewText,
                rating
            });

            const savedReview = await newReview.save();

            await TourPackage.findByIdAndUpdate(tourId, {
                $push: { reviews: savedReview._id }
            });

            res.status(200).json({ message: 'Review added successfully', savedReview });
        } catch (error) {
            res.status(500).json({ message: error.message });
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
        try {
            const { id: reviewId } = req.params;
            const userId = req.userId;

            const review = await Review.findOneAndUpdate(
                { _id: reviewId, userId },
                req.body,
                { new: true }
            );

            if (!review) {
                return res.status(404).json({ message: 'Review not found or unauthorized' });
            }

            res.status(200).json({ message: 'Review updated successfully', review });
        } catch (error) {
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
