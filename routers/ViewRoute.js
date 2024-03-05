const express = require('express');
const viewRouter = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

viewRouter.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggerTo,
  viewController.getOverview
);
viewRouter.get(
  '/tour/:slug',
  authController.isLoggerTo,
  viewController.getTour
);
viewRouter.get(
  '/login',
  authController.isLoggerTo,
  viewController.getLoginForm
);
viewRouter.get('/me', authController.protect, viewController.getAccount);
viewRouter.get('/my-tours', authController.protect, viewController.getMyTours);

viewRouter.post(
  '/submit-user-data',
  authController.protect,
  viewController.UpdateUserData
);
module.exports = viewRouter;
