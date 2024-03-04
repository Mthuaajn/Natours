const express = require('express');
const bookingController = require('./../controllers/bookingController');
const bookingRouter = express.Router({ mergeParams: true });
const authController = require('./../controllers/authController');

bookingRouter.use(
  authController.protect
  //   authController.restrictTo('admin', 'lead-guide')
);
bookingRouter.get(
  '/checkout-session/:tourId',
  bookingController.getCheckoutSession
);
module.exports = bookingRouter;
