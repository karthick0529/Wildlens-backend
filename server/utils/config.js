//import the dotenv package
require('dotenv').config();

//Create all the necessary configuration variables
const MongoDB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWT_SECRET =process.env.JWT_SECRET;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const CLIENT_SITE_URL = process.env.CLIENT_SITE_URL;
//export the configuration variables

module.exports = {
    MongoDB_URI,
    PORT,
    JWT_SECRET,
    STRIPE_SECRET_KEY,
    CLIENT_SITE_URL
}