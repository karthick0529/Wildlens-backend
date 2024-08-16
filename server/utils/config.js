
// utils/config.js
require('dotenv').config();

const MongoDB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_SITE_URL = process.env.CLIENT_SITE_URL;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

module.exports = {
    MongoDB_URI,
    PORT,
    JWT_SECRET,
    CLIENT_SITE_URL,
    RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET,
};
