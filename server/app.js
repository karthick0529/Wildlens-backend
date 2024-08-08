//import the express js
const express = require('express');

//import the routers
const userRouter = require('./routes/userRoutes');
const adminRouter = require("./routes/adminRoutes");
const tourPackageRouter = require('./routes/tourPackageRoutes')
const bookingRouter = require('./routes/bookingRoutes');
const reviewRouter = require('./routes/reviewRouters');

//create the express app
const app = express();

//import the cookie parser
const cookie = require('cookie-parser');
const { CLIENT_SITE_URL } = require('./utils/config');

//import the cors
const cors = require('cors');

//import the morgan
const morgan = require('morgan');

const cookieParser = require('cookie-parser');

//use the cors middleware
app.use(cors({
    origin : CLIENT_SITE_URL ,
    credentials : true,
}));

// use the cookie-parser
app.use(cookieParser());

//use the morgan
app.use(morgan("dev"))

//use the express json middleware
app.use(express.json());

//define the endpoints
app.use('/api/v1/users',userRouter);
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/bookings',bookingRouter);
app.use('/api/v1/',reviewRouter);
app.use('/api/v1/tours',tourPackageRouter);

//export the app module
module.exports = app;

