const Booking = require("../modules/bookings");
const User = require('../modules/users');
const TourPackage = require('../modules/tourPackages');
const Razorpay = require("razorpay");
// const razorpayInstance = require('../utils/razorpay');
// const { RAZORPAY_KEY_ID } = require("../utils/razorpay");
const { CLIENT_SITE_URL } = require("../utils/config");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const bookingController = {

    // Method to get Razorpay payment order and initiate payment
    getRazorpayOrder: async (req, res) => {
        try {
            const tour = await TourPackage.findById(req.params.id);
            const user = await User.findById(req.userId);

            const { guestSize, phone, bookAt, fullName, companion } = req.body;
            let companionFee = companion ? 20 : 0;
            const serviceFee = 10;
            const totalAmount = Number(tour.price) * Number(guestSize) + Number(serviceFee) + Number(companionFee);
            
            console.log(`Total Amount: ${totalAmount}`); // Log the total amount

            // Create a Razorpay order
            const options = {
                amount: totalAmount * 100, // Amount in paise
                currency: "INR",
                receipt: `receipt_${Date.now()}`,
                payment_capture: 1 // Automatically capture the payment
            };

            console.log("Creating Razorpay order with options:", options); // Log order creation options

            const order = await razorpay.orders.create(options);

            console.log("Razorpay Order created:", order); // Log the created order

            // Save booking details with the Razorpay order ID
            const newBooking = new Booking({
                userId: req.userId,
                userEmail: user.email,
                tourName: tour.name,
                fullName,
                guestSize,
                phone,
                bookAt,
                totalPrice: totalAmount,
                companion,
                session: order.id
            });

            await newBooking.save();

            res.status(200).json({
                message: "Booking initiated successfully",
                order,
                key_id: razorpay.key_id,
                bookingId: newBooking._id
            });

            console.log("New Booking:", newBooking); // Log the new booking
        } catch (error) {
            console.error("Error in getRazorpayOrder:", error); // Log the error
            res.status(500).json({ message: error.message });
        }
    },

    getUserBookings: async (req, res) => {
        try {
            // get the user id in req params
            const userId = req.userId

            //find the user bookings in database
            const user = await User.findById(userId)

            //if the user does not exists, return a error message
            if (!user) {
                return res.status(400).json({ message: "user not booked" })
            }
            const userBooking = await Booking.find({
                userId: userId
            }).select('-__v -phone')

            //return the success message
            res.status(200).json({ userBooking })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    
    getAllBookings: async (req, res) => {
        try {

            //find the user bookings in database
            const booking = await Booking.find().select("-__v")

            //if the booking does not exists, return a error message
            if (!booking) {
                return res.status(400).json({ message: "Booking not found" })
            }
            //return the success message
            res.status(200).json( {booking} )
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    verifyRazorpayPayment: async (req, res) => {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
            
            // Construct the expected signature
            const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                .digest('hex');
    
            if (generatedSignature === razorpay_signature) {
                // The signature is valid
                // Here, you can update your booking status to 'completed' in your database if needed
                
                res.status(200).json({ message: "Payment verified successfully" });
            } else {
                // The signature is invalid
                res.status(400).json({ message: "Invalid signature" });
            }
        } catch (error) {
            console.error("Error in verifyRazorpayPayment:", error);
            res.status(500).json({ message: error.message });
        }
    }
     
    
};

module.exports = bookingController;
