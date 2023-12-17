const User = require('./../models/UserModels');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const AppError = require('./../utils/appError');
dotenv.config({ path: './../config.env' });

const Signtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.Signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = Signtoken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.Login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) check email and password is exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // 2) check email and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await User.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email and password', 401));
  }
  // 3) if everything ok,send token to client
  const token = Signtoken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1)getting token and check token is exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logger in! Please log in to get access.', 401)
    );
  }
  next();
});
