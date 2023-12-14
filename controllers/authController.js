const User = require('./../models/UserModels');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './../config.env' });

exports.Signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.Login = (req,res,next) => {
const {email,password} = req.body;

// 1) check email and password is exxist
}