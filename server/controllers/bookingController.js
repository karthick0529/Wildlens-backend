const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const Booking = require("../modules/bookings");
const User = require('../modules/users');
const TourPackage = require('../modules/tourPackages');
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const bookingController = {

    // Method to get Razorpay payment order and initiate payment
    getRazorpayOrder: async (req, res) => {
        try {
            const { tourId, amount, currency } = req.body;
    
            // Validate tour ID format
            if (!mongoose.Types.ObjectId.isValid(tourId)) {
                return res.status(400).json({ message: 'Invalid tour ID format' });
            }
    
            // Create an instance of Razorpay
            const instance = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET,
            });
    
            // Create the order
            const options = {
                amount: amount * 100, // Convert to smallest currency unit (e.g., paise for INR)
                currency: currency,
                receipt: `receipt_${tourId}`,
                payment_capture: 1, // Auto-capture the payment
            };
    
            const order = await instance.orders.create(options);
    
            res.status(200).json({
                id: order.id,
                currency: order.currency,
                amount: order.amount,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error creating Razorpay order', error: error.message });
        }
    },

    getUserBookings: async (req, res) => {
        try {
            const userId = req.userId;

            // Ensure user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const userBookings = await Booking.find({ userId }).select('-__v -phone');

            res.status(200).json({ userBookings });
        } catch (error) {
            console.error("Error in getUserBookings:", error); // Log the error
            res.status(500).json({ message: error.message });
        }
    },

    getAllBookings: async (req, res) => {
        try {
            const bookings = await Booking.find().select("-__v");

            if (!bookings || bookings.length === 0) {
                return res.status(404).json({ message: "No bookings found" });
            }

            res.status(200).json({ bookings });
        } catch (error) {
            console.error("Error in getAllBookings:", error); // Log the error
            res.status(500).json({ message: error.message });
        }
    },

    verifyRazorpayPayment: async (req, res) => {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
            // Validate payment parameters
            if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
                return res.status(400).json({ message: 'Missing payment verification parameters' });
            }
    
            // Verify the payment signature
            // const crypto = require('crypto');
            const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
            hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
            const generated_signature = hmac.digest('hex');
    
            if (generated_signature !== razorpay_signature) {
                return res.status(400).json({ message: 'Invalid payment signature' });
            }
    
            res.status(200).json({ message: 'Payment verified successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error verifying payment', error: error.message });
        }
    }
};

module.exports = bookingController;
