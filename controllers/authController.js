const User = require('./../models/UserModels');
const catchAsync = require('./../utils/catchAsync');

exports.Signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});
