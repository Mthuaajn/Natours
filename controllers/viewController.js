const catchAsync = require('./../utils/catchAsync');
const Tour = require('./../models/ToursModels');
const User = require('./../models/UserModels');
const Booking = require('./../models/BookingsModel');
module.exports.getOverview = catchAsync(async (req, res) => {
  const data = await Tour.find();
  res.status(200).render('overview', { data, title: 'All Tours' });
});

module.exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews  ',
    select: 'review rating user',
  });
  // console.log(tour);
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

module.exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'manege your account',
  });
};

module.exports.getMyTours = catchAsync(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id });
  const tourIds = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });
  res.status(200).render('overview', {
    title: 'My Tours',
    data: tours,
  });
});
module.exports.UpdateUserData = catchAsync(async (req, res) => {
  // console.log('body', req.body);
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.redirect('/me');
});
