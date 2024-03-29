const express = require('express');
const tourController = require('./../controllers/tourController');
const tourRouter = express.Router();
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routers/reviewRoute');
// tourRouter.param('id', tourController.checkId);
//thống kê chuyến du lịch
tourRouter.route('/stats-tours').get(tourController.getTourStats);

// thống kê chuyến du lịch theo tháng
tourRouter.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
tourRouter
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTour);

tourRouter.use(authController.protect);

tourRouter
  .route('/')
  .get(tourController.getAllTour)
  .post(
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

tourRouter
  .route('/tour-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);
// /tour-within/233/center/-41,45/unit/mi
// /tour-within?distance=233&center=41,45&unit=mi

tourRouter
  .route('/distances/:latlng/unit/:unit')
  .get(tourController.getDistances);
// /distances/-41,45/unit/mi
// /distances?center=41,45&unit=mi

tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

// c1
// tourRouter
//   .route('/:tourID/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );
// c2
tourRouter.use('/:tourID/reviews/', reviewRouter);
module.exports = tourRouter;
