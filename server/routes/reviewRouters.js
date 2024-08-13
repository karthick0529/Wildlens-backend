const express = require('express');
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

const reviewRouter = express.Router();

reviewRouter.post('/review/:id', auth.isAuth, reviewController.addReview);
reviewRouter.get('/:id', reviewController.getReviews);
reviewRouter.put('/review/:id', auth.isAuth, reviewController.updateReview);
reviewRouter.delete('/review/:id', auth.isAuth, reviewController.deleteReview);

module.exports = reviewRouter;
