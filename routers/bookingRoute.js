const express = require('express');
const bookingController = require('./../controllers/bookingController');
const bookingRouter = express.Router({ mergeParams: true });
const authController = require('./../controllers/authController');

bookingRouter.use(authController.protect);
bookingRouter.get(
  '/checkout-session/:tourId',
  bookingController.getCheckoutSession
);

bookingRouter.use(authController.restrictTo('admin', 'Lead-Guide'));

bookingRouter
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

bookingRouter
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);
module.exports = bookingRouter;
