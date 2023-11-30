const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
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
  next(new appError(`Can not find ${req.originalUrl} on server`, 404));
});

app.use(ErrorHandlerController);
module.exports = app;
