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
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(req, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorPro(req, res);
  }
};
