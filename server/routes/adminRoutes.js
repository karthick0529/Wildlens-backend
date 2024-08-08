//import the express for router
const express = require("express");

//import the adminControllers
const adminController = require("../controllers/adminControllers")
const auth = require('../middleware/auth');

//import the express router
const adminRouter = express.Router();

//define the endpoints
adminRouter.get("/tours",auth.isAuth,auth.isAdmin , adminController.getAllTours);

//export the router
module.exports = adminRouter;