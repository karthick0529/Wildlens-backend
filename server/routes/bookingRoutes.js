// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.post('/razorpay/order', auth.isAuth, bookingController.getRazorpayOrder);
router.post('/createbooking', auth.isAuth, bookingController.createUserBooking);
router.get("/user" , auth.isAuth , bookingController.getUserBookings)
router.get("/" , auth.isAuth, auth.isAdmin, bookingController.getAllBookings)
router.post('/razorpay/verify', auth.isAuth, bookingController.verifyRazorpayPayment);

module.exports = router;
