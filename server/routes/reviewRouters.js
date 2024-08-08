//import the express for router
const express = require('express');

//import the review Controller 
const reviewController = require('../controllers/reviewController');

// import the auth 
const auth = require('../middleware/auth');

const reviewRouter = express.Router();

reviewRouter.post("/review/:id", auth.isAuth , reviewController.addReview);
reviewRouter.get("/reviews/:id", auth.isAuth , reviewController.getReview);

//export the module
module.exports = reviewRouter;