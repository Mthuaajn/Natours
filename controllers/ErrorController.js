const AppError = require('../utils/appError.js');
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    stack: err.stack,
    message: err.message,
  });
};

const sendErrorPro = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    res.status(500).json({
      status: 'err',
      message: 'Something went very wrong !',
    });
  }
};
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  // const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const value = err.keyValue.name;
  const message = `Duplicate field value \"${value}\". Please use another value!`;

  return new AppError(message, 400);
};
const handleValidationsDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if ((err.name = 'ValidationError')) error = handleValidationsDB(error);
    sendErrorPro(error, res);
  }
};
