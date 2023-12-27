const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
dotenv.config({ path: './config.env' });
const tourRouter = require('./routers/tourRouter.js');
const ErrorHandlerController = require('./controllers/ErrorController.js');
const userRouter = require('./routers/userRouter.js');
const appError = require('./utils/appError.js');
const app = express();
process.noDeprecation = true;

// 1) global middleware
// middleware set security headers
app.use(helmet());
// middleware write log production and dev
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// body parse reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // gioi han luong du lieu la 10kb
app.use(express.static(`${__dirname}/public`));

// limit request from same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many request from this ip, please try again in an hour',
});

app.use('/api', limiter);

// test api
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
