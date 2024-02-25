const catchAsync = require('./../utils/catchAsync');
const Tour = require('./../models/ToursModels');

module.exports.getOverview = catchAsync(async (req, res) => {
  const data = await Tour.find();
  res.status(200).render('overview', { data, title: 'All Tours' });
});

module.exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews  ',
    select: 'review rating user',
  });
  console.log(tour);
  res.status(200).render('tour', {
    tour,
    title: `${tour.name} Tour`,
  });
});

module.exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};
