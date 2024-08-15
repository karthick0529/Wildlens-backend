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

    // Method to verify Razorpay payment
    verifyRazorpayPayment: async (req, res) => {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
            // Validate payment parameters
            if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
                return res.status(400).json({ message: 'Missing payment verification parameters' });
            }
    
            // Verify the payment signature
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
    },

    // Method to create a booking
    createUserBooking: async (req, res) => {
        try {
            const { userId, userEmail, tourId, tourName, fullName, guestSize, phone, bookAt, totalPrice } = req.body;
    
            // Validate user and tour IDs
            if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(tourId)) {
                return res.status(400).json({ message: 'Invalid user or tour ID format' });
            }
    
            // Ensure user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            // Ensure tour package exists
            const tourPackage = await TourPackage.findById(tourId);
            if (!tourPackage) {
                return res.status(404).json({ message: "Tour package not found" });
            }
    
            // Create a new booking document
            const newBooking = new Booking({
                userId: user._id,
                userEmail: userEmail,
                tourId: tourPackage._id, 
                tourName: tourPackage.name, // Assuming `name` is a field in TourPackage
                fullName: fullName,
                guestSize: guestSize,
                phone: phone,
                bookAt: new Date(bookAt), // Ensure the date is correctly formatted
                totalPrice: totalPrice,
                companion: req.body.companion || [], // Optional field
            });
    
            // Save the booking to the database
            const savedBooking = await newBooking.save();
    
            res.status(201).json({
                message: 'Booking created successfully',
                booking: savedBooking,
            });
        } catch (error) {
            console.error("Error in createUserBooking:", error); // Log the error
            res.status(500).json({ message: 'Error creating booking', error: error.message });
        }
    },
    
    // Method to get bookings for the authenticated user
    getUserBookings: async (req, res) => {
        try {
            const userId = req.userId;
    
            // Ensure user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            const userBookings = await Booking.find({ userId })
                .populate('tourId', 'name') // Populate tourId and select specific fields if needed
                .exec();
    
            if (!userBookings || userBookings.length === 0) {
                return res.status(404).json({ message: "No bookings found" });
            }
    
            res.status(200).json({ userBookings });
        } catch (error) {
            console.error("Error in getUserBookings:", error);
            res.status(500).json({ message: error.message });
        }
    },

    // Method to get all bookings (Admin only)
    getAllBookings: async (req, res) => {
        try {
            // Fetch all bookings, excluding the __v field, and populate user and tour details
            const bookings = await Booking.find()
                .select("-__v")
                .populate('userId', 'email fullName')
                .populate('tourId', 'name');
    
            // Check if bookings are found
            if (!bookings || bookings.length === 0) {
                return res.status(404).json({ message: "No bookings found" });
            }
    
            // Respond with the bookings
            res.status(200).json({ bookings });
        } catch (error) {
            console.error("Error in getAllBookings:", error); // Log the error
            res.status(500).json({ message: 'Error fetching bookings', error: error.message });
        }
    },

};

module.exports = bookingController;
