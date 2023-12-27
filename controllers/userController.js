const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/UserModels');

const filterObj = (obj, ...arrayObjFilter) => {
  const newObj = {};
  arrayObjFilter.forEach((el) => {
    if (Object.keys(obj).includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

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

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(500).json({
    status: 'success',
    data: null,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) create error if user update password and passwordConfirm
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'route can not update password and passwordConfirm. Please access route updateMyPassword',
        400
      )
    );
  }
  //2) filter out unwanted fields names that are not allowed to be updated
  const filterBody = filterObj(req.body, 'name', 'email');
  // 3) update user document
  const newUserUpdate = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: newUserUpdate,
    },
  });
});

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
