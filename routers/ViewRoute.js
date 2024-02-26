const express = require('express');
const viewRouter = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

viewRouter.use(authController.isLoggerTo);
viewRouter.get('/', viewController.getOverview);
viewRouter.get('/tour/:slug', viewController.getTour);

viewRouter.get('/login', viewController.getLoginForm);
viewRouter.get('/me', authController.protect, viewController.getAccount);
viewRouter.post(
  '/submit-user-data',
  authController.protect,
  viewController.UpdateUserData
);
module.exports = viewRouter;
