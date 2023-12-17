const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/UserModels');
exports.getAllUser = catchAsync(async (req, res) => {
  const users = await User.find();
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      tours: users,
    },
  });
});
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'fail',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'fail',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'fail',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'fail',
  });
};
