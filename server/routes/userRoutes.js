//import the express for router
const express = require("express");

// import the userController
const userController = require("../controllers/userController");

//import the auth
const auth = require('../middleware/auth');

//import the express router
const userRouter = express.Router();

//define the endpoints

//Un authenticated route
userRouter.post('/register',userController.register);
userRouter.post("/login",userController.login);

//authenticated route
userRouter.get("/logout", auth.isAuth , userController.logout);


//export the router
module.exports = userRouter;
