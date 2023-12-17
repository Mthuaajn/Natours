const express = require('express');
const tourController = require('./../controllers/tourController');
const tourRouter = express.Router();
const authController = require('./../controllers/authController');
// tourRouter.param('id', tourController.checkId);
//thống kê chuyến du lịch
tourRouter.route('/stats-tours').get(tourController.getTourStats);

// thống kê chuyến du lịch theo tháng
tourRouter.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
tourRouter
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTour);

tourRouter
  .route('/')
  .get(authController.protect, tourController.getAllTour)
  .post(tourController.createTour);

tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
