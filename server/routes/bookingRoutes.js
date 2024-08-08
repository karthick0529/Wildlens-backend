//import the express for router
const express = require("express");

//import the bookingController
const bookingController = require('../controllers/bookingController');
//import the auth
const auth = require('../middleware/auth');

//import the express router
const bookingRouter = express.Router();
//define the endpoints
bookingRouter.post("/checkout-session/:id" , auth.isAuth , bookingController.getCheckoutSession)
bookingRouter.get("/user" , auth.isAuth , bookingController.getUserBookings)
bookingRouter.get("/" , auth.isAuth ,auth.isAdmin, bookingController.getAllBookings)


//export the module
module.exports = bookingRouter;
