const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/UserModels');
const factory = require('./handlerFactory');

const filterObj = (obj, ...arrayObjFilter) => {
  const newObj = {};
  arrayObjFilter.forEach((el) => {
    if (Object.keys(obj).includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
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

exports.createUser = (req, res, next) => {
  res.status(500).json({
    status: 'success',
    message: 'This route is not defined .Please route signup instead',
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUser = factory.getAll(User);
exports.getUser = factory.getOne(User);

exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);
