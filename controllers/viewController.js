const catchAsync = require('./../utils/catchAsync');
const Tour = require('./../models/ToursModels');

module.exports.getHomePage = (req, res) => {
  res.status(200).render('base');
};

module.exports.getOverview = catchAsync(async (req, res) => {
  const data = await Tour.find();
  res.status(200).render('overview', data);
});

module.exports.getTour = (req, res) => {
  res.status(200).render('tour');
};
