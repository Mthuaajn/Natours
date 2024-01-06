const express = require('express');
const reviewController = require('./../controllers/reviewController');
const reviewRouter = express.Router({ mergeParams: true });
const authController = require('./../controllers/authController');
reviewRouter
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

module.exports = reviewRouter;
