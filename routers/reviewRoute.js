const express = require('express');
const reviewController = require('./../controllers/reviewController');
const reviewRouter = express.Router({ mergeParams: true });
const authController = require('./../controllers/authController');
reviewRouter.use(authController.protect);
reviewRouter
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    reviewController.setUserAndTour,
    reviewController.createReview
  );

reviewRouter.use(authController.restrictTo('admin', 'user'));
reviewRouter
  .route('/:id')
  .patch(reviewController.UpdateReview)
  .delete(reviewController.deleteReview)
  .get(reviewController.getReview);
module.exports = reviewRouter;
