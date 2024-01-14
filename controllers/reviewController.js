const Review = require('./../models/reviewsModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

module.exports.getAllReview = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourID) filter = { tour: req.params.tourID };
  const reviews = await Review.find(filter);
  res.status(200).json({
    status: 'success',
    length: reviews.length,
    data: {
      reviews,
    },
  });
});

module.exports.createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourID;
  if (!req.body.user) req.body.user = req.user.id;
  const review = await Review.create(req.body);

  res.status(200).json({
    status: 'success',
    data: review,
  });
});
