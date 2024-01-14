const Review = require('./../models/reviewsModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');


module.exports.setUserAndTour = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourID;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

module.exports.getAllReview = factory.getAll(Review);
module.exports.getReview = factory.getOne(Review);

module.exports.createReview = factory.createOne(Review);
module.exports.UpdateReview = factory.updateOne(Review);
module.exports.deleteReview = factory.deleteOne(Review);
