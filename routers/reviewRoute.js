const express = require('express');
const reviewController = require('./../controllers/reviewController');
const reviewRouter = express.Router();
const authController = require('./../controllers/authController');
reviewRouter
  .route('/')
  .get(reviewController.getAllReview)
  .post(authController.protect, reviewController.createReview);

module.exports = reviewRouter;
