const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routers/tourRouter.js');
const ErrorHandlerController = require('./controllers/ErrorController.js');
const userRouter = require('./routers/userRouter.js');
const appError = require('./utils/appError.js');
const app = express();
process.noDeprecation = true;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
  
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   success: 'fail',
  //   message: `Can not find ${req.originalUrl} on server`,
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.statuscode = 404;
  // err.status = 'fail';

  next(new appError(`Can not find ${req.originalUrl} on server`, 404));
});

app.use(ErrorHandlerController);
module.exports = app;
