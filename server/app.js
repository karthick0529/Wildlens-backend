// //import the express js
// const express = require('express');

// //import the routers
// const userRouter = require('./routes/userRoutes');
// const adminRouter = require("./routes/adminRoutes");
// const tourPackageRouter = require('./routes/tourPackageRoutes')
// const bookingRouter = require('./routes/bookingRoutes');
// const reviewRouter = require('./routes/reviewRouters');

// //create the express app
// const app = express();

// //import the cookie parser
// const cookie = require('cookie-parser');
// const { CLIENT_SITE_URL } = require('./utils/config');

// //import the cors
// const cors = require('cors');

// //import the morgan
// const morgan = require('morgan');

// const cookieParser = require('cookie-parser');

// //use the cors middleware
// app.use(cors({
//     origin: 'http://localhost:5173',  // Allow only this origin
//     credentials: true                 // Allow cookies and authentication headers
//   }));


// // use the cookie-parser
// app.use(cookieParser());

// //use the morgan
// app.use(morgan("dev"))

// //use the express json middleware
// app.use(express.json());

// //define the endpoints
// app.use('/api/users',userRouter);
// app.use('/api/admin',adminRouter);
// app.use('/api/bookings',bookingRouter);
// app.use('/api/reviews',reviewRouter);
// app.use('/api/tours',tourPackageRouter);

// //export the app module
// module.exports = app;

// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const adminRouter = require("./routes/adminRoutes");
const tourPackageRouter = require('./routes/tourPackageRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const reviewRouter = require('./routes/reviewRouters');
const config = require('./utils/config');

const app = express();

app.use(cors({
    origin: '*',  // Allow only this origin
    credentials: true                 // Allow cookies and authentication headers
}));

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/tours', tourPackageRouter);

module.exports = app;
