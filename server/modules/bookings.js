const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userEmail: {
        type: String
    },
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TourPackage',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    guestSize: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    bookAt: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    companion: {
        type: Boolean
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema, 'bookings');
